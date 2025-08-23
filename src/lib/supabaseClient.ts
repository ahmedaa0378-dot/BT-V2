import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,https://zqbrtdrnqsncphjbugps.supabase.co
  mport.meta.env.VITE_SUPABASE_ANON_KEY!eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxYnJ0ZHJucXNuY3BoamJ1Z3BzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5MTA2MDQsImV4cCI6MjA3MTQ4NjYwNH0.CBCuEXChVLlxWIikgM0hPwL2a8AIku4eDHAVtf8JEBI
);
