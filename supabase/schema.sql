-- Consultant Council Database Schema
-- Run this in Supabase SQL Editor

-- Sessions table
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question text not null,
  language text not null default 'en' check (language in ('en', 'th')),
  consultant_ids int[] not null default '{}',
  tensions text[] not null default '{}',
  status text not null default 'selecting' check (status in ('selecting', 'debating', 'completed', 'error')),
  summary jsonb,
  created_at timestamptz not null default now()
);

-- Turns table
create table if not exists public.turns (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  turn_order int not null,
  type text not null check (type in ('opening', 'speech', 'interruption', 'rebuttal', 'stage_direction', 'summary')),
  speaker text not null,
  content text not null,
  action text,
  target text,
  is_signature boolean not null default false,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_sessions_user_id on public.sessions(user_id);
create index if not exists idx_sessions_created_at on public.sessions(created_at desc);
create index if not exists idx_turns_session_id on public.turns(session_id);
create index if not exists idx_turns_order on public.turns(session_id, turn_order);

-- RLS Policies
alter table public.sessions enable row level security;
alter table public.turns enable row level security;

-- Sessions: users can only access their own
create policy "Users can view own sessions" on public.sessions
  for select using (auth.uid() = user_id);

create policy "Users can insert own sessions" on public.sessions
  for insert with check (auth.uid() = user_id);

create policy "Users can update own sessions" on public.sessions
  for update using (auth.uid() = user_id);

-- Turns: users can access turns of their own sessions
create policy "Users can view turns of own sessions" on public.turns
  for select using (
    exists (
      select 1 from public.sessions
      where sessions.id = turns.session_id
      and sessions.user_id = auth.uid()
    )
  );

create policy "Users can insert turns to own sessions" on public.turns
  for insert with check (
    exists (
      select 1 from public.sessions
      where sessions.id = turns.session_id
      and sessions.user_id = auth.uid()
    )
  );
