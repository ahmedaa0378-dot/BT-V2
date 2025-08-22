import { Link } from "react-router-dom";
import logo from "../assets/logo-bubble-dollar.svg";
import { Mic, PieChart, Wallet } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-base-900 text-slate-900 dark:text-slate-100">
      {/* Top bar */}
      <div className="border-b bg-white/80 backdrop-blur dark:bg-base-900/80 dark:border-base-700">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Budget Talk" className="h-7 w-7" />
            <span className="font-semibold">Budget Talk</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/app" className="px-3 py-1.5 rounded-lg bg-brand-grad text-white shadow-soft">Get Started</Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Talk to your <span className="bg-brand-grad bg-clip-text text-transparent">budget</span>.
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Set monthly budgets, add expenses by voice, and watch your dashboard update instantly.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/app" className="rounded-xl bg-brand-grad px-5 py-3 text-white shadow-soft">Get Started</Link>
            <a href="#how" className="rounded-xl border px-5 py-3 dark:border-base-700">How it works</a>
          </div>
          <div className="mt-4 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <div className="inline-flex items-center gap-1"><Wallet className="h-4 w-4"/> Set budgets</div>
            <div className="inline-flex items-center gap-1"><Mic className="h-4 w-4"/> Add by voice</div>
            <div className="inline-flex items-center gap-1"><PieChart className="h-4 w-4"/> Clear insights</div>
          </div>
        </div>
        <div className="rounded-2xl border bg-white dark:bg-base-900 dark:border-base-700 shadow-soft p-4">
          <div className="h-[260px] rounded-xl border border-dashed dark:border-base-700 grid place-items-center text-slate-500 dark:text-slate-400">
            Dashboard preview (add screenshot later)
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <h2 className="text-2xl font-semibold">What you can do</h2>
        <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {title:"Set Budgets", desc:"Create monthly limits by category like Travel, Food, Bills."},
            {title:"Add by Voice", desc:"Say “Travel 200 dollars today” — we parse category, amount, date."},
            {title:"Track & Insights", desc:"See spend vs budget, trends, and alerts when you’re close."},
          ].map(card => (
            <div key={card.title} className="rounded-2xl border bg-white dark:bg-base-900 dark:border-base-700 p-5 shadow-soft">
              <div className="font-semibold">{card.title}</div>
              <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <ol className="mt-4 grid md:grid-cols-3 gap-4">
          {["Create account (Personal or Business)", "Set your monthly budgets", "Add expenses by voice or form"].map((s,i)=>(
            <li key={i} className="rounded-2xl border bg-white dark:bg-base-900 dark:border-base-700 p-5 shadow-soft">
              <div className="text-xs text-slate-500 dark:text-slate-400">Step {i+1}</div>
              <div className="mt-1 font-medium">{s}</div>
            </li>
          ))}
        </ol>
      </section>

      <footer className="border-t dark:border-base-700 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Budget Talk
      </footer>
    </main>
  );
}
