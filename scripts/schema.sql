-- Portfolio schema for Supabase Postgres
-- Everything on the public site is editable from /admin.

create table if not exists site_settings (
  id int primary key default 1 check (id = 1),
  name text not null default 'Hein Min Thant',
  role_title text not null default 'Software Engineer',
  hero_headline text not null default 'Building thoughtful digital experiences through code.',
  hero_subheadline text not null default '',
  about_statement text not null default '',
  about_body text not null default '',
  philosophy text not null default '',
  interests text not null default '',           -- comma separated
  currently_learning text not null default '',  -- comma separated
  email text not null default '',
  location text not null default '',
  resume_url text not null default '',
  avatar_url text not null default '',
  availability_label text not null default 'Open to work',
  available boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists skills (
  id bigint generated always as identity primary key,
  category text not null,
  name text not null,
  level int not null default 80,               -- 0..100
  sort_order int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists projects (
  id bigint generated always as identity primary key,
  title text not null,
  description text not null default '',
  long_description text not null default '',
  technologies text not null default '',       -- comma separated
  category text not null default '',
  year text not null default '',
  image_url text not null default '',
  live_url text not null default '',
  repo_url text not null default '',
  featured boolean not null default false,
  sort_order int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists experience (
  id bigint generated always as identity primary key,
  company text not null,
  role text not null,
  date_range text not null default '',
  location text not null default '',
  description text not null default '',
  skills text not null default '',             -- comma separated
  sort_order int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists education (
  id bigint generated always as identity primary key,
  university text not null,
  degree text not null,
  major text not null default '',
  year_range text not null default '',
  coursework text not null default '',         -- comma separated
  sort_order int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists certificates (
  id bigint generated always as identity primary key,
  title text not null,
  issuer text not null default '',
  issue_year text not null default '',
  description text not null default '',
  credential_url text not null default '',
  image_url text not null default '',
  sort_order int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists social_links (
  id bigint generated always as identity primary key,
  platform text not null,
  url text not null,
  sort_order int not null default 0,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);
