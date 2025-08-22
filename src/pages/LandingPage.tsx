// src/pages/LandingPage.tsx
import { Link } from "react-router-dom";

const box: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  padding: 20,
  background: "#fff",
};
const btnPrimary: React.CSSProperties = {
  background: "#111827",
  color: "#fff",
  borderRadius: 12,
  padding: "12px 18px",
  fontWeight: 600,
  textDecoration: "none",
  display: "inline-block",
};
const btnSecondary: React.CSSProperties = {
  background: "#fff",
  color: "#111827",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: "12px 18px",
  fontWeight: 600,
  textDecoration: "none",
  display: "inline-block",
};

export default function LandingPage() {
  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px" }}>
      {/* Hero */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 24,
          alignItems: "center",
          marginTop: 24,
          marginBottom: 32,
        }}
      >
        <div>
          <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.1 }}>
            Talk to your budget.
          </div>
          <p style={{ color: "#4b5563", marginTop: 12, fontSize: 16 }}>
            Set monthly budgets, add expenses by voice, and track everything on
            a simple dashboard.
          </p>
          <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
            {/* For now send to /app (your existing interface) */}
            <Link to="/app" style={btnPrimary}>
              Get Started
            </Link>
            <a href="#how" style={btnSecondary}>
              How it works
            </a>
          </div>
        </div>

        {/* Right side preview box – you can drop a screenshot later */}
        <div style={box}>
          <div
            style={{
              height: 260,
              border: "1px dashed #d1d5db",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6b7280",
            }}
          >
            Dashboard preview (add screenshot later)
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          What you can do
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          <div style={box}>
            <div style={{ fontWeight: 700 }}>Set Budgets</div>
            <p style={{ color: "#4b5563", marginTop: 6 }}>
              Create monthly budgets by category (Travel, Food, Bills, more).
            </p>
          </div>
          <div style={box}>
            <div style={{ fontWeight: 700 }}>Add by Voice</div>
            <p style={{ color: "#4b5563", marginTop: 6 }}>
              Say “Travel 200 dollars” — we’ll capture category, amount, date.
            </p>
          </div>
          <div style={box}>
            <div style={{ fontWeight: 700 }}>Track & Insights</div>
            <p style={{ color: "#4b5563", marginTop: 6 }}>
              See spend vs budget, trends, and friendly alerts.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          How it works
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          <div style={box}>
            <div style={{ color: "#6b7280", fontSize: 14 }}>Step 1</div>
            <div style={{ fontWeight: 700, marginTop: 4 }}>
              Create your account
            </div>
            <p style={{ color: "#4b5563", marginTop: 6 }}>
              Choose Personal or Business (invite teammates later).
            </p>
          </div>
          <div style={box}>
            <div style={{ color: "#6b7280", fontSize: 14 }}>Step 2</div>
            <div style={{ fontWeight: 700, marginTop: 4 }}>Set budgets</div>
            <p style={{ color: "#4b5563", marginTop: 6 }}>
              Add categories and limits for the month.
            </p>
          </div>
          <div style={box}>
            <div style={{ color: "#6b7280", fontSize: 14 }}>Step 3</div>
            <div style={{ fontWeight: 700, marginTop: 4 }}>
              Add expenses by voice
            </div>
            <p style={{ color: "#4b5563", marginTop: 6 }}>
              Speak or type, and see your dashboard update instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #e5e7eb",
          paddingTop: 16,
          color: "#6b7280",
          fontSize: 14,
        }}
      >
        © {new Date().getFullYear()} BudgetTalk
      </footer>
    </main>
  );
}
