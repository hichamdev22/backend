import clsx from 'clsx';

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return <button {...props} className={clsx('px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 text-sm', className)} />;
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
	return <input {...props} className={clsx('px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 text-sm bg-white dark:bg-slate-950', className)} />;
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
	return <select {...props} className={clsx('px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 text-sm bg-white dark:bg-slate-950', className)}>{children}</select>;
}