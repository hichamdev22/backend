import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseServiceClient } from '@/lib/supabase';

const Schema = z.object({
	user_id: z.string().uuid(),
	problems: z.array(z.object({
		problem_title: z.string(),
		description: z.string(),
		niche: z.string(),
		score: z.number(),
		competitors: z.array(z.any()),
		opportunity_level: z.string(),
		metadata: z.any().optional(),
	})),
});

export async function POST(req: NextRequest) {
	try {
		const input = Schema.parse(await req.json());
		const supabase = getSupabaseServiceClient();

		for (const p of input.problems) {
			const { data: problem, error: perr } = await supabase
				.from('problems')
				.insert({ user_id: input.user_id, title: p.problem_title, niche: p.niche, score: p.score, opportunity_level: p.opportunity_level })
				.select()
				.single();
			if (perr) throw perr;
			const { error: aerr } = await supabase
				.from('analyses')
				.insert({ problem_id: problem.id, description: p.description, competitors: p.competitors, metadata: p.metadata || {} });
			if (aerr) throw aerr;
		}

		return NextResponse.json({ ok: true });
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}