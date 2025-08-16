export type Competitor = {
	name: string;
	url?: string;
	notes?: string;
};

export type ProblemAnalysis = {
	problem_title: string;
	description: string;
	niche: string;
	score: number;
	competitors: Competitor[];
	opportunity_level: 'Low' | 'Medium' | 'High' | 'Very High';
	metadata?: Record<string, unknown>;
};

export type AnalyzeRequest = {
	platform: 'reddit' | 'twitter' | 'linkedin';
	niche: string;
	query?: string;
	limit?: number;
};