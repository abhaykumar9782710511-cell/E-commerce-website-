import { createClient } from '@supabase/supabase-js'

// NEXT_PUBLIC_* values are required in production, but these public fallbacks
// keep the storefront usable if Vercel has not injected the variables yet.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oaqlfhrpifopnzozcnor.supabase.co'
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_ZxItWbx9JC7AyfQCZ0FbhQ_KvJfiXYw'

export const supabase = createClient(url, key)
