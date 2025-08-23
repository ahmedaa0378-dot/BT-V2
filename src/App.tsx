import React, { useState, useEffect } from 'react';
import { ChevronRight, Play, Check, Star, ArrowRight, Menu, X, Mic, DollarSign, TrendingUp, Shield, Users, Smartphone, BarChart3, Plus, Calendar, PieChart, List, Settings, LogOut } from 'lucide-react';

const BudgetTalkLogo = ({ size = "default", className = "" }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    default: "w-12 h-12", 
    large: "w-16 h-16"
  };

  const textSizeClasses = {
    small: "text-lg",
    default: "text-xl",
    large: "text-2xl"
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl shadow-lg transform rotate-3"></div>
        <div className="relative bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl p-2 shadow-md">
          <svg viewBox="0 0 24 24" className="w-full h-full text-white" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.4L2 22l5.6-1.05C9.96 21.64 11.46 22 13 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
            <path d="M12 6v2m0 8v2m-1-6h2a2 2 0 100-4h-2a2 2 0 100 4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M17 8c0 0 1 1 1 4s-1 4-1 4M19 6c0 0 2 2 2 6s-2 6-2 6" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6"/>
          </svg>
        </div>
      </div>
      <div className={`font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent ${textSizeClasses[size]}`}>
        Budget<span className="font-extrabold">Talk</span>
      </div>
    </div>
  );
};

