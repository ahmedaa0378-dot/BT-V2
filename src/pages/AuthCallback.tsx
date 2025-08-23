import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for Supabase to hydrate the session, then route
    async function check() {
      const { data } = await supabase.auth.getSession();
      if (data.session) navigate("/app", { replace: true });
      else navigate("/login", { replace: true });
    }
    check();
  }, [navigate]);

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-slate-600">Signing you in…</div>
    </div>
  );
}
