import React, { useState, useEffect, createContext, useContext } from 'react';
import { ChevronRight, Play, Check, Star, ArrowRight, Menu, X, Mic, DollarSign, TrendingUp, Shield, Users, Smartphone, BarChart3, Plus, List, LogOut, Upload, Calendar, ChevronLeft, Sun, Moon, Camera } from 'lucide-react';

// Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={isDarkMode ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

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
const supabaseUrl = 'https://zqbrtdrnqsncphjbugps.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxYnJ0ZHJucXNuY3BoamJ1Z3BzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5MTA2MDQsImV4cCI6MjA3MTQ4NjYwNH0.CBCuEXChVLlxWIikgM0hPwL2a8AIku4eDHAVtf8JEBI';
const supabase = {
  auth: {
    signInWithOAuth: async (options) => {
      console.log('Google OAuth would be triggered here with:', options);
      // For demo, return mock user
      return {
        data: {
          user: {
            id: 'mock-user-id',
            email: 'user@example.com',
            user_metadata: {
              full_name: 'Demo User',
              avatar_url: 'https://via.placeholder.com/40'
            }
          }
        },
        error: null
      };
    },
    signOut: async () => {
      console.log('User signed out');
      return { error: null };
    },
    getSession: async () => {
      return { data: { session: null }, error: null };
    },
    onAuthStateChange: (callback) => {
      console.log('Auth state change listener set up');
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
  }
};

// Auth Hook
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    
    if (error) {
      console.error('Error logging in:', error.message);
      return { error };
    }
    return { error: null };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    }
    return { error };
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signOut
  };
};
const ExpenseForm = ({ onClose, onSave, expenses, setExpenses }) => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    receipt: null
  });
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Travel',
    'Education',
    'Business',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVoiceInput = () => {
    setIsVoiceRecording(true);
    setTimeout(() => {
      setIsVoiceRecording(false);
      setFormData(prev => ({
        ...prev,
        description: 'Lunch at downtown cafe',
        amount: '25',
        category: 'Food & Dining'
      }));
    }, 3000);
  };

  const handleReceiptUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        receipt: file
      }));
    }
  };

  const handleSave = () => {
    if (!formData.description || !formData.amount || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    const newExpense = {
      id: Date.now(),
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      receipt: formData.receipt
    };

    const updatedExpenses = [newExpense, ...expenses];
    setExpenses(updatedExpenses);
    onSave(newExpense);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button onClick={onClose} className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add Expense</h2>
          </div>
          
          <button
            onClick={handleVoiceInput}
            disabled={isVoiceRecording}
            className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors disabled:opacity-50"
          >
            <div className="relative">
              <Mic className="w-4 h-4" />
              {isVoiceRecording && <div className="absolute -inset-1 bg-blue-400 rounded-full animate-ping opacity-30"></div>}
            </div>
            <span>{isVoiceRecording ? 'Listening...' : 'Voice Input'}</span>
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="e.g., Lunch at cafe, Gas for car..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-500 dark:text-gray-400">$</span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Receipt (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleReceiptUpload}
                className="hidden"
                id="receipt-upload"
              />
              <label htmlFor="receipt-upload" className="cursor-pointer">
                {formData.receipt ? (
                  <div className="text-green-600 dark:text-green-400">
                    <Check className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-medium">{formData.receipt.name}</p>
                  </div>
                ) : (
                  <div className="text-gray-500 dark:text-gray-400">
                    <Upload className="w-8 h-8 mx-auto mb-2" />
                    <p>Click to upload receipt</p>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Save Expense</span>
          </button>
        </div>
      </div>
    </div>
  );
};const BudgetForm = ({ onClose, onSave, budgets, setBudgets }) => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    category: '',
    budget: '',
    period: 'Monthly'
  });

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Travel',
    'Education',
    'Business',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!formData.category || !formData.budget || parseFloat(formData.budget) <= 0) {
      alert('Please select a category and enter a valid budget amount');
      return;
    }

    const existingBudgetIndex = budgets.findIndex(b => b.category === formData.category);
    
    if (existingBudgetIndex >= 0) {
      const updatedBudgets = [...budgets];
      updatedBudgets[existingBudgetIndex] = {
        ...updatedBudgets[existingBudgetIndex],
        budget: parseFloat(formData.budget),
        period: formData.period
      };
      setBudgets(updatedBudgets);
    } else {
      const newBudget = {
        id: Date.now(),
        category: formData.category,
        budget: parseFloat(formData.budget),
        spent: 0,
        period: formData.period
      };
      setBudgets([...budgets, newBudget]);
    }

    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add Budget</h2>
          <button onClick={onClose} className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {!formData.category && (
              <p className="text-sm text-red-500 mt-1">Category is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Budget Limit</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-500 dark:text-gray-400">$</span>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            {formData.budget && parseFloat(formData.budget) <= 0 && (
              <p className="text-sm text-red-500 mt-1">Budget limit must be greater than 0</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Period</label>
            <select
              name="period"
              value={formData.period}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Add Budget
          </button>
        </div>
      </div>
    </div>
  );
  
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Food & Dining', budget: 500, spent: 325, period: 'Monthly' },
    { id: 2, category: 'Transportation', budget: 200, spent: 145, period: 'Monthly' },
    { id: 3, category: 'Shopping', budget: 300, spent: 289, period: 'Monthly' },
    { id: 4, category: 'Entertainment', budget: 150, spent: 67, period: 'Monthly' }
  ]);

  const [isRecording, setIsRecording] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);

  const handleVoiceExpense = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const newExpense = {
        id: Date.now(),
        category: 'Food & Dining',
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <BudgetTalkLogo />
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">Welcome back</div>
              <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
              <div className="text-xs text-purple-600 dark:text-purple-400 capitalize">{user.type} Account</div>
            </div>
            
            <button
              onClick={onSignOut}
              className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors p-2"
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                  {isRecording ? 'Listening to your expense' : 'Voice entry'}
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
          
          <button 
            onClick={() => setShowBudgetForm(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <BarChart3 className="w-8 h-8" />
              <div className="text-left">
                <div className="font-semibold text-lg">Add Budget</div>
                <div className="text-sm opacity-90">Set spending limits</div>
              </div>
            </div>
          </button>

          <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <TrendingUp className="w-8 h-8" />
              <div className="text-left">
                <div className="font-semibold text-lg">View Analytics</div>
                <div className="text-sm opacity-90">Detailed insights</div>
              </div>
            </div>
          </button>
        </div>

        {/* Budget Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Budget Overview</h3>
            <button 
              onClick={() => setShowBudgetForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Budget</span>
            </button>
          </div>

          {budgets.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {budgets.map(budget => {
                const percentage = (budget.spent / budget.budget) * 100;
                const isOverBudget = percentage > 100;
                
                return (
                  <div key={budget.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-gray-900 dark:text-white">{budget.category}</h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{budget.period}</span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">
                          ${budget.spent} of ${budget.budget}
                        </span>
                        <span className={`font-medium ${isOverBudget ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            isOverBudget 
                              ? 'bg-red-500' 
                              : percentage > 80 
                                ? 'bg-yellow-500' 
                                : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {isOverBudget && (
                      <div className="text-xs text-red-600 dark:text-red-400 font-medium">
                        Over budget by ${(budget.spent - budget.budget).toFixed(2)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Expenses */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Expenses</h3>
            <button 
              onClick={() => setShowExpenseForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Expense</span>
            </button>
          </div>

          {expenses.length === 0 ? (
            <div className="text-center py-12">
              <List className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No expenses recorded yet</p>
              <button 
                onClick={() => setShowExpenseForm(true)}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Add Your First Expense
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {expenses.slice(0, 5).map(expense => (
                <div key={expense.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{expense.description}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{expense.category} • {expense.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-white">${expense.amount}</div>
                  </div>
                </div>
              ))}
              
              {expenses.length > 5 && (
                <div className="text-center pt-4">
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                    View All Expenses ({expenses.length})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showExpenseForm && (
        <ExpenseForm 
          onClose={() => setShowExpenseForm(false)}
          onSave={(expense) => {
            // Update budgets with new expense
            const updatedBudgets = budgets.map(budget => {
              if (budget.category === expense.category) {
                return { ...budget, spent: budget.spent + expense.amount };
              }
              return budget;
            });
            setBudgets(updatedBudgets);
          }}
          expenses={expenses}
          setExpenses={setExpenses}
        />
      )}

      {showBudgetForm && (
        <BudgetForm 
          onClose={() => setShowBudgetForm(false)}
          onSave={() => {}}
          budgets={budgets}
          setBudgets={setBudgets}
        />
      )}
    </div>
  );
};

import { Routes, Route, Navigate } from "react-router-dom";

// Pages

// Your existing components/hooks
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { BudgetManager } from "./components/BudgetManager";
import { ExpenseSplitter } from "./components/ExpenseSplitter";
import { useExpenses } from "./hooks/useExpenses";
import { useBudgets } from "./hooks/useBudgets";
import { useVoiceRecording } from "./hooks/useVoiceRecording";

// Auth utils
import { useAuth } from "./hooks/useAuth";
import { supabase } from "./lib/supabaseClient";

// -------------------------
// Types
// -------------------------
type View = "dashboard" | "add-expense" | "expenses" | "budgets" | "split-expense";

// -------------------------
// BudgetTalkApp (your existing UI)
// -------------------------
function BudgetTalkApp() {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(null);

  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const { budgets, addBudget, updateBudget, deleteBudget } = useBudgets();
  const {
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    isSupported,
  } = useVoiceRecording();

  const selectedExpense = selectedExpenseId
    ? expenses.find((exp) => exp.id === selectedExpenseId)
    : null;

  const handleExpenseSelect = (expenseId: string) => {
    setSelectedExpenseId(expenseId);
    setCurrentView("add-expense");
  };

  const handleExpenseSubmit = () => {
    setSelectedExpenseId(null);
    setCurrentView("expenses");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <Dashboard
            expenses={expenses}
            budgets={budgets}
            onAddExpense={() => setCurrentView("add-expense")}
            onViewExpenses={() => setCurrentView("expenses")}
            onManageBudgets={() => setCurrentView("budgets")}
          />
        );
      case "add-expense":
        return (
          <ExpenseForm
            expense={selectedExpense}
            budgets={budgets}
            onSubmit={(expenseData) => {
              if (selectedExpense) {
                updateExpense(selectedExpense.id, expenseData);
              } else {
                (async () => {
                  try {
                    await addExpense(expenseData);
                  } catch (error) {
                    console.error("Error adding expense:", error);
                  }
                })();
              }
              handleExpenseSubmit();
            }}
            onCancel={() => {
              setSelectedExpenseId(null);
              setCurrentView("dashboard");
            }}
            transcript={transcript}
            interimTranscript={interimTranscript}
            isListening={isListening}
            onStartListening={startListening}
            onStopListening={stopListening}
            isVoiceSupported={isSupported}
          />
        );
      case "expenses":
        return (
          <ExpenseList
            expenses={expenses}
            budgets={budgets}
            onEditExpense={handleExpenseSelect}
            onDeleteExpense={deleteExpense}
            onAddExpense={() => setCurrentView("add-expense")}
            onSplitExpense={(expenseId) => {
              setSelectedExpenseId(expenseId);
              setCurrentView("split-expense");
            }}
          />
        );
      case "budgets":
        return (
          <BudgetManager
            budgets={budgets}
            expenses={expenses}
            onAddBudget={addBudget}
            onUpdateBudget={updateBudget}
            onDeleteBudget={deleteBudget}
          />
        );
      case "split-expense":
        return (
          <ExpenseSplitter
            expense={selectedExpense}
            onSplitComplete={(splits) => {
              if (selectedExpense) {
                updateExpense(selectedExpense.id, { ...selectedExpense, splits });
              }
              setSelectedExpenseId(null);
              setCurrentView("expenses");
            }}
            onCancel={() => {
              setSelectedExpenseId(null);
              setCurrentView("expenses");
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-base-900">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        isListening={isListening}
      />
      <main className="container mx-auto px-4 py-6">{renderCurrentView()}</main>
    </div>
  );
}

// -------------------------
// LoginPage (inline inside App.tsx)
// -------------------------
const LoginPage: React.FC<{ onLogin?: (info: any) => void; onBack?: () => void }> = ({
  onLogin,
  onBack,
}) => {
  const [currentView, setCurrentView] = useState<"selection" | "personal-login" | "business-register">(
    "selection"
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    fullName: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGoogleAuth = async (accountType: "personal" | "business") => {
    setLoading(true);
    const { error } = await signInWithGoogle(); // redirects to /auth/callback
    if (error) {
      alert("Authentication failed. Please try again.");
      setLoading(false);
    }
    // Do not call onLogin here; OAuth flow will continue via /auth/callback.
  };

  const handlePersonalLogin = async () => {
    if (!formData.email) {
      alert("Please enter your email");
      return;
    }
    // TODO: Replace with supabase.auth.signInWithPassword if you add email/pwd
    onLogin?.({ name: "Personal User", type: "personal", email: formData.email });
    window.location.assign("/app");
  };

  const handleBusinessRegister = () => {
    if (!formData.email || !formData.businessName || !formData.fullName) {
      alert("Please fill in all required fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onLogin?.({
      name: formData.businessName,
      type: "business",
      email: formData.email,
      fullName: formData.fullName,
      phone: formData.phone,
    });
    window.location.assign("/app");
  };

  // --- UI states (your original layouts with tiny tweaks) ---
  if (currentView === "selection") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Welcome to BudgetTalk</h2>
            <p className="text-purple-100 mt-2">Choose your account type to get started</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setCurrentView("personal-login")}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="text-left px-4">
                <div className="font-bold">Personal Account</div>
                <div className="text-sm opacity-90">Track your personal expenses and budgets</div>
              </div>
            </button>

            <button
              onClick={() => setCurrentView("business-register")}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="text-left px-4">
                <div className="font-bold">Business Account</div>
                <div className="text-sm opacity-90">Manage business expenses and team budgets</div>
              </div>
            </button>
          </div>

          <button
            onClick={onBack ?? (() => (window.location.href = "/"))}
            className="w-full mt-6 text-gray-300 hover:text-white transition-colors py-2"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (currentView === "personal-login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Personal Login</h2>
            <p className="text-purple-100 mt-2">Sign in to your personal account</p>
          </div>

          <div className="space-y-6">
            <button
              onClick={() => handleGoogleAuth("personal")}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-3 transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              <span>{loading ? "Signing in..." : "Continue with Google"}</span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-300">or continue with email</span>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={handlePersonalLogin}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentView("selection")}
              className="text-gray-300 hover:text-white transition-colors"
            >
              ← Back
            </button>
            <button className="text-purple-300 hover:text-purple-100 transition-colors text-sm">
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === "business-register") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Create Business Account</h2>
            <p className="text-purple-100 mt-2">Set up your business expense tracking</p>
          </div>

          <div className="space-y-6">
            <button
              onClick={() => handleGoogleAuth("business")}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-3 transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              <span>{loading ? "Registering..." : "Register with Google"}</span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-300">or register manually</span>
              </div>
            </div>

            {/* business fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Enter your business name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleBusinessRegister}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-3 rounded-xl font-semibold transition-colors"
              >
                Create Business Account
              </button>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentView("selection")}
              className="text-gray-300 hover:text-white transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <BudgetTalkLogo />
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">How it Works</a>
              <a href="#pricing" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Pricing</a>
              <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">About</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Sign In</button>
              <button 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-700 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-b-2xl border-t dark:border-gray-700">
              <div className="px-4 py-6 space-y-4">
                <a href="#features" className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Features</a>
                <a href="#how-it-works" className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">How it Works</a>
                <a href="#pricing" className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Pricing</a>
                <a href="#about" className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">About</a>
                <div className="pt-4 space-y-3">
                  <button className="w-full text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 py-2">Sign In</button>
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
                <div className="inline-flex items-center space-x-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium">
                  <Star className="w-4 h-4" />
                  <span>Voice-Powered Expense Tracking</span>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Talk to your
                  <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    budget.
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
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
                
                <button className="group bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-sm font-semibold">
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">10,000+ users trust BudgetTalk</span>
                </div>
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border dark:border-gray-700">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 p-6 border-b dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">BudgetTalk Dashboard</div>
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
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <Mic className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -inset-2 bg-purple-400 rounded-full animate-ping opacity-30"></div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-600 dark:text-gray-300">Voice Recording...</div>
                        <div className="text-gray-800 dark:text-white font-medium">"Spent $25 on lunch today"</div>
                      </div>
                    </div>

                    {/* Recent Expenses */}
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Recent Expenses</div>
                      {[
                        { category: "Food", amount: "$25", color: "bg-orange-500" },
                        { category: "Transport", amount: "$15", color: "bg-blue-500" },
                        { category: "Shopping", amount: "$89", color: "bg-purple-500" }
                      ].map((expense, i) => (
                        <div key={i} className="flex items-center justify-between py-2">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 ${expense.color} rounded-full`}></div>
                            <span className="text-gray-700 dark:text-gray-300">{expense.category}</span>
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">{expense.amount}</span>
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
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">What you can do</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to make expense tracking effortless and insightful
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">How it works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get started in minutes with our simple 3-step process
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl font-bold rounded-2xl mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Loved by thousands</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">See what our users are saying about BudgetTalk</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-sm">
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
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
      <footer className="bg-gray-900 dark:bg-black text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <BudgetTalkLogo size="default" className="mb-6" />
              <p className="text-gray-400 leading-relaxed mb-6">
                Voice-powered expense tracking that makes budgeting effortless for individuals and businesses.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Product</h3>
              <div className="space-y-3">
                <a href="#" className="block hover:text-purple-400 transition-colors">Features</a>
                <a href="#" className="block hover:text-purple-400 transition-colors">Pricing</a>
                <a href="#" className="block hover:text-purple-400 transition-colors">API</a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Company</h3>
              <div className="space-y-3">
                <a href="#" className="block hover:text-purple-400 transition-colors">About Us</a>
                <a href="#" className="block hover:text-purple-400 transition-colors">Careers</a>
                <a href="#" className="block hover:text-purple-400 transition-colors">Blog</a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Support</h3>
              <div className="space-y-3">
                <a href="#" className="block hover:text-purple-400 transition-colors">Help Center</a>
                <a href="#" className="block hover:text-purple-400 transition-colors">Contact Us</a>
                <a href="#" className="block hover:text-purple-400 transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2024 BudgetTalk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Main App Component
function App() {
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

  return (
    <ThemeProvider>
      {currentView === 'landing' && <LandingPage onGetStarted={handleGetStarted} />}
      {currentView === 'login' && (
        <LoginPage 
          onLogin={handleLogin} 
          onBack={() => setCurrentView('landing')} 
        />
      )}
      {currentView === 'dashboard' && <Dashboard user={user} onSignOut={handleSignOut} />}
    </ThemeProvider>
  );
}

export default App;