"use client";

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { PlatformKey, PlatformSelector } from './PlatformSelector';
import { Problem, ProblemCard } from './ProblemCard';
import { ProblemModal } from './ProblemModal';
import clsx from 'clsx';
import { AnalyzeButton } from './AnalyzeButton';

const MOCK_PROBLEMS: Problem[] = [
	{ id: '1', title: 'Scheduling posts fails for some timezones', niche: 'Social Media Tools', mentionCount: 124, score: 82, platforms: ['reddit', 'twitter'] },
	{ id: '2', title: 'AI summaries miss key context in long threads', niche: 'AI Tools', mentionCount: 96, score: 75, platforms: ['reddit'] },
	{ id: '3', title: 'Cold outreach throttled on LinkedIn', niche: 'Sales', mentionCount: 210, score: 88, platforms: ['linkedin'] },
	{ id: '4', title: 'Exporting analytics is too slow', niche: 'Analytics', mentionCount: 67, score: 65, platforms: ['twitter', 'linkedin'] },
];

const NICHES = ['All', 'AI Tools', 'Analytics', 'Sales', 'Social Media Tools', 'DevOps', 'E-commerce'];

export function Dashboard() {
	const [platform, setPlatform] = useState<PlatformKey>('all');
	const [niche, setNiche] = useState<string>('All');
	const [query, setQuery] = useState('');
	const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
	const [analysis, setAnalysis] = useState<any[] | null>(null);

	const filtered = useMemo(() => {
		return MOCK_PROBLEMS.filter((p) => {
			const matchesPlatform = platform === 'all' || p.platforms.includes(platform as any);
			const matchesNiche = niche === 'All' || p.niche === niche;
			const matchesQuery = !query || p.title.toLowerCase().includes(query.toLowerCase());
			return matchesPlatform && matchesNiche && matchesQuery;
		});
	}, [platform, niche, query]);

	return (
		<div className="space-y-6">
			<div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
				<div className="flex items-center gap-3">
					<PlatformSelector value={platform} onChange={setPlatform} />
					<select
						value={niche}
						onChange={(e) => setNiche(e.target.value)}
						className="border border-slate-200 dark:border-slate-800 rounded-md px-3 py-2 text-sm bg-white dark:bg-slate-950"
					>
						{NICHES.map((n) => (
							<option key={n} value={n}>{n}</option>
						))}
					</select>
					<AnalyzeButton onDone={(data) => setAnalysis(data)} />
				</div>
				<div className="relative">
					<Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search problems..."
						className="pl-8 pr-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm w-[260px]"
					/>
				</div>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				{filtered.map((p) => (
					<ProblemCard key={p.id} problem={p} onAnalyze={setSelectedProblemId} />
				))}
			</div>

			<ProblemModal
				problemId={selectedProblemId}
				onClose={() => setSelectedProblemId(null)}
			/>

			{analysis && (
				<div className="rounded border border-slate-200 dark:border-slate-800 p-4">
					<div className="text-sm font-semibold mb-2">AI Analysis</div>
					<pre className="text-xs whitespace-pre-wrap">{JSON.stringify(analysis, null, 2)}</pre>
				</div>
			)}
		</div>
	);
}