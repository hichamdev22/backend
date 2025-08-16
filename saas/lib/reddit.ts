export async function fetchRedditPosts(params: { subreddit: string; query?: string; limit?: number }) {
	const url = process.env.REDDIT_SERVICE_URL || 'http://localhost:8000/fetch';
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ subreddit: params.subreddit, query: params.query, limit: params.limit ?? 50 }),
		// In Next.js Route Handlers, fetch is already server-side
	});
	if (!res.ok) throw new Error('Failed to fetch reddit posts');
	const json = await res.json();
	return json.data as Array<{ title: string; text?: string; upvotes?: number; comments?: number; created_utc?: number }>;
}