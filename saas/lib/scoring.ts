type Signal = {
	mentions: number;
	upvotes: number;
	comments: number;
	createdAtUnix: number; // seconds
};

export function computeOpportunityScore(signal: Signal): number {
	const { mentions, upvotes, comments, createdAtUnix } = signal;
	const now = Math.floor(Date.now() / 1000);
	const ageDays = Math.max(1, (now - createdAtUnix) / 86400);

	const freqScore = Math.min(100, Math.log2(1 + mentions) * 20);
	const upvoteScore = Math.min(100, Math.log2(1 + upvotes) * 15);
	const commentScore = Math.min(100, Math.log2(1 + comments) * 12);
	const recencyBoost = Math.max(0, 20 - Math.log2(ageDays + 1) * 8);

	const weighted = 0.4 * freqScore + 0.3 * upvoteScore + 0.2 * commentScore + 0.1 * recencyBoost;
	return Math.round(Math.min(100, weighted));
}

export function opportunityLevelFromScore(score: number): 'Low' | 'Medium' | 'High' | 'Very High' {
	if (score >= 85) return 'Very High';
	if (score >= 70) return 'High';
	if (score >= 50) return 'Medium';
	return 'Low';
}