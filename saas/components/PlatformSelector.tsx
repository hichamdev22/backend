"use client";

import { useState } from 'react';
import { Twitter, Linkedin } from 'lucide-react';
import clsx from 'clsx';

const platforms = [
	{ key: 'all', label: 'All', icon: null },
	{ key: 'reddit', label: 'Reddit', icon: null },
	{ key: 'twitter', label: 'Twitter', icon: Twitter },
	{ key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
] as const;

export type PlatformKey = typeof platforms[number]['key'];

export function PlatformSelector({ value, onChange }: { value: PlatformKey; onChange: (v: PlatformKey) => void }) {
	return (
		<div className="inline-flex rounded-md border border-slate-200 dark:border-slate-800 overflow-hidden">
			{platforms.map((p) => {
				const Icon = p.icon as any;
				return (
					<button
						key={p.key}
						onClick={() => onChange(p.key)}
						className={clsx(
							'px-3 py-2 text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-900',
							value === p.key && 'bg-slate-100 dark:bg-slate-800'
						)}
					>
						{Icon ? <Icon size={16} /> : null}
						<span>{p.label}</span>
					</button>
				);
			})}
		</div>
	);
}