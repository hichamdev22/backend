import { ArrowRight, BarChart3, MessageSquare, Twitter, Linkedin } from 'lucide-react';

export type Problem = {
	id: string;
	title: string;
	niche: string;
	mentionCount: number;
	score: number;
	platforms: Array<'reddit' | 'twitter' | 'linkedin'>;
};

function PlatformIcons({ platforms }: { platforms: Problem['platforms'] }) {
	return (
		<div className="flex items-center gap-1 text-slate-500">
			{platforms.includes('reddit') && <span className="text-[10px] px-1 py-0.5 rounded border border-slate-300">Reddit</span>}
			{platforms.includes('twitter') && <Twitter size={16} />}
			{platforms.includes('linkedin') && <Linkedin size={16} />}
		</div>
	);
}

export function ProblemCard({ problem, onAnalyze }: { problem: Problem; onAnalyze: (id: string) => void }) {
	return (
		<div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4 flex items-start justify-between">
			<div className="space-y-2">
				<div className="font-medium">{problem.title}</div>
				<div className="text-xs text-slate-500">{problem.niche}</div>
				<div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
					<div className="inline-flex items-center gap-1"><MessageSquare size={16} /> {problem.mentionCount}</div>
					<div className="inline-flex items-center gap-1"><BarChart3 size={16} /> Score: <span className="font-medium">{problem.score}</span></div>
					<PlatformIcons platforms={problem.platforms} />
				</div>
			</div>
			<button
				onClick={() => onAnalyze(problem.id)}
				className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-brand-600 text-white hover:bg-brand-700"
			>
				Analyze <ArrowRight size={16} />
			</button>
		</div>
	);
}