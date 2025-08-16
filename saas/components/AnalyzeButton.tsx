"use client";

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export function AnalyzeButton({ onDone }: { onDone: (data: any) => void }) {
	const [loading, setLoading] = useState(false);

	async function run() {
		setLoading(true);
		try {
			const res = await fetch('/api/analyze', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ platform: 'reddit', niche: 'AI Tools', limit: 50 }),
			});
			const json = await res.json();
			onDone(json.data);
		} finally {
			setLoading(false);
		}
	}

	return (
		<button onClick={run} disabled={loading} className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-slate-800">
			{loading && <Loader2 size={16} className="animate-spin" />} Analyze
		</button>
	);
}