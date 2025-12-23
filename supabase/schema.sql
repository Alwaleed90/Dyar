-- Enable UUID extension
create extension if not exists "uuid-ossp";
-- Profiles Table (Users)
create table public.profiles (
    id uuid references auth.users not null primary key,
    full_name text,
    avatar_url text,
    role text check (role in ('guest', 'host')) default 'guest',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
-- Turn on Row Level Security
alter table public.profiles enable row level security;
-- Policies for Profiles
create policy "Public profiles are viewable by everyone." on profiles for
select using (true);
create policy "Users can insert their own profile." on profiles for
insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for
update using (auth.uid() = id);
-- Listings Table
create table public.listings (
    id uuid default uuid_generate_v4() primary key,
    host_id uuid references public.profiles(id) not null,
    title text not null,
    description text,
    price_per_night numeric not null,
    address text,
    latitude float,
    longitude float,
    amenities jsonb default '[]'::jsonb,
    images text [] default '{}'::text [],
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.listings enable row level security;
create policy "Listings are viewable by everyone." on listings for
select using (true);
create policy "Hosts can insert their own listings." on listings for
insert with check (auth.uid() = host_id);
create policy "Hosts can update their own listings." on listings for
update using (auth.uid() = host_id);
create policy "Hosts can delete their own listings." on listings for delete using (auth.uid() = host_id);
-- Bookings Table
create table public.bookings (
    id uuid default uuid_generate_v4() primary key,
    listing_id uuid references public.listings(id) not null,
    guest_id uuid references public.profiles(id) not null,
    check_in date not null,
    check_out date not null,
    total_price numeric not null,
    status text check (
        status in ('pending', 'confirmed', 'cancelled', 'completed')
    ) default 'pending',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.bookings enable row level security;
create policy "Users can view their own bookings" on bookings for
select using (auth.uid() = guest_id);
create policy "Hosts can view bookings for their listings" on bookings for
select using (
        auth.uid() in (
            select host_id
            from listings
            where id = listing_id
        )
    );
create policy "Guests can create bookings" on bookings for
insert with check (auth.uid() = guest_id);
-- Storage Buckets
insert into storage.buckets (id, name, public)
values ('listings', 'listings', true);
create policy "Listing images are publicly accessible." on storage.objects for
select using (bucket_id = 'listings');
create policy "Hosts can upload listing images." on storage.objects for
insert with check (
        bucket_id = 'listings'
        and auth.uid() = (storage.foldername(name)) [1]::uuid
    );