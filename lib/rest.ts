import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only REST client (service role). Never import this file from a
// Client Component. Uses plain HTTPS requests via PostgREST, so there are
// no persistent sockets or pools to wedge.
const globalForRest = globalThis as unknown as { __hmtRest?: SupabaseClient };

export function rest(): SupabaseClient {
  if (!globalForRest.__hmtRest) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error("Supabase is not configured");
    globalForRest.__hmtRest = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return globalForRest.__hmtRest;
}
