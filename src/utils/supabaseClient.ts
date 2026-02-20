import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Only create the client if credentials are provided (required for Phase 2 features)
export const supabase: SupabaseClient | null =
    supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('YOUR_SUPABASE')
        ? createClient(supabaseUrl, supabaseAnonKey)
        : null;
