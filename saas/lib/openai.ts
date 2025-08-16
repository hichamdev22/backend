import OpenAI from 'openai';

export function getOpenAI() {
	const apiKey = process.env.OPENAI_API_KEY;
	if (!apiKey) throw new Error('Missing OPENAI_API_KEY');
	return new OpenAI({ apiKey });
}

export const buildProblemExtractionPrompt = (niche: string, posts: Array<{ title: string; text?: string; upvotes?: number; comments?: number; created_utc?: number }>) => {
	const header = `You are an analyst extracting recurring problems from social conversations. Identify distinct problems, group by niche, and score each by urgency and frequency. Output JSON.`;
	const scoring = `Scoring guidelines: score 0-100. Consider mention frequency, upvotes/likes, comment engagement, and recency (newer = slightly higher).`;
	const schema = `Return an array of objects with fields: problem_title, description, niche, score, competitors (array of {name,url?,notes?}), opportunity_level (Low|Medium|High|Very High).`;
	const data = posts.slice(0, 100).map((p) => ({ title: p.title, text: p.text?.slice(0, 800), upvotes: p.upvotes, comments: p.comments, created_utc: p.created_utc }));
	return [header, scoring, schema, 'Niche: ' + niche, 'Data:', JSON.stringify(data, null, 2)].join('\n\n');
};