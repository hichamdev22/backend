"use client";

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Header() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	return (
		<header className="sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
			<div className="max-w-[1200px] mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
				<div className="font-semibold">SaaS Problem Finder</div>
				<div className="flex items-center gap-3">
					<div className="text-sm px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">Credits: <span className="font-medium">15</span></div>
					<button
						className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-slate-200 dark:border-slate-800"
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
						aria-label="Toggle theme"
					>
						{mounted && theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
					</button>
				</div>
			</div>
		</header>
	);
}