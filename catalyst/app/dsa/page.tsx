/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaCode, FaFileAlt, FaBrain, FaSignOutAlt, FaBars, FaTimes, FaRocket, FaFilter, FaSearch, FaCheckCircle, FaClock } from 'react-icons/fa';

function DSAPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const companies = ['All', 'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const topics = ['All', 'Arrays', 'Strings', 'Linked List', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching', 'Stack', 'Queue'];

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
    { icon: <FaCode className="w-5 h-5" />, label: "DSA Interview", path: "/dsa" },
    { icon: <FaFileAlt className="w-5 h-5" />, label: "Resume Builder", path: "/resume" },
    { icon: <FaBrain className="w-5 h-5" />, label: "AI Resume Analyser", path: "/ai-analyser" },
    { icon: <FaSignOutAlt className="w-5 h-5" />, label: "Log Out", path: "/login" }
  ];

  const filteredQuestions = questions.filter(q => {
    const matchesCompany = selectedCompany === 'All' || q.companies.includes(selectedCompany);
    const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic;
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCompany && matchesDifficulty && matchesTopic && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Same as Home */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="border-1 rounded-lg flex items-center justify-center">
                <img src="/images/logo.png" className='w-15 h-10' />
              </div>
              <span className="text-xl font-bold text-gray-900">CatalystPath</span>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      item.label === "DSA Interview"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                S
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">Student</p>
                <p className="text-xs text-gray-500">student1@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden text-gray-600 hover:text-gray-900"
                >
                  {sidebarOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">DSA Interview Topics</h1>
                  <p className="text-sm text-gray-600">Master these data structures and algorithms</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold text-sm">
                  {filteredQuestions.length} Questions
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-500 w-4 h-4" />
                <span className="text-sm font-semibold text-gray-700">Filters:</span>
              </div>
              
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {companies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>

              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {topics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>

              {(selectedCompany !== 'All' || selectedDifficulty !== 'All' || selectedTopic !== 'All') && (
                <button
                  onClick={() => {
                    setSelectedCompany('All');
                    setSelectedDifficulty('All');
                    setSelectedTopic('All');
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Questions List */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-3">
              {filteredQuestions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
                >
                  <div 
                    className="p-5 cursor-pointer"
                    onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-gray-500 font-medium text-sm">#{question.id}</span>
                          <h3 className="font-bold text-gray-900 text-lg">{question.title}</h3>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </span>
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                            {question.topic}
                          </span>
                          <div className="flex items-center gap-1 text-gray-600 text-sm">
                            <FaClock className="w-3 h-3" />
                            <span>{question.time}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs text-gray-500 font-medium">Asked in:</span>
                          {question.companies.map((company, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                              {company}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        {expandedQuestion === question.id ? '▲ Hide' : '▼ Show'} Solution
                      </button>
                    </div>

                    {expandedQuestion === question.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <FaCheckCircle className="text-green-600 w-5 h-5 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Solution Approach:</h4>
                            <p className="text-gray-700 leading-relaxed">{question.solution}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredQuestions.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DSAPage;