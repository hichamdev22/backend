import { CreditCard, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export function Sidebar() {
	return (
		<aside className="hidden md:block h-screen sticky top-0 border-r border-slate-200 dark:border-slate-800 p-4">
			<div className="text-lg font-semibold mb-6">Menu</div>
			<nav className="space-y-2">
				<Link href="/" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
					<LayoutDashboard size={18} /> Dashboard
				</Link>
				<Link href="/billing" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
					<CreditCard size={18} /> Billing
				</Link>
			</nav>
			<div className="mt-8">
				<div className="text-sm text-slate-500 mb-2">Subscription</div>
				<div className="space-y-2 text-sm">
					<div className="flex items-center justify-between rounded border border-slate-200 dark:border-slate-800 p-3">
						<div>Starter</div>
						<div className="font-medium">$29</div>
					</div>
					<div className="flex items-center justify-between rounded border border-slate-200 dark:border-slate-800 p-3">
						<div>Pro</div>
						<div className="font-medium">$49</div>
					</div>
					<div className="flex items-center justify-between rounded border border-slate-200 dark:border-slate-800 p-3">
						<div>Premium</div>
						<div className="font-medium">$99</div>
					</div>
					<div className="flex items-center justify-between rounded border border-slate-200 dark:border-slate-800 p-3">
						<div>Enterprise</div>
						<div className="font-medium">$199</div>
					</div>
				</div>
			</div>
		</aside>
	);
}