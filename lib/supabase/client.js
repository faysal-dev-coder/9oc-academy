// lib/supabase/client.js
// ====================================
// Browser Supabase Client
// ⭐ TRUE Singleton — সারা app এ একটাই instance
// ====================================

import { createBrowserClient } from "@supabase/ssr";

let client = null;

export function createClient() {
  // Already created? Return same instance
  if (client) return client;

  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return client;
}
