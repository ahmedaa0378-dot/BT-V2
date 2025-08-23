import React, { createContext, useContext, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { Header } from './components/Header';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { BudgetManager } from './components/BudgetManager';
import { ExpenseSplitter } from './components/ExpenseSplitter';
import { useTheme } from './hooks/useTheme';
import { useAuth } from './hooks/useAuth';
import { useExpenses } from './hooks/useExpenses';
import { useBudgets } from './hooks/useBudgets';
import { useVoiceRecording } from './hooks/useVoiceRecording';
import { Expense, ExpenseFormData, BudgetFormData } from './types';

// Theme Context
interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const themeValue = useTheme();
  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

type View = 'dashboard' | 'add-expense' | 'expenses' | 'budgets' | 'split-expense';

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useThemeContext();
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const { budgets, addBudget, updateBudget, deleteBudget } = useBudgets();
  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported: isVoiceSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useVoiceRecording();

  const [currentView, setCurrentView] = React.useState<View>('dashboard');
  const [editingExpense, setEditingExpense] = React.useState<Expense | null>(null);
  const [splittingExpense, setSplittingExpense] = React.useState<Expense | null>(null);

  const handleAddExpense = async (expenseData: ExpenseFormData) => {
    await addExpense(expenseData);
    setCurrentView('dashboard');
    resetTranscript();
  };

  const handleUpdateExpense = async (expenseData: ExpenseFormData) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, expenseData);
      setEditingExpense(null);
      setCurrentView('expenses');
    }
  };

  const handleEditExpense = (id: string) => {
    const expense = expenses.find(e => e.id === id);
    if (expense) {
      setEditingExpense(expense);
      setCurrentView('add-expense');
    }
  };

  const handleSplitExpense = (id: string) => {
    const expense = expenses.find(e => e.id === id);
    if (expense) {
      setSplittingExpense(expense);
      setCurrentView('split-expense');
    }
  };

  const handleSplitComplete = (splits: any[]) => {
    if (splittingExpense) {
      updateExpense(splittingExpense.id, { splits });
      setSplittingExpense(null);
      setCurrentView('expenses');
    }
  };

  const handleAddBudget = (budgetData: BudgetFormData) => {
    addBudget(budgetData);
  };

  const handleUpdateBudget = (id: string, budgetData: BudgetFormData) => {
    updateBudget(id, budgetData);
  };

  const handleDeleteBudget = (id: string) => {
    deleteBudget(id);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'add-expense':
        return (
          <ExpenseForm
            expense={editingExpense}
            budgets={budgets}
            onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
            onCancel={() => {
              setEditingExpense(null);
              setCurrentView('dashboard');
              resetTranscript();
            }}
            transcript={transcript}
            interimTranscript={interimTranscript}
            isListening={isListening}
            onStartListening={startListening}
            onStopListening={stopListening}
            isVoiceSupported={isVoiceSupported}
          />
        );

      case 'expenses':
        return (
          <ExpenseList
            expenses={expenses}
            budgets={budgets}
            onEditExpense={handleEditExpense}
            onDeleteExpense={deleteExpense}
            onAddExpense={() => setCurrentView('add-expense')}
            onSplitExpense={handleSplitExpense}
          />
        );

      case 'budgets':
        return (
          <BudgetManager
            budgets={budgets}
            expenses={expenses}
            onAddBudget={handleAddBudget}
            onUpdateBudget={handleUpdateBudget}
            onDeleteBudget={handleDeleteBudget}
          />
        );

      case 'split-expense':
        return (
          <ExpenseSplitter
            expense={splittingExpense}
            onSplitComplete={handleSplitComplete}
            onCancel={() => {
              setSplittingExpense(null);
              setCurrentView('expenses');
            }}
          />
        );

      default:
        return (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      ${expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Budget</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      ${budgets.reduce((sum, budget) => sum + budget.limit, 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Expenses</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{expenses.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Budgets</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{budgets.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => setCurrentView('add-expense')}
                className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-medium transition-colors text-left"
              >
                <div className="text-lg font-semibold">Add Expense</div>
                <div className="text-sm opacity-90">Record a new expense</div>
              </button>

              <button
                onClick={() => setCurrentView('expenses')}
                className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl font-medium transition-colors text-left"
              >
                <div className="text-lg font-semibold">View Expenses</div>
                <div className="text-sm opacity-90">See all your expenses</div>
              </button>

              <button
                onClick={() => setCurrentView('budgets')}
                className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl font-medium transition-colors text-left"
              >
                <div className="text-lg font-semibold">Manage Budgets</div>
                <div className="text-sm opacity-90">Set spending limits</div>
              </button>

              <button
                onClick={isVoiceSupported ? startListening : undefined}
                disabled={!isVoiceSupported || isListening}
                className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white p-4 rounded-xl font-medium transition-colors text-left"
              >
                <div className="text-lg font-semibold">
                  {isListening ? 'Listening...' : 'Voice Entry'}
                </div>
                <div className="text-sm opacity-90">
                  {isVoiceSupported ? 'Add expense by voice' : 'Voice not supported'}
                </div>
              </button>
            </div>

            {/* Recent Expenses */}
            {expenses.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Expenses</h3>
                <div className="space-y-3">
                  {expenses.slice(0, 5).map(expense => (
                    <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{expense.description}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{expense.category} • {expense.date}</div>
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white">${expense.amount.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView}
        isListening={isListening}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user.user_metadata?.full_name || user.email}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your expenses and budgets
            </p>
          </div>
          
          <button
            onClick={signOut}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            Sign Out
          </button>
        </div>

        {renderCurrentView()}
      </div>
    </div>
  );
};

// Login Component
const LoginPage: React.FC = () => {
  const { signInWithGoogle, loading } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Sign in to Budget Talk
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Personal expense tracking
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/app" replace /> : <LandingPage />} />
          <Route path="/login" element={user ? <Navigate to="/app" replace /> : <LoginPage />} />
          <Route path="/app" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;