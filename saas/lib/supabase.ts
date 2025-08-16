import { createClient } from '@supabase/supabase-js';

export function getSupabaseClient() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
	if (!url || !anon) throw new Error('Missing Supabase env vars');
	return createClient(url, anon);
}

export function getSupabaseServiceClient() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
	const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
	if (!url || !serviceKey) throw new Error('Missing Supabase service env vars');
	return createClient(url, serviceKey);
}