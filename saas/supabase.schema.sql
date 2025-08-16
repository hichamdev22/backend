-- Users are managed by Supabase auth.users

create table if not exists public.subscriptions (
	id uuid primary key default gen_random_uuid(),
	user_id uuid not null,
	tier text not null check (tier in ('Starter','Pro','Premium','Enterprise')),
	status text not null default 'active',
	credits_remaining integer not null default 50,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create table if not exists public.problems (
	id uuid primary key default gen_random_uuid(),
	user_id uuid not null,
	title text not null,
	niche text not null,
	score integer not null,
	opportunity_level text not null,
	created_at timestamptz not null default now()
);

create table if not exists public.analyses (
	id uuid primary key default gen_random_uuid(),
	problem_id uuid references public.problems(id) on delete cascade,
	description text not null,
	competitors jsonb not null default '[]',
	metadata jsonb not null default '{}',
	created_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;
alter table public.problems enable row level security;
alter table public.analyses enable row level security;