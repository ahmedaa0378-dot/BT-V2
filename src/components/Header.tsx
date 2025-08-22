import { FC } from "react";
import { Mic, Moon, Sun } from "lucide-react";
import logo from "../assets/logo-bubble-dollar.svg";
import { useTheme } from "../hooks/useTheme";

type View = 'dashboard' | 'add-expense' | 'expenses' | 'budgets' | 'split-expense';

export const Header: FC<{
  currentView: View;
  onViewChange: (v: View) => void;
  isListening?: boolean;
}> = ({ currentView, onViewChange, isListening }) => {
  const { theme, setTheme } = useTheme();

  const tab = (v: View, label: string) => (
    <button
      onClick={() => onViewChange(v)}
      className={`px-3 py-2 rounded-xl text-sm font-medium transition
        ${currentView === v
          ? "bg-brand-grad text-white"
          : "hover:bg-slate-100 dark:hover:bg-base-700 text-slate-700 dark:text-slate-200"}
      `}
    >
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur dark:bg-base-900/80 dark:border-base-700">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        {/* Left: Logo + title */}
        <div className="flex items-center gap-3">
          <img src={logo} className="h-7 w-7" alt="Budget Talk" />
          <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Budget Talk
          </span>
          <nav className="hidden md:flex items-center gap-1 ml-3">
            {tab('dashboard', 'Dashboard')}
            {tab('add-expense', 'Add')}
            {tab('expenses', 'Expenses')}
            {tab('budgets', 'Budgets')}
          </nav>
        </div>

        {/* Right: Mic state + theme toggle */}
        <div className="flex items-center gap-3">
          {isListening ? (
            <div className="flex items-center gap-1 text-white">
              <span className="animate-pulseRing inline-flex items-center justify-center rounded-full bg-brand-grad p-2">
                <Mic className="h-4 w-4" />
              </span>
              <span className="text-sm text-slate-700 dark:text-slate-200">Listening…</span>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-1 text-slate-600 dark:text-slate-300">
              <Mic className="h-4 w-4" />
              <span className="text-sm">Voice ready</span>
            </div>
          )}

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-xl border px-2 py-1.5 bg-white hover:bg-slate-50 dark:bg-base-800 dark:hover:bg-base-700 dark:border-base-700"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
          </button>
        </div>
      </div>
    </header>
  );
};
