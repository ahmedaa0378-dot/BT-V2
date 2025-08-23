import { supabase } from "../lib/supabaseClient";

export function useAuth() {
  async function signInWithGoogle() {
    // Supabase will redirect the browser to Google and back to /auth/callback
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { access_type: "offline", prompt: "consent" }
      }
    });
    return { error };
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return { signInWithGoogle, signOut };
}
