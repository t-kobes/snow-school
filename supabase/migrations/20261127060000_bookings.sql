-- Заявки с сайта. RLS включён без политик: читать и писать может только сервер (secret key).
create table public.bookings (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 80),
  phone text not null check (char_length(phone) between 10 and 30),
  sport text not null check (sport in ('snowboard', 'ski')),
  format text not null check (format in ('individual', 'group', 'night', 'kids', 'freeride')),
  level text not null check (level in ('beginner', 'intermediate', 'advanced')),
  people int not null check (people between 1 and 10),
  date date,
  comment text check (char_length(comment) <= 500),
  status text not null default 'new' check (status in ('new', 'confirmed', 'done', 'cancelled'))
);

create index bookings_created_at_idx on public.bookings (created_at desc);

alter table public.bookings enable row level security;
