"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";

export function createSupabaseBrowserClient() {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  // Supabase Auth stores the signed-in user's session in secure browser
  // cookies/local storage managed by the SDK. The anon key is safe for the
  // browser because Row Level Security decides what data each user can access.
  return createBrowserClient(config.url, config.anonKey);
}
