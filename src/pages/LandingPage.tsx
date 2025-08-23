import { Link } from "react-router-dom";
import logo from "../assets/logo-bubble-dollar.svg";
import { Mic, PieChart, Wallet } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="bg-white dark:bg-base-900 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="w-full border-b border-slate-200 dark:border-base-700 bg-white/80 dark:bg-base-900/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          {/* Logo left */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Budget Talk" className="h-9 w-9" />
            <span className="text-xl font-extrabold bg-brand-grad bg-clip-text text-transparent">
              Budget Talk
            </span>
          </div>
          {/* Actions right */}
          <div className="flex items-center gap-3">
            <Link
              to="/app"
              className="rounded-full bg-brand-grad px-5 py-2 text-white font-medium shadow-soft hover:opacity-90 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* gradient bg */}
        <div className="absolute inset-0 bg-brand-grad opacity-90"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center text-white">
          {/* Left: Text */}
          <div>
            <h1 className="text-5xl font-extrabold leading-tight">
              Talk to your <span className="bg-white bg-clip-text text-transparent">budget</span>.
            </h1>
            <p className="mt-5 text-lg text-slate-100 max-w-md">
              Set monthly budgets, add expenses by voice, and track insights instantly
              with a modern fintech dashboard.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                to="/app"
                className="rounded-full bg-white px-6 py-3 font-semibold text-slate-900 shadow-lg hover:bg-slate-100 transition"
              >
                Get Started
              </Link>
              <a
                href="#how"
                className="rounded-full border border-white/60 px-6 py-3 font-semibold hover:bg-white/10 transition"
              >
                How it works
              </a>
            </div>
          </div>

          {/* Right: Dashboard Preview box */}
          <div className="relative">
            <div className="rounded-2xl bg-white dark:bg-base-900 shadow-2xl p-4">
              <div className="h-[320px] rounded-xl border border-dashed border-slate-300 dark:border-base-700 grid place-items-center text-slate-500 dark:text-slate-400">
                Dashboard preview (add screenshot later)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">What you can do</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {icon:<Wallet className="h-6 w-6"/>, title:"Set Budgets", desc:"Create monthly limits by category like Travel, Food, Bills."},
            {icon:<Mic className="h-6 w-6"/>, title:"Add by Voice", desc:"Say “Travel 200 dollars today” — we parse category, amount, date."},
            {icon:<PieChart className="h-6 w-6"/>, title:"Track & Insights", desc:"See spend vs budget, trends, and alerts when you’re close."},
          ].map(card => (
            <div key={card.title} className="rounded-2xl border bg-white dark:bg-base-900 p-6 shadow-soft">
              <div className="flex items-center gap-3 text-brand-indigo">
                {card.icon}
                <h3 className="font-semibold">{card.title}</h3>
              </div>
              <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">How it works</h2>
        <ol className="grid md:grid-cols-3 gap-6">
          {["Create account (Personal or Business)", "Set your monthly budgets", "Add expenses by voice or form"].map((s,i)=>(
            <li key={i} className="rounded-2xl border bg-white dark:bg-base-900 p-6 shadow-soft">
              <div className="text-sm text-slate-500 dark:text-slate-400">Step {i+1}</div>
              <div className="mt-1 font-medium">{s}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* Footer */}
      <footer className="border-t dark:border-base-700 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Budget Talk
      </footer>
    </main>
  );
}
