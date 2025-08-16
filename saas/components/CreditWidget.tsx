import Link from 'next/link';

export function CreditWidget({ remaining, tier }: { remaining: number; tier: 'Starter' | 'Pro' | 'Premium' | 'Enterprise' }) {
	return (
		<div className="flex items-center gap-2 text-sm">
			<div className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">Credits: <span className="font-medium">{remaining}</span></div>
			<div className="text-slate-500">Tier: <span className="font-medium">{tier}</span></div>
			<Link href="/billing" className="underline">Manage</Link>
		</div>
	);
}