const LandingPage = ({ onGetStarted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Voice-First Experience",
      description: "Just speak your expenses. Our AI understands and categorizes automatically.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Smart Analytics",
      description: "Get insights on your spending patterns with beautiful, interactive charts.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Bank-level security. Your financial data stays encrypted and private.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Personal & Business",
      description: "Perfect for individuals and businesses. Scale as you grow.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Works Everywhere",
      description: "Web, mobile, voice assistants. Access your budget anywhere.",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Smart Budgeting",
      description: "AI-powered budget recommendations based on your spending habits.",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Set Your Budgets",
      description: "Create monthly limits for different categories like food, travel, and entertainment."
    },
    {
      number: "02", 
      title: "Talk Your Expenses",
      description: "Simply say 'I spent $50 on groceries today' - we'll handle the rest."
    },
    {
      number: "03",
      title: "Track & Optimize",
      description: "Watch your spending in real-time and get alerts when you're close to limits."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "BudgetTalk transformed how I manage business expenses. Voice recording saves me hours every week!",
      avatar: "SJ",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Freelancer",
      content: "Finally, expense tracking that doesn't feel like a chore. Just talk and it's done!",
      avatar: "MC", 
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      role: "Marketing Director",
      content: "The analytics are incredible. I can see exactly where our team's budget is going.",
      avatar: "LR",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <BudgetTalkLogo />
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors">How it Works</a>
              <a href="#pricing" className="text-gray-700 hover:text-purple-600 transition-colors">Pricing</a>
              <a href="#about" className="text-gray-700 hover:text-purple-600 transition-colors">About</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-700 hover:text-purple-600 transition-colors">Sign In</button>
              <button 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-2xl border-t">
              <div className="px-4 py-6 space-y-4">
                <a href="#features" className="block text-gray-700 hover:text-purple-600">Features</a>
                <a href="#how-it-works" className="block text-gray-700 hover:text-purple-600">How it Works</a>
                <a href="#pricing" className="block text-gray-700 hover:text-purple-600">Pricing</a>
                <a href="#about" className="block text-gray-700 hover:text-purple-600">About</a>
                <div className="pt-4 space-y-3">
                  <button className="w-full text-gray-700 hover:text-purple-600 py-2">Sign In</button>
                  <button 
                    onClick={onGetStarted}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-full"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4" />
                  <span>Voice-Powered Expense Tracking</span>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Talk to your
                  <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    budget.
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Set monthly budgets, add expenses by voice, and track insights instantly with our modern fintech dashboard. Budgeting has never been this effortless.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={onGetStarted}
                  className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="group bg-white text-gray-800 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-200 hover:border-purple-300 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-semibold">
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">10,000+ users trust BudgetTalk</span>
                </div>
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-sm text-gray-500">BudgetTalk Dashboard</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl">
                        <div className="text-sm opacity-90">Total Budget</div>
                        <div className="text-2xl font-bold">$3,500</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-xl">
                        <div className="text-sm opacity-90">Remaining</div>
                        <div className="text-2xl font-bold">$1,240</div>
                      </div>
                    </div>

                    {/* Voice Recording Animation */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <Mic className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -inset-2 bg-purple-400 rounded-full animate-ping opacity-30"></div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">Voice Recording...</div>
                        <div className="text-gray-800 font-medium">"Spent $25 on lunch today"</div>
                      </div>
                    </div>

                    {/* Recent Expenses */}
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-gray-700">Recent Expenses</div>
                      {[
                        { category: "Food", amount: "$25", color: "bg-orange-500" },
                        { category: "Transport", amount: "$15", color: "bg-blue-500" },
                        { category: "Shopping", amount: "$89", color: "bg-purple-500" }
                      ].map((expense, i) => (
                        <div key={i} className="flex items-center justify-between py-2">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 ${expense.color} rounded-full`}></div>
                            <span className="text-gray-700">{expense.category}</span>
                          </div>
                          <span className="font-semibold text-gray-900">{expense.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">What you can do</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make expense tracking effortless and insightful
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">How it works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes with our simple 3-step process
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl font-bold rounded-2xl mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Loved by thousands</h2>
            <p className="text-xl text-gray-600">See what our users are saying about BudgetTalk</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to transform your budgeting?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who've already simplified their financial lives with BudgetTalk.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={onGetStarted}
              className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <BudgetTalkLogo size="default" className="mb-6" />
              <p className="text-gray-400 leading-relaxed mb-6">
                Voice-powered expense tracking that makes budgeting effortless for individuals and businesses.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">tw</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">fb</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Product</h3>
              <div className="space-y-3">
                <a href="#" className="block hover:text-purple-400 transition-colors">Features</a>
                <a href="#" className="block hover:text-purple-400 transition-colors">Pricing</a>
                <a href="#" className="block hover:text-purple-400 transition-colors">API</a>
                <a href="#" className="block hover:text-purple-400 transition-colors">Integrations</a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Company</h3>
              <div className="space-y-3">
                <a href="#" className="block hover:text-purple-400 transition-colors">About Us</a>
                <a href="#" className="block hover:text-purple-400 transition-colors">Careers</a>
                <a href="#" className="block hover:text-purple-400 transition-colors">Blog</a>
                <a href="#" className="block hover:text-purple-400 transition-colors">Press</a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Support</h3>
              <div className="space-y-3">
                <a href="#" className="block hover:text-purple-400 transition-colors">Help Center</a>
                <a href="#" className="block hover:text-purple-400 transition-colors">Contact Us</a>
                <a href="#" className="block hover:text-purple-400 transition-colors">Privacy Policy</a>
                <a href="#" className="block hover:text-purple-400 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 BudgetTalk. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const LoginPage = ({ onLogin, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <BudgetTalkLogo size="large" className="justify-center mb-4" />
          <h2 className="text-2xl font-bold text-white">Welcome to BudgetTalk</h2>
          <p className="text-purple-100 mt-2">Choose your account type to get started</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => onLogin({ name: 'Personal User', type: 'personal' })}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <div className="text-left px-4">
              <div className="font-bold">Personal Account</div>
              <div className="text-sm opacity-90">Track your personal expenses and budgets</div>
            </div>
          </button>
          
          <button
            onClick={() => onLogin({ name: 'Business User', type: 'business' })}
            className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <div className="text-left px-4">
              <div className="font-bold">Business Account</div>
              <div className="text-sm opacity-90">Manage business expenses and team budgets</div>
            </div>
          </button>
        </div>
        
        <button
          onClick={onBack}
          className="w-full mt-6 text-gray-300 hover:text-white transition-colors py-2"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

const Dashboard = ({ user, onSignOut }) => {
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Food', amount: 25, description: 'Lunch', date: '2024-01-15' },
    { id: 2, category: 'Transport', amount: 15, description: 'Uber ride', date: '2024-01-15' },
    { id: 3, category: 'Shopping', amount: 89, description: 'Groceries', date: '2024-01-14' }
  ]);
  
  const [budgets] = useState([
    { category: 'Food', budget: 500, spent: 325 },
    { category: 'Transport', budget: 200, spent: 145 },
    { category: 'Shopping', budget: 300, spent: 289 },
    { category: 'Entertainment', budget: 150, spent: 67 }
  ]);

  const [isRecording, setIsRecording] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const handleVoiceExpense = () => {
    setIsRecording(true);
    // Simulate voice recording
    setTimeout(() => {
      setIsRecording(false);
      const newExpense = {
        id: expenses.length + 1,
        category: 'Food',
        amount: Math.floor(Math.random() * 50) + 10,
        description: 'Voice recorded expense',
        date: new Date().toISOString().split('T')[0]
      };
      setExpenses([newExpense, ...expenses]);
    }, 3000);
  };

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budget, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <BudgetTalkLogo />
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-600">Welcome back</div>
              <div className="font-semibold text-gray-900">{user.name}</div>
              <div className="text-xs text-purple-600 capitalize">{user.type} Account</div>
            </div>
            <button
              onClick={onSignOut}
              className="text-gray-600 hover:text-red-600 transition-colors p-2"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">Total Budget</div>
                <div className="text-3xl font-bold">${totalBudget}</div>
              </div>
              <DollarSign className="w-8 h-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">Total Spent</div>
                <div className="text-3xl font-bold">${totalSpent}</div>
              </div>
              <TrendingUp className="w-8 h-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">Remaining</div>
                <div className="text-3xl font-bold">${totalBudget - totalSpent}</div>
              </div>
              <Check className="w-8 h-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm opacity-90">Expenses</div>
                <div className="text-3xl font-bold">{expenses.length}</div>
              </div>
              <List className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button 
            onClick={handleVoiceExpense}
            disabled={isRecording}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Mic className="w-8 h-8" />
                {isRecording && <div className="absolute -inset-2 bg-white rounded-full animate-ping opacity-30"></div>}
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg">
                  {isRecording ? 'Recording...' : 'Add by Voice'}
                </div>
                <div className="text-sm opacity-90">
                  {isRecording ? 'Listening to your expense' : 'Voice or manual entry'}
                </div>
              </div>
            </div>
          </button>
          
          <button 
            onClick={() => setShowExpenseForm(true)}
            className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <Plus className="w-8 h-8" />
              <div className="text-left">
                <div className="font-semibold text-lg">Manual Entry</div>
                <div className="text-sm opacity-90">Add expense manually</div>
              </div>
            </div>
          </button>
          
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <BarChart3 className="w-8 h-8" />
              <div className="text-left">
                <div className="font-semibold text-lg">View Analytics</div>
                <div className="text-sm opacity-90">Detailed insights</div>
              </div>
            </div>
          </button>
        </div>

        {/* Budget Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Budget Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {budgets.map((budget, index) => {
              const percentage = (budget.spent / budget.budget) * 100;
              const isOverBudget = percentage > 100;
              
              return (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{budget.category}</span>
                    <span className={`text-sm ${isOverBudget ? 'text-red-600' : 'text-gray-600'}`}>
                      ${budget.spent} / ${budget.budget}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        isOverBudget 
                          ? 'bg-gradient-to-r from-red-500 to-red-600' 
                          : percentage > 80 
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                            : 'bg-gradient-to-r from-green-500 to-green-600'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {percentage.toFixed(1)}% used
                    {isOverBudget && <span className="text-red-600 ml-2">Over budget!</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Recent Expenses</h3>
            <button className="text-purple-600 hover:text-purple-700 font-medium">View All</button>
          </div>
          
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${
                    expense.category === 'Food' ? 'bg-orange-500' :
                    expense.category === 'Transport' ? 'bg-blue-500' :
                    expense.category === 'Shopping' ? 'bg-purple-500' :
                    'bg-gray-500'
                  }`}>
                    {expense.category === 'Food' ? '🍽️' :
                     expense.category === 'Transport' ? '🚗' :
                     expense.category === 'Shopping' ? '🛒' : '💼'}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{expense.description}</div>
                    <div className="text-sm text-gray-600">{expense.category} • {expense.date}</div>
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  ${expense.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const BudgetTalkApp = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);

  const handleGetStarted = () => {
    setCurrentView('login');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleSignOut = () => {
    setUser(null);
    setCurrentView('landing');
  };

  if (currentView === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (currentView === 'login') {
    return (
      <LoginPage 
        onLogin={handleLogin} 
        onBack={() => setCurrentView('landing')} 
      />
    );
  }

  if (currentView === 'dashboard') {
    return <Dashboard user={user} onSignOut={handleSignOut} />;
  }
};

export default BudgetTalkApp