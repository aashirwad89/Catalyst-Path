"use client"
import { motion } from 'framer-motion';
import { FaRocket, FaCode, FaFileAlt, FaBrain, FaArrowRight, FaCheckCircle, FaLinkedin, FaTwitter, FaGithub, FaEnvelope } from 'react-icons/fa';

function Landing() {
  const features = [
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: "Find Internships",
      description: "Access curated internship opportunities from top companies across various industries and technologies."
    },
    {
      icon: <FaCode className="w-8 h-8" />,
      title: "DSA Interview Prep",
      description: "Comprehensive data structures and algorithms questions with detailed solutions and complexity analysis."
    },
    {
      icon: <FaFileAlt className="w-8 h-8" />,
      title: "Resume Creator",
      description: "Professional ATS-optimized resume templates designed by industry experts to maximize your success rate."
    },
    {
      icon: <FaBrain className="w-8 h-8" />,
      title: "AI Resume Analyzer",
      description: "Advanced AI-powered analysis providing actionable insights to enhance your resume's impact and relevance."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Students" },
    { number: "500+", label: "Companies" },
    { number: "95%", label: "Success Rate" },
    { number: "1000+", label: "Internships" }
  ];

  const benefits = [
    "Real-time internship alerts matching your profile",
    "Comprehensive DSA question bank with video solutions",
    "Industry-standard ATS-friendly resume templates",
    "AI-powered resume optimization and keyword suggestions",
    "Mock interview preparation resources",
    "Career guidance from industry professionals"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md fixed w-full top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FaRocket className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-gray-900">CatalystPath</span>
          </motion.div>
          <motion.a
            href="/login"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Login
          </motion.a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-block mb-4 px-4 py-2 bg-blue-50 rounded-full"
            >
              <span className="text-blue-600 font-semibold text-sm">Your Career Acceleration Platform</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Build Your Career<br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                With Confidence
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Empower your career journey with our comprehensive platform offering internship opportunities, 
              interview preparation, and AI-powered resume optimization tools.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4"
            >
              <motion.a
                href="/home"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors shadow-lg"
              >
                Get Started Free <FaArrowRight />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Features Grid */}
          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                A complete toolkit designed to accelerate your career growth and land your dream opportunity.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all border border-gray-100 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 md:p-16 text-white mb-24"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-4 text-center">Why Choose CatalystPath?</h2>
              <p className="text-gray-300 text-center mb-12 text-lg">
                Join thousands of students who have transformed their career trajectories with our platform.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <FaCheckCircle className="w-6 h-6 flex-shrink-0 mt-1 text-green-400" />
                    <span className="text-lg text-gray-100">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              <div className="text-center">
                <motion.a
                  href="/home"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
                >
                  Start Your Journey <FaArrowRight />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FaRocket className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-gray-900">CatalystPath</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Empowering students to achieve their career goals through innovative tools and resources.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Resources</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Changelog</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              © 2024 CatalystPath. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition-colors">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white transition-colors">
                <FaEnvelope className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;