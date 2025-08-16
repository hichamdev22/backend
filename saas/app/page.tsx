import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/Dashboard';

export default function HomePage() {
	return (
		<div className="min-h-screen grid grid-cols-1 md:grid-cols-[260px_1fr]">
			<Sidebar />
			<div className="flex flex-col min-h-screen">
				<Header />
				<main className="flex-1 p-4 md:p-6 max-w-[1200px] w-full mx-auto">
					<Dashboard />
				</main>
			</div>
		</div>
	);
}