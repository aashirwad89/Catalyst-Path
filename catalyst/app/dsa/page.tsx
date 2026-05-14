/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaHome,
  FaCode,
  FaFileAlt,
  FaBrain,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaRocket,
  FaRoute,
  FaFilter,
  FaSearch,
  FaCheckCircle,
  FaClock,
  FaExternalLinkAlt
} from 'react-icons/fa';

function DSAPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const companies = ['All', 'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const topics = ['All', 'Arrays', 'Strings', 'Linked List', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching', 'Stack', 'Queue', 'Design'];

  const questions = [
    { id: 1, title: "Two Sum", topic: "Arrays", difficulty: "Easy", companies: ["Google", "Amazon", "Meta"], time: "15 min", solution: "Use a hash map to store complement values. Iterate through array and check if complement exists." },
    { id: 2, title: "Reverse Linked List", topic: "Linked List", difficulty: "Easy", companies: ["Microsoft", "Amazon", "Apple"], time: "10 min", solution: "Use three pointers: prev, current, and next. Reverse links iteratively." },
    { id: 3, title: "Valid Parentheses", topic: "Stack", difficulty: "Easy", companies: ["Google", "Meta"], time: "10 min", solution: "Use stack to match opening and closing brackets. Push opening, pop for closing." },
    { id: 4, title: "Merge Two Sorted Lists", topic: "Linked List", difficulty: "Easy", companies: ["Amazon", "Apple"], time: "15 min", solution: "Use dummy node and two pointers to merge lists in sorted order." },
    { id: 5, title: "Best Time to Buy and Sell Stock", topic: "Arrays", difficulty: "Easy", companies: ["Google", "Amazon"], time: "10 min", solution: "Track minimum price seen so far and maximum profit at each step." },
    { id: 6, title: "Maximum Subarray", topic: "Arrays", difficulty: "Medium", companies: ["Google", "Microsoft"], time: "20 min", solution: "Kadane's algorithm: track current sum and maximum sum, reset if negative." },
    { id: 7, title: "Binary Tree Level Order Traversal", topic: "Trees", difficulty: "Medium", companies: ["Amazon", "Meta"], time: "20 min", solution: "Use BFS with queue. Process nodes level by level." },
    { id: 8, title: "Longest Substring Without Repeating Characters", topic: "Strings", difficulty: "Medium", companies: ["Google", "Amazon"], time: "25 min", solution: "Use sliding window with hash set. Expand window and shrink on duplicates." },
    { id: 9, title: "3Sum", topic: "Arrays", difficulty: "Medium", companies: ["Microsoft", "Meta"], time: "30 min", solution: "Sort array, use two pointers for each element to find triplets summing to zero." },
    { id: 10, title: "Container With Most Water", topic: "Arrays", difficulty: "Medium", companies: ["Google", "Amazon"], time: "20 min", solution: "Two pointers from ends, move pointer with smaller height inward." },
    { id: 11, title: "Merge Intervals", topic: "Arrays", difficulty: "Medium", companies: ["Meta", "Google"], time: "25 min", solution: "Sort intervals by start time, merge overlapping intervals." },
    { id: 12, title: "Search in Rotated Sorted Array", topic: "Searching", difficulty: "Medium", companies: ["Amazon", "Microsoft"], time: "25 min", solution: "Modified binary search, determine which half is sorted." },
    { id: 13, title: "Validate Binary Search Tree", topic: "Trees", difficulty: "Medium", companies: ["Google", "Apple"], time: "20 min", solution: "Inorder traversal should be strictly increasing, or use range validation." },
    { id: 14, title: "Lowest Common Ancestor of BST", topic: "Trees", difficulty: "Medium", companies: ["Amazon", "Meta"], time: "20 min", solution: "Compare values with root, recurse left or right based on comparison." },
    { id: 15, title: "Course Schedule", topic: "Graphs", difficulty: "Medium", companies: ["Google", "Amazon"], time: "30 min", solution: "Detect cycle in directed graph using DFS or topological sort." },
    { id: 16, title: "Number of Islands", topic: "Graphs", difficulty: "Medium", companies: ["Meta", "Amazon"], time: "25 min", solution: "DFS/BFS to mark connected components of land cells." },
    { id: 17, title: "Clone Graph", topic: "Graphs", difficulty: "Medium", companies: ["Google", "Microsoft"], time: "25 min", solution: "Use hash map to store cloned nodes, DFS/BFS to clone neighbors." },
    { id: 18, title: "Word Break", topic: "Dynamic Programming", difficulty: "Medium", companies: ["Amazon", "Google"], time: "30 min", solution: "DP array where dp[i] indicates if substring [0,i] can be segmented." },
    { id: 19, title: "Coin Change", topic: "Dynamic Programming", difficulty: "Medium", companies: ["Amazon", "Meta"], time: "30 min", solution: "DP where dp[i] is minimum coins needed for amount i." },
    { id: 20, title: "House Robber", topic: "Dynamic Programming", difficulty: "Medium", companies: ["Google", "Apple"], time: "20 min", solution: "DP with two states: rob current house or skip it." },
    { id: 21, title: "Median of Two Sorted Arrays", topic: "Arrays", difficulty: "Hard", companies: ["Google", "Amazon"], time: "40 min", solution: "Binary search on smaller array to partition both arrays at median." },
    { id: 22, title: "Trapping Rain Water", topic: "Arrays", difficulty: "Hard", companies: ["Meta", "Amazon"], time: "35 min", solution: "Two pointers tracking max heights from left and right." },
    { id: 23, title: "Word Ladder", topic: "Graphs", difficulty: "Hard", companies: ["Google", "Microsoft"], time: "40 min", solution: "BFS to find shortest transformation sequence." },
    { id: 24, title: "Regular Expression Matching", topic: "Dynamic Programming", difficulty: "Hard", companies: ["Google", "Meta"], time: "45 min", solution: "2D DP table matching pattern and string characters." },
    { id: 25, title: "Longest Valid Parentheses", topic: "Stack", difficulty: "Hard", companies: ["Amazon", "Google"], time: "35 min", solution: "Stack with indices or DP to track valid parentheses length." },
    { id: 26, title: "Remove Duplicates from Sorted Array", topic: "Arrays", difficulty: "Easy", companies: ["Microsoft", "Apple"], time: "10 min", solution: "Two pointers: one for unique elements, one for iteration." },
    { id: 27, title: "Climbing Stairs", topic: "Dynamic Programming", difficulty: "Easy", companies: ["Google", "Amazon"], time: "10 min", solution: "Fibonacci pattern: ways[i] = ways[i-1] + ways[i-2]." },
    { id: 28, title: "Valid Palindrome", topic: "Strings", difficulty: "Easy", companies: ["Meta", "Microsoft"], time: "10 min", solution: "Two pointers from ends, skip non-alphanumeric characters." },
    { id: 29, title: "Single Number", topic: "Arrays", difficulty: "Easy", companies: ["Amazon", "Apple"], time: "10 min", solution: "XOR all numbers, duplicates cancel out leaving single number." },
    { id: 30, title: "Linked List Cycle", topic: "Linked List", difficulty: "Easy", companies: ["Google", "Meta"], time: "15 min", solution: "Floyd's cycle detection with slow and fast pointers." },
    { id: 31, title: "Minimum Window Substring", topic: "Strings", difficulty: "Hard", companies: ["Amazon", "Google"], time: "45 min", solution: "Sliding window with hash maps tracking character frequencies." },
    { id: 32, title: "Edit Distance", topic: "Dynamic Programming", difficulty: "Hard", companies: ["Meta", "Microsoft"], time: "40 min", solution: "2D DP table with operations: insert, delete, replace." },
    { id: 33, title: "Palindrome Partitioning", topic: "Dynamic Programming", difficulty: "Medium", companies: ["Google", "Amazon"], time: "30 min", solution: "Backtracking with memoization to find all palindromic partitions." },
    { id: 34, title: "Group Anagrams", topic: "Strings", difficulty: "Medium", companies: ["Meta", "Amazon"], time: "20 min", solution: "Use sorted string as key in hash map to group anagrams." },
    { id: 35, title: "Jump Game", topic: "Arrays", difficulty: "Medium", companies: ["Google", "Apple"], time: "20 min", solution: "Greedy: track maximum reachable index at each step." },
    { id: 36, title: "Unique Paths", topic: "Dynamic Programming", difficulty: "Medium", companies: ["Amazon", "Meta"], time: "20 min", solution: "DP grid where paths[i][j] = paths[i-1][j] + paths[i][j-1]." },
    { id: 37, title: "Kth Largest Element", topic: "Sorting", difficulty: "Medium", companies: ["Google", "Amazon"], time: "25 min", solution: "QuickSelect algorithm or min heap of size k." },
    { id: 38, title: "Product of Array Except Self", topic: "Arrays", difficulty: "Medium", companies: ["Meta", "Microsoft"], time: "20 min", solution: "Two passes: left products and right products multiplication." },
    { id: 39, title: "Spiral Matrix", topic: "Arrays", difficulty: "Medium", companies: ["Amazon", "Google"], time: "25 min", solution: "Maintain boundaries and traverse in spiral order." },
    { id: 40, title: "Rotate Image", topic: "Arrays", difficulty: "Medium", companies: ["Apple", "Meta"], time: "20 min", solution: "Transpose matrix then reverse each row." },
    { id: 41, title: "Implement Trie", topic: "Trees", difficulty: "Medium", companies: ["Google", "Amazon"], time: "30 min", solution: "TrieNode with children map and isEnd flag." },
    { id: 42, title: "Binary Tree Maximum Path Sum", topic: "Trees", difficulty: "Hard", companies: ["Meta", "Amazon"], time: "40 min", solution: "Post-order traversal tracking max path through each node." },
    { id: 43, title: "Serialize and Deserialize Binary Tree", topic: "Trees", difficulty: "Hard", companies: ["Google", "Microsoft"], time: "40 min", solution: "Pre-order traversal with null markers for serialization." },
    { id: 44, title: "LRU Cache", topic: "Design", difficulty: "Medium", companies: ["Amazon", "Meta"], time: "35 min", solution: "Doubly linked list with hash map for O(1) operations." },
    { id: 45, title: "Find Median from Data Stream", topic: "Design", difficulty: "Hard", companies: ["Google", "Amazon"], time: "40 min", solution: "Two heaps: max heap for lower half, min heap for upper half." },
    { id: 46, title: "Word Search", topic: "Graphs", difficulty: "Medium", companies: ["Meta", "Microsoft"], time: "30 min", solution: "DFS backtracking on grid to find word path." },
    { id: 47, title: "Combination Sum", topic: "Arrays", difficulty: "Medium", companies: ["Amazon", "Google"], time: "25 min", solution: "Backtracking with pruning, allow reuse of same element." },
    { id: 48, title: "Permutations", topic: "Arrays", difficulty: "Medium", companies: ["Meta", "Apple"], time: "25 min", solution: "Backtracking swapping elements to generate all permutations." },
    { id: 49, title: "Subsets", topic: "Arrays", difficulty: "Medium", companies: ["Google", "Amazon"], time: "20 min", solution: "Backtracking or iterative approach adding elements to subsets." },
    { id: 50, title: "Letter Combinations of Phone Number", topic: "Strings", difficulty: "Medium", companies: ["Amazon", "Meta"], time: "20 min", solution: "Backtracking with digit-to-letters mapping." }
  ];

  const menuItems = [
    { icon: <FaHome className="w-5 h-5" />, label: "Home", path: "/home" },
    { icon: <FaRoute className="w-5 h-5" />, label: "Career Roadmap", path: "/career-roadmap" },
    { icon: <FaCode className="w-5 h-5" />, label: "DSA Interview", path: "/dsa" },
    { icon: <FaFileAlt className="w-5 h-5" />, label: "Resume Builder", path: "/resume" },
    { icon: <FaBrain className="w-5 h-5" />, label: "AI Resume Analyser", path: "/ai-analyser" },
    { icon: <FaSignOutAlt className="w-5 h-5" />, label: "Log Out", path: "/login" }
  ];

  const filteredQuestions = questions.filter(q => {
    const matchesCompany = selectedCompany === 'All' || q.companies.includes(selectedCompany);
    const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic;
    const searchText = `${q.title} ${q.topic} ${q.companies.join(' ')}`.toLowerCase();
    const matchesSearch = searchText.includes(searchQuery.toLowerCase());
    return matchesCompany && matchesDifficulty && matchesTopic && matchesSearch;
  });

  const easyCount = questions.filter(q => q.difficulty === 'Easy').length;
  const mediumCount = questions.filter(q => q.difficulty === 'Medium').length;
  const hardCount = questions.filter(q => q.difficulty === 'Hard').length;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const clearFilters = () => {
    setSelectedCompany('All');
    setSelectedDifficulty('All');
    setSelectedTopic('All');
    setSearchQuery('');
  };

  const leetcodeSlugs: Record<number, string> = {
    1: 'two-sum',
    2: 'reverse-linked-list',
    3: 'valid-parentheses',
    4: 'merge-two-sorted-lists',
    5: 'best-time-to-buy-and-sell-stock',
    6: 'maximum-subarray',
    7: 'binary-tree-level-order-traversal',
    8: 'longest-substring-without-repeating-characters',
    9: '3sum',
    10: 'container-with-most-water',
    11: 'merge-intervals',
    12: 'search-in-rotated-sorted-array',
    13: 'validate-binary-search-tree',
    14: 'lowest-common-ancestor-of-a-binary-search-tree',
    15: 'course-schedule',
    16: 'number-of-islands',
    17: 'clone-graph',
    18: 'word-break',
    19: 'coin-change',
    20: 'house-robber',
    21: 'median-of-two-sorted-arrays',
    22: 'trapping-rain-water',
    23: 'word-ladder',
    24: 'regular-expression-matching',
    25: 'longest-valid-parentheses',
    26: 'remove-duplicates-from-sorted-array',
    27: 'climbing-stairs',
    28: 'valid-palindrome',
    29: 'single-number',
    30: 'linked-list-cycle',
    31: 'minimum-window-substring',
    32: 'edit-distance',
    33: 'palindrome-partitioning',
    34: 'group-anagrams',
    35: 'jump-game',
    36: 'unique-paths',
    37: 'kth-largest-element-in-an-array',
    38: 'product-of-array-except-self',
    39: 'spiral-matrix',
    40: 'rotate-image',
    41: 'implement-trie-prefix-tree',
    42: 'binary-tree-maximum-path-sum',
    43: 'serialize-and-deserialize-binary-tree',
    44: 'lru-cache',
    45: 'find-median-from-data-stream',
    46: 'word-search',
    47: 'combination-sum',
    48: 'permutations',
    49: 'subsets',
    50: 'letter-combinations-of-a-phone-number'
  };

  const getLeetCodeUrl = (questionId: number) => {
    return `https://leetcode.com/problems/${leetcodeSlugs[questionId]}/`;
  };

  const openProblem = (questionId: number) => {
    window.open(getLeetCodeUrl(questionId), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-950 lg:flex">
      <aside className={`fixed lg:sticky inset-y-0 left-0 top-0 z-50 h-screen w-72 flex-shrink-0 border-r border-white/10 bg-slate-950/95 backdrop-blur-xl transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex h-full flex-col">
          <div className="border-b border-white/10 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-blue-500/10">
                  <img src="/images/logo.png" alt="CatalystPath" className="h-9 w-10 object-contain" />
                </div>
                <div className="min-w-0">
                  <span className="block truncate text-lg font-black text-white">CatalystPath</span>
                  <span className="block text-xs font-medium text-slate-400">Career cockpit</span>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                aria-label="Close menu"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
          </div>

          <nav className="flex-1 p-4 sm:p-5">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
                      item.label === "DSA Interview"
                        ? "bg-white text-slate-950 shadow-xl shadow-blue-500/10"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mx-5 mb-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-3 text-white">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-violet-600">
                <FaRocket className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-black">Today&apos;s focus</p>
                <p className="text-xs text-slate-400">Finish 5 mixed problems</p>
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-sky-400 to-violet-500" />
            </div>
          </div>

          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 font-black text-white">
                S
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white">Student</p>
                <p className="truncate text-xs text-slate-400">student1@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="min-w-0 flex-1 bg-slate-50">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm lg:hidden"
                  aria-label="Open menu"
                >
                  <FaBars className="h-5 w-5" />
                </button>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-600">DSA Interview</p>
                  <h1 className="truncate text-xl font-semibold text-slate-950 sm:text-2xl">Practice Questions</h1>
                </div>
              </div>
              <span className="hidden rounded-2xl border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 sm:inline-flex">
                {filteredQuestions.length} Questions
              </span>
            </div>
          </div>
        </header>

        <main className="px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
              <div className="grid gap-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5 sm:p-7 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-medium text-blue-700">
                    <FaCode className="h-3.5 w-3.5" />
                    Company-wise interview prep
                  </div>
                  <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
                    Practice DSA with a calm, focused roadmap.
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                    Filter by company, difficulty, or topic. Click a problem to open it on LeetCode; use Show Solution for a quick idea first.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Easy", value: easyCount, className: "bg-green-50 text-green-700 border-green-100" },
                    { label: "Medium", value: mediumCount, className: "bg-yellow-50 text-yellow-700 border-yellow-100" },
                    { label: "Hard", value: hardCount, className: "bg-red-50 text-red-700 border-red-100" }
                  ].map((stat) => (
                    <div key={stat.label} className={`rounded-3xl border p-4 text-center ${stat.className}`}>
                      <p className="text-2xl font-semibold">{stat.value}</p>
                      <p className="mt-1 text-xs font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="grid gap-4 xl:grid-cols-[1fr_auto] xl:items-end">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">Search questions</span>
                  <span className="relative block">
                    <FaSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by question, topic, or company"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </span>
                </label>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:min-w-[720px]">
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <FaFilter className="h-3.5 w-3.5 text-slate-400" />
                      Company
                    </span>
                    <select
                      value={selectedCompany}
                      onChange={(event) => setSelectedCompany(event.target.value)}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                    >
                      {companies.map(company => (
                        <option key={company} value={company}>{company}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">Difficulty</span>
                    <select
                      value={selectedDifficulty}
                      onChange={(event) => setSelectedDifficulty(event.target.value)}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                    >
                      {difficulties.map(difficulty => (
                        <option key={difficulty} value={difficulty}>{difficulty}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">Topic</span>
                    <select
                      value={selectedTopic}
                      onChange={(event) => setSelectedTopic(event.target.value)}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                    >
                      {topics.map(topic => (
                        <option key={topic} value={topic}>{topic}</option>
                      ))}
                    </select>
                  </label>

                  <button
                    onClick={clearFilters}
                    className="h-12 self-end rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              {filteredQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
                >
                  <div
                    className="cursor-pointer p-4 sm:p-5"
                    role="link"
                    tabIndex={0}
                    onClick={() => openProblem(question.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        openProblem(question.id);
                      }
                    }}
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">#{question.id}</span>
                          <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-950 group-hover:text-blue-700">
                            {question.title}
                            <FaExternalLinkAlt className="h-3.5 w-3.5 text-slate-400" />
                          </h3>
                        </div>

                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span className={`rounded-full border px-3 py-1 text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </span>
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                            {question.topic}
                          </span>
                          <div className="flex items-center gap-1.5 text-sm text-slate-500">
                            <FaClock className="h-3 w-3" />
                            <span>{question.time}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-medium text-slate-500">Asked in:</span>
                          {question.companies.map((company) => (
                            <span key={company} className="rounded-lg bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
                              {company}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          setExpandedQuestion(expandedQuestion === question.id ? null : question.id);
                        }}
                        className="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 lg:w-auto"
                      >
                        {expandedQuestion === question.id ? 'Hide' : 'Show'} Solution
                      </button>
                    </div>

                    {expandedQuestion === question.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-5 border-t border-slate-200 pt-5"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <div className="flex items-start gap-3 rounded-2xl bg-green-50 p-4">
                          <FaCheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                          <div>
                            <h4 className="mb-1 font-semibold text-slate-950">Solution Approach</h4>
                            <p className="text-sm leading-6 text-slate-700">{question.solution}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}

              {filteredQuestions.length === 0 && (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                  <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-slate-500">
                    <FaSearch className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-950">No questions found</h3>
                  <p className="mt-2 text-sm text-slate-500">Try adjusting filters or search query.</p>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DSAPage;
