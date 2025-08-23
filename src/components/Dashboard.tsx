const Dashboard = ({ user, onSignOut }) => {
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
                  {isRecording ? 'Listening...' : 'Voice entry'}
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
                <div className="text-sm opacity-90">Add expense</div>
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
                <div className="text-sm opacity-90">Set limits</div>
              </div>
            </div>
          </button>

          <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <TrendingUp className="w-8 h-8" />
              <div className="text-left">
                <div className="font-semibold text-lg">Analytics</div>
                <div className="text-sm opacity-90">View insights</div>
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
              <p className="text-gray-600 dark:text-gray-400 mb-4">No budgets set</p>
              <button 
                onClick={() => setShowBudgetForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
              >
                Create Your First Budget
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {budgets.map((budget, index) => {
                const percentage = (budget.spent / budget.budget) * 100;
                const isOverBudget = percentage > 100;
                
                return (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{budget.category}</span>
                      <span className={`text-sm ${isOverBudget ? 'text-red-600' : 'text-gray-600 dark:text-gray-400'}`}>
                        ${budget.spent} / ${budget.budget}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
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
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {percentage.toFixed(1)}% used
                      {isOverBudget && <span className="text-red-600 ml-2">Over budget!</span>}
                    </div>
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
            <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">View All</button>
          </div>
          
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${
                    expense.category === 'Food & Dining' ? 'bg-orange-500' :
                    expense.category === 'Transportation' ? 'bg-blue-500' :
                    expense.category === 'Shopping' ? 'bg-purple-500' :
                    'bg-gray-500'
                  }`}>
                    {expense.category === 'Food & Dining' ? '🍽️' :
                     expense.category === 'Transportation' ? '🚗' :
                     expense.category === 'Shopping' ? '🛒' : '💼'}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{expense.description}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{expense.category} • {expense.date}</div>
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  ${expense.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showExpenseForm && (
        <ExpenseForm 
          onClose={() => setShowExpenseForm(false)}
          onSave={() => {}}
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