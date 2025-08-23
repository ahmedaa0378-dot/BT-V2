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
};const Dashboard = ({ user, onSignOut }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Food & Dining', amount: 25, description: 'Lunch at cafe', date: '2024-01-15' },
    { id: 2, category: 'Transportation', amount: 15, description: 'Uber ride', date: '2024-01-15' },
    { id: 3, category: 'Shopping', amount: 89, description: 'Groceries', date: '2024-01-14' }
  ]);
  
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

export default Dashboard;
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

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <BudgetTalkLogo size="large" className="justify-center mb-8" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Talk to your <span className="text-purple-600">budget</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Voice-powered expense tracking made simple
        </p>
        <button 
          onClick={onGetStarted}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
        >
          Get Started
        </button>
      </div>
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