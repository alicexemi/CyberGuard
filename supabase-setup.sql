-- Cyber Guard: выполни весь скрипт в Supabase → SQL Editor → New query

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null default 'Пользователь',
  avatar_url text,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
drop policy if exists "Пользователь видит свой профиль" on public.profiles;
drop policy if exists "Пользователь создаёт свой профиль" on public.profiles;
drop policy if exists "Пользователь изменяет свой профиль" on public.profiles;
create policy "Пользователь видит свой профиль" on public.profiles for select using (auth.uid() = id);
create policy "Пользователь создаёт свой профиль" on public.profiles for insert with check (auth.uid() = id);
create policy "Пользователь изменяет свой профиль" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

grant select, insert, update on public.profiles to authenticated;

create table if not exists public.user_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_data enable row level security;
drop policy if exists "Пользователь читает свой прогресс" on public.user_data;
drop policy if exists "Пользователь сохраняет свой прогресс" on public.user_data;
drop policy if exists "Пользователь обновляет свой прогресс" on public.user_data;
create policy "Пользователь читает свой прогресс" on public.user_data for select using (auth.uid() = user_id);
create policy "Пользователь сохраняет свой прогресс" on public.user_data for insert with check (auth.uid() = user_id);
create policy "Пользователь обновляет свой прогресс" on public.user_data for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

grant select, insert, update on public.user_data to authenticated;

-- Storage bucket для аватаров. Public нужен только для отображения публичных URL.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 2097152, array['image/png','image/jpeg','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 2097152,
  allowed_mime_types = array['image/png','image/jpeg','image/webp'];

drop policy if exists "Аватары доступны для просмотра" on storage.objects;
drop policy if exists "Пользователь загружает свой аватар" on storage.objects;
drop policy if exists "Пользователь обновляет свой аватар" on storage.objects;
drop policy if exists "Пользователь удаляет свой аватар" on storage.objects;
create policy "Аватары доступны для просмотра" on storage.objects for select using (bucket_id = 'avatars');
create policy "Пользователь загружает свой аватар" on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Пользователь обновляет свой аватар" on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "Пользователь удаляет свой аватар" on storage.objects for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
