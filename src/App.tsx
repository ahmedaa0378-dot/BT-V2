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