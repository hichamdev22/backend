import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ProblemAnalysis } from '@/lib/types';
import { buildProblemExtractionPrompt, getOpenAI } from '@/lib/openai';
import { computeOpportunityScore, opportunityLevelFromScore } from '@/lib/scoring';
import { fetchRedditPosts } from '@/lib/reddit';

const AnalyzeSchema = z.object({
	platform: z.enum(['reddit', 'twitter', 'linkedin']),
	niche: z.string().min(1),
	query: z.string().optional(),
	limit: z.number().min(1).max(200).optional(),
	// optional subreddit for reddit
	subreddit: z.string().optional(),
});

export async function POST(req: NextRequest) {
	try {
		const json = await req.json();
		const input = AnalyzeSchema.parse(json);

		let posts: Array<{ title: string; text?: string; upvotes?: number; comments?: number; created_utc?: number }> = [];
		if (input.platform === 'reddit') {
			const subreddit = input.subreddit || 'entrepreneur';
			posts = await fetchRedditPosts({ subreddit, query: input.query, limit: input.limit });
		}

		const openai = process.env.OPENAI_API_KEY ? getOpenAI() : null;
		let ai: ProblemAnalysis[] | null = null;
		if (openai && posts.length) {
			const prompt = buildProblemExtractionPrompt(input.niche, posts);
			const completion = await openai.chat.completions.create({
				model: 'gpt-4o-mini',
				messages: [
					{ role: 'system', content: 'You are a market research analyst.' },
					{ role: 'user', content: prompt },
				],
				temperature: 0.2,
			});
			const content = completion.choices[0]?.message?.content ?? '[]';
			try {
				ai = JSON.parse(content);
			} catch {}
		}

		const fallback: ProblemAnalysis[] = (posts.length ? posts : [
			{ title: 'Scheduling posts fails for some timezones', text: 'Users report wrong publish time', upvotes: 320, comments: 45, created_utc: Math.floor(Date.now()/1000) - 86400 * 5 },
			{ title: 'Exporting analytics is too slow', text: 'CSV exports timeout on large workspaces', upvotes: 180, comments: 30, created_utc: Math.floor(Date.now()/1000) - 86400 * 20 },
		]).map((s) => {
			const score = computeOpportunityScore({
				mentions: 1,
				upvotes: s.upvotes ?? 0,
				comments: s.comments ?? 0,
				createdAtUnix: s.created_utc ?? Math.floor(Date.now()/1000),
			});
			return {
				problem_title: s.title,
				description: s.text ?? '',
				niche: input.niche,
				score,
				competitors: [],
				opportunity_level: opportunityLevelFromScore(score),
				metadata: { platform: input.platform },
			};
		});

		const data = Array.isArray(ai) && ai.length ? ai : fallback;
		return NextResponse.json({ data });
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}