/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { FaRocket, FaCode, FaFileAlt, FaBrain, FaArrowRight, FaLinkedin, FaTwitter, FaGithub, FaEnvelope, FaStar, FaLightbulb, FaFire } from 'react-icons/fa';

function Landing() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | string | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: <FaRocket className="w-7 h-7" />,
      title: "Find Your Internship",
      description: "Discover curated opportunities from companies that believe in your potential. Real roles, real growth.",
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      badge: "500+ Jobs",
      icon_color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaCode className="w-7 h-7" />,
      title: "Master DSA",
      description: "Crack those interviews with confidence. Learn from patterns, not just problems.",
      color: "from-purple-400 to-pink-400",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      badge: "1000+ Problems",
      icon_color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaFileAlt className="w-7 h-7" />,
      title: "Professional Resume",
      description: "Your story deserves to be told right. ATS-optimized templates by industry veterans.",
      color: "from-amber-400 to-orange-400",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      badge: "50+ Templates",
      icon_color: "from-amber-500 to-orange-500"
    },
    {
      icon: <FaBrain className="w-7 h-7" />,
      title: "AI-Powered Insights",
      description: "Intelligent feedback that spots what you might miss. Elevate your profile instantly.",
      color: "from-emerald-400 to-teal-400",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      badge: "AI Powered",
      icon_color: "from-emerald-500 to-teal-500"
    }
  ];

  const testimonials = [
    {
      name: "Priya Singh",
      role: "SDE @ Google",
      text: "Went from campus placements to Google in 6 months.",
      highlight: "6 months",
      avatar: "🚀"
    },
    {
      name: "Arjun Patel",
      role: "Product Manager @ Microsoft",
      text: "The DSA prep was game-changing. Cracked the hardest interviews with ease.",
      highlight: "hardest interviews",
      avatar: "💻"
    },
    {
      name: "Sarah Kumar",
      role: "Data Scientist @ Amazon",
      text: "Resume analyzer picked up details I'd completely missed. Got 10x more interview calls.",
      highlight: "10x more",
      avatar: "⭐"
    }
  ];

  const journey = [
    { step: 1, title: "Profile Created", desc: "Tell us your goals and dreams", icon: "🎯" },
    { step: 2, title: "Opportunities Match", desc: "Get personalized internship recommendations", icon: "🔍" },
    { step: 3, title: "Prepare & Practice", desc: "Master DSA with guided learning paths", icon: "💪" },
    { step: 4, title: "Polish Resume", desc: "Get AI insights and stand out", icon: "✨" },
    { step: 5, title: "Land the Role", desc: "Ace interviews with confidence", icon: "🎤" },
    { step: 6, title: "Launch Career", desc: "Begin your professional journey", icon: "🚀" },
    { step: 7, title: "Grow & Excel", desc: "Advance your career with our community", icon: "📈" }
  ];

  const stats = [
    { number: "50K+", label: "Success Stories", icon: "⭐" },
    { number: "800+", label: "Partner Companies", icon: "🏢" },
    { number: "94%", label: "Placement Rate", icon: "📈" },
    { number: "Zero", label: "Cost to Join", icon: "🎉" }
  ];

  // Scroll transforms
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-white"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 right-1/3 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Interactive light cursor effect */}
        <motion.div
          animate={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="hidden lg:block fixed w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full filter blur-3xl pointer-events-none -z-10"
        />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500&display=swap');
        
        * { font-family: 'Sora', sans-serif; }
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.5); }
        }
        
        @keyframes float-up {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in-left {
          0% { opacity: 0; transform: translateX(-100px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-shimmer { animation: shimmer 3s infinite; }
        .animate-glow-pulse { animation: glow-pulse 2s infinite; }
        .animate-float-up { animation: float-up 0.8s ease-out forwards; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
        .animate-spin-slow { animation: spin-slow 6s linear infinite; }
        
        .gradient-text {
          background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .text-shimmer {
          background: linear-gradient(90deg, #000, #666, #000);
          background-size: 1000px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s infinite;
        }
        
        .glow-card {
          position: relative;
          overflow: hidden;
        }
        
        .glow-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 1rem;
          padding: 2px;
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.3), rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        
        .glow-card:hover::before {
          opacity: 1;
        }
        
        .feature-card {
          position: relative;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .feature-card:hover {
          transform: translateY(-12px) scale(1.02);
        }
        
        .feature-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          background: linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.1));
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .feature-card:hover::after {
          opacity: 1;
        }
        
        .badge-glow {
          position: relative;
        }
        
        .badge-glow::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          color: currentColor;
          filter: blur(8px);
          opacity: 0.5;
        }
      `}</style>

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed w-full top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200/50"
      >
        <div className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <FaRocket className="text-white w-5 h-5" />
            </motion.div>
            <span className="text-xl font-bold gradient-text">CatalystPath</span>
          </motion.div>
          <motion.a
            href="/login"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.08, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl transition-all shadow-lg"
          >
            Login
          </motion.a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div className="pt-32 pb-16 px-6 sm:px-8" style={{ y: heroY }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border-2 border-blue-200 cursor-pointer"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                <FaStar className="w-4 h-4 text-blue-600" />
              </motion.div>
              <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Join 50K+ students transforming careers
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 mb-6 leading-tight"
            >
              Your Career<br />
              <motion.span 
                className="gradient-text inline-block"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Starts Here
              </motion.span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              From landing internships to acing interviews. We're your companion in every step of your career journey. <motion.span className="font-bold text-slate-900">Real tools, real results, real growth.</motion.span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="/home"
                whileHover={{ scale: 1.08, y: -5, boxShadow: "0 30px 60px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white rounded-xl font-bold text-lg shadow-xl"
              >
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  Get Started Free
                </motion.div>
                <motion.div animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <FaArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.08, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all"
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Hero Stats with animations */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 my-16 sm:my-24"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -10 }}
                className="relative p-6 rounded-2xl bg-white/80 backdrop-blur border border-slate-200 hover:border-slate-300 transition-all hover:shadow-xl overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ scale: [1, 1.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative z-10">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <motion.div 
                    className="text-2xl sm:text-3xl font-black text-slate-900 mb-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-slate-600 font-bold">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="py-16 sm:py-24 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div 
              className="inline-block mb-4"
              whileInView={{ scale: [0.8, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <FaFire className="w-8 h-8 text-orange-500 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              Your Complete Toolkit
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to stand out, prepared by people who've been exactly where you are.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 gap-6 sm:gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -15, scale: 1.02 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className={`feature-card glow-card group p-8 sm:p-10 rounded-2xl bg-gradient-to-br ${feature.bgColor} border-2 ${feature.borderColor} transition-all hover:shadow-2xl cursor-pointer relative overflow-hidden`}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={hoveredCard === index ? { x: [0, 100] } : { x: [-100, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.icon_color} rounded-xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:shadow-2xl`}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {feature.icon}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="inline-block mb-4"
                  >
                    <span className={`text-xs font-black px-3 py-1 rounded-full bg-gradient-to-r ${feature.color} text-white shadow-lg`}>
                      {feature.badge}
                    </span>
                  </motion.div>

                  <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Journey Section */}
      <div className="py-16 sm:py-24 px-6 sm:px-8 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full border-2 border-emerald-300"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                <FaLightbulb className="w-4 h-4 text-emerald-600" />
              </motion.div>
              <span className="text-sm font-bold text-emerald-700">PROVEN FRAMEWORK</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
              <span className="gradient-text">Get Your Job in 7 Steps</span>
            </h2>
            <p className="text-lg text-slate-600">A clear, actionable path from where you are to your dream role</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {journey.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative p-6 sm:p-8 rounded-2xl bg-white border-2 border-slate-200 hover:border-slate-400 hover:shadow-xl transition-all group overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity z-0"
                  animate={hoveredCard === `journey-${index}` ? { scale: [1, 1.1] } : {}}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ scale: [1, 1.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <motion.div 
                    className="absolute -top-4 -left-4 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-black text-xl shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    {item.step}
                  </motion.div>
                  
                  <div className="text-3xl mb-4">{item.icon}</div>
                  
                  <h3 className="text-xl font-black text-slate-900 mb-2 mt-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connecting line animation */}
          <motion.svg 
            className="hidden lg:block absolute top-1/2 left-0 w-full h-20 -translate-y-1/2"
            viewBox="0 0 1200 100"
          >
            <motion.path
              d="M 0 50 Q 300 25 600 50 T 1200 50"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </motion.svg>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 sm:py-24 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.div
              className="text-5xl sm:text-6xl mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💬
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">Success Stories</h2>
            <p className="text-lg text-slate-600">See how others transformed their careers</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative p-8 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-white border-2 border-slate-200 hover:border-slate-300 hover:shadow-2xl transition-all group overflow-hidden"
              >
                {/* Animated border on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"
                />

                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ delay: i * 0.1, duration: 0.5, repeat: Infinity }}
                      >
                        <FaStar className="w-4 h-4 text-amber-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>

                  <motion.p 
                    className="text-slate-700 mb-6 leading-relaxed font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    "{testimonial.text.split(testimonial.highlight).map((part, i) => i === 0 ? part : [
                      <motion.span 
                        key={`highlight-${i}`} 
                        className="font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {testimonial.highlight}
                      </motion.span>,
                      part
                    ])}"
                  </motion.p>

                  <div className="border-t-2 border-slate-200 pt-4 flex items-center gap-3">
                    <motion.div 
                      className="text-3xl"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {testimonial.avatar}
                    </motion.div>
                    <div>
                      <p className="font-black text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-600 font-bold">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-16 sm:py-24 px-6 sm:px-8 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"
          animate={{ y: [0, 50, 0], x: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
          animate={{ y: [0, -50, 0], x: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-3xl p-12 sm:p-16 text-white shadow-2xl overflow-hidden relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: [-1000, 1000] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <div className="relative z-10">
              <motion.div
                className="text-6xl mb-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚀
              </motion.div>

              <motion.h2 
                className="text-4xl sm:text-5xl font-black mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Ready to Launch Your Career?
              </motion.h2>

              <motion.p 
                className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Join thousands of students who've already transformed their careers. Your first step is just one click away. No credit card required. 100% free.
              </motion.p>

              <motion.a
                href="/home"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1, boxShadow: "0 40px 80px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-xl font-black text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                <motion.div animate={{ x: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                  Start Your Journey Free
                </motion.div>
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                  <FaArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="border-t-2 border-slate-200 bg-slate-50/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-4 gap-8 mb-12"
          >
            {/* Brand */}
            <motion.div variants={itemVariants} className="sm:col-span-1">
              <motion.div 
                className="flex items-center gap-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <FaRocket className="text-white w-5 h-5" />
                </motion.div>
                <span className="text-lg font-black gradient-text">CatalystPath</span>
              </motion.div>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Empowering the next generation of tech professionals through opportunity, learning, and growth.
              </p>
            </motion.div>

            {/* Links columns */}
            {[
              { title: "Product", items: ["Features", "Pricing", "Resources", "Changelog"] },
              { title: "Company", items: ["About Us", "Careers", "Blog", "Contact"] },
              { title: "Legal", items: ["Privacy", "Terms", "Cookies", "Disclaimer"] }
            ].map((section, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <h3 className="font-black text-slate-900 mb-4 text-sm uppercase tracking-widest">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <motion.li key={item} whileHover={{ x: 5 }}>
                      <a href="#" className="text-slate-600 hover:text-slate-900 hover:font-bold transition-all text-sm font-medium">
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-8 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <p className="text-slate-600 text-sm text-center sm:text-left font-medium">
              © 2024 CatalystPath. Built with ❤️ for your success.
            </p>
            <motion.div 
              className="flex items-center gap-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { icon: FaLinkedin, label: "LinkedIn" },
                { icon: FaTwitter, label: "Twitter" },
                { icon: FaGithub, label: "GitHub" },
                { icon: FaEnvelope, label: "Email" }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  variants={itemVariants}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-11 h-11 bg-white border-2 border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-md hover:shadow-lg"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
