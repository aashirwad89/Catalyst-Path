const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

app.use(cors({
  origin: process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(',') : true
}));
app.use(express.json({ limit: '18mb' }));

const analysisSchema = {
  type: 'OBJECT',
  properties: {
    overallScore: { type: 'INTEGER' },
    atsScore: { type: 'INTEGER' },
    contentScore: { type: 'INTEGER' },
    formattingScore: { type: 'INTEGER' },
    keywordScore: { type: 'INTEGER' },
    summary: { type: 'STRING' },
    candidateProfile: { type: 'STRING' },
    strengths: { type: 'ARRAY', items: { type: 'STRING' } },
    weaknesses: { type: 'ARRAY', items: { type: 'STRING' } },
    missingKeywords: { type: 'ARRAY', items: { type: 'STRING' } },
    criticalFixes: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          title: { type: 'STRING' },
          issue: { type: 'STRING' },
          suggestion: { type: 'STRING' }
        },
        required: ['title', 'issue', 'suggestion']
      }
    },
    sectionFeedback: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          section: { type: 'STRING' },
          score: { type: 'INTEGER' },
          feedback: { type: 'STRING' },
          suggestions: { type: 'ARRAY', items: { type: 'STRING' } }
        },
        required: ['section', 'score', 'feedback', 'suggestions']
      }
    },
    rewrittenBullets: { type: 'ARRAY', items: { type: 'STRING' } },
    roleFit: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          role: { type: 'STRING' },
          fitScore: { type: 'INTEGER' },
          reason: { type: 'STRING' }
        },
        required: ['role', 'fitScore', 'reason']
      }
    },
    actionPlan: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          priority: { type: 'STRING' },
          task: { type: 'STRING' },
          timeEstimate: { type: 'STRING' }
        },
        required: ['priority', 'task', 'timeEstimate']
      }
    }
  },
  required: [
    'overallScore',
    'atsScore',
    'contentScore',
    'formattingScore',
    'keywordScore',
    'summary',
    'candidateProfile',
    'strengths',
    'weaknesses',
    'missingKeywords',
    'criticalFixes',
    'sectionFeedback',
    'rewrittenBullets',
    'roleFit',
    'actionPlan'
  ]
};

const buildPrompt = (targetRole) => `
You are a senior technical recruiter, ATS specialist, and resume coach.
Analyze the uploaded PDF resume deeply for ${targetRole || 'software, business, biotech, and management roles'}.

Return ONLY valid JSON that matches the schema.
Be specific, practical, and honest. Do not invent achievements. If information is missing, say it is missing.

Scoring rules:
- overallScore, atsScore, contentScore, formattingScore, keywordScore must be integers from 0 to 100.
- Give low scores for missing metrics, unclear projects, weak section order, poor ATS readability, missing role keywords, or vague responsibilities.
- Give high scores only when resume has quantified impact, clean structure, clear skills, relevant projects/work, and strong role fit.

Required analysis depth:
- Summarize the candidate profile.
- Identify strengths and weaknesses.
- Review sections like Header, Summary, Skills, Experience, Projects, Education, ATS/Formatting.
- Suggest missing keywords for the target role.
- Give 5-8 critical fixes.
- Rewrite 3-5 weak bullets into stronger impact bullets when possible.
- Suggest 3 likely job roles with fit scores.
- Give a prioritized action plan with time estimates.
`;

const extractText = (geminiResponse) => {
  return geminiResponse?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || '')
    .join('')
    .trim();
};

const parseGeminiJson = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Gemini did not return valid JSON.');
    return JSON.parse(match[0]);
  }
};

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, model: GEMINI_MODEL });
});

app.post('/api/analyze-resume', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'Missing Gemini API key. Add GEMINI_API_KEY to backend/.env and restart the backend server.'
      });
    }

    const { fileBase64, mimeType, fileName, targetRole } = req.body || {};
    if (!fileBase64 || typeof fileBase64 !== 'string') {
      return res.status(400).json({ error: 'PDF fileBase64 is required.' });
    }

    if (mimeType !== 'application/pdf') {
      return res.status(400).json({ error: 'Only PDF resumes are supported.' });
    }

    const base64Bytes = Buffer.byteLength(fileBase64, 'base64');
    if (base64Bytes > 9 * 1024 * 1024) {
      return res.status(413).json({ error: 'PDF is too large. Please upload a resume under 9MB.' });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inline_data: {
                    mime_type: 'application/pdf',
                    data: fileBase64
                  }
                },
                {
                  text: `${buildPrompt(targetRole)}\nFile name: ${fileName || 'resume.pdf'}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            response_mime_type: 'application/json',
            response_schema: analysisSchema
          }
        })
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || 'Gemini API request failed.'
      });
    }

    const text = extractText(data);
    if (!text) {
      return res.status(502).json({ error: 'Gemini returned an empty analysis.' });
    }

    res.json({ analysis: parseGeminiJson(text), model: GEMINI_MODEL });
  } catch (error) {
    console.error('Resume analysis error:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze resume.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
