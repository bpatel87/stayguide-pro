-- StayGuide Pro Database Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  company_name text,
  avatar_url text,
  subscription_status text default 'trial', -- trial, free, pro, business
  subscription_ends_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Properties table
create table public.properties (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  address text,
  city text,
  state text,
  country text,
  postal_code text,
  property_type text, -- apartment, house, cottage, etc
  max_guests int default 2,
  bedrooms int default 1,
  bathrooms numeric(3,1) default 1,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Guest Guides table
create table public.guest_guides (
  id uuid default uuid_generate_v4() primary key,
  property_id uuid references public.properties(id) on delete cascade not null,
  slug text unique not null, -- URL slug for public access
  title text not null,
  welcome_message text,
  theme_color text default '#7c3aed',
  logo_url text,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Guide Blocks table (modular content)
create table public.guide_blocks (
  id uuid default uuid_generate_v4() primary key,
  guide_id uuid references public.guest_guides(id) on delete cascade not null,
  type text not null, -- wifi, rules, video, email_capture, etc
  title text,
  content jsonb not null default '{}',
  position int not null default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Guest Emails table (captured from guides)
create table public.guest_emails (
  id uuid default uuid_generate_v4() primary key,
  property_id uuid references public.properties(id) on delete cascade not null,
  guide_id uuid references public.guest_guides(id) on delete set null,
  email text not null,
  name text,
  capture_source text, -- wifi, checkout, offer, etc
  check_in_date date,
  check_out_date date,
  opted_in boolean default true,
  tags text[] default '{}',
  created_at timestamptz default now()
);

-- Analytics Events table
create table public.analytics_events (
  id uuid default uuid_generate_v4() primary key,
  guide_id uuid references public.guest_guides(id) on delete cascade not null,
  event_type text not null, -- view, email_capture, wifi_unlock, etc
  event_data jsonb default '{}',
  visitor_id text, -- anonymous visitor tracking
  created_at timestamptz default now()
);

-- Direct Bookings table
create table public.direct_bookings (
  id uuid default uuid_generate_v4() primary key,
  property_id uuid references public.properties(id) on delete cascade not null,
  guest_email text not null,
  check_in date not null,
  check_out date not null,
  guests int not null default 2,
  total_amount numeric(10,2) not null,
  status text default 'pending', -- pending, confirmed, cancelled
  booking_source text default 'direct', -- direct, returning_guest
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes for performance
create index idx_properties_user_id on public.properties(user_id);
create index idx_guest_guides_property_id on public.guest_guides(property_id);
create index idx_guest_guides_slug on public.guest_guides(slug);
create index idx_guide_blocks_guide_id on public.guide_blocks(guide_id);
create index idx_guest_emails_property_id on public.guest_emails(property_id);
create index idx_analytics_events_guide_id on public.analytics_events(guide_id);
create index idx_analytics_events_created_at on public.analytics_events(created_at);

-- Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.guest_guides enable row level security;
alter table public.guide_blocks enable row level security;
alter table public.guest_emails enable row level security;
alter table public.analytics_events enable row level security;
alter table public.direct_bookings enable row level security;

-- RLS Policies
-- Users can only see their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Users can manage their own properties
create policy "Users can view own properties" on public.properties
  for select using (auth.uid() = user_id);

create policy "Users can insert own properties" on public.properties
  for insert with check (auth.uid() = user_id);

create policy "Users can update own properties" on public.properties
  for update using (auth.uid() = user_id);

create policy "Users can delete own properties" on public.properties
  for delete using (auth.uid() = user_id);

-- Similar policies for other tables...

-- Functions
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();