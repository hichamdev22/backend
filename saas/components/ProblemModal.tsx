"use client";

import { useEffect, useMemo } from 'react';
import { X } from 'lucide-react';

const MOCK_DETAILS: Record<string, any> = {
	'1': {
		description: 'Users in certain timezones report scheduled posts publishing at incorrect times across platforms.',
		opportunity_level: 'High',
		competitors: ['Buffer', 'Hootsuite', 'Sprout Social'],
		crossPlatform: {
			reddit: { mentions: 80, upvotes: 1200 },
			twitter: { mentions: 44, likes: 350 },
		},
	},
	'2': {
		description: 'AI summaries lose context on long Reddit threads and nested quotes.',
		opportunity_level: 'Medium',
		competitors: ['Genei', 'Summarize.tech'],
		crossPlatform: { reddit: { mentions: 96, upvotes: 800 } },
	},
};

export function ProblemModal({ problemId, onClose }: { problemId: string | null; onClose: () => void }) {
	const open = !!problemId;
	const data = useMemo(() => (problemId ? MOCK_DETAILS[problemId] : null), [problemId]);

	useEffect(() => {
		const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
		window.addEventListener('keydown', onEsc);
		return () => window.removeEventListener('keydown', onEsc);
	}, [onClose]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
			<div className="w-full max-w-2xl rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4">
				<div className="flex items-center justify-between mb-3">
					<div className="font-semibold">Problem analysis</div>
					<button onClick={onClose} className="w-8 h-8 inline-flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800">
						<X size={18} />
					</button>
				</div>

				{data ? (
					<div className="space-y-4">
						<p className="text-sm text-slate-700 dark:text-slate-300">{data.description}</p>
						<div>
							<div className="text-sm font-medium mb-2">Competitors</div>
							<div className="flex flex-wrap gap-2">
								{data.competitors.map((c: string) => (
									<span key={c} className="px-2 py-1 rounded border border-slate-200 dark:border-slate-800 text-xs">{c}</span>
								))}
							</div>
						</div>
						<div>
							<div className="text-sm font-medium mb-2">Cross-platform signals</div>
							<pre className="text-xs bg-slate-50 dark:bg-slate-900 p-3 rounded overflow-x-auto">{JSON.stringify(data.crossPlatform, null, 2)}</pre>
						</div>
						<div className="text-sm"><span className="text-slate-500">Opportunity:</span> <span className="font-medium">{data.opportunity_level}</span></div>
					</div>
				) : (
					<div className="text-sm text-slate-500">Loading...</div>
				)}
			</div>
		</div>
	);
}