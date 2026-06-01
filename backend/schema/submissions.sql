-- NVAI submissions schema
-- Run in Supabase Studio → SQL Editor.
-- Idempotent: safe to re-run.
--
-- Tables:
--   1. ddnda_signatures        — Document Distribution & NDA signatures (gallery gate)
--   2. inquiries               — Buyer inquiries on a specific painting
--   3. consignment_submissions — Works submitted for NVAI representation
--
-- All tables use:
--   id          uuid primary key, server-generated
--   created_at  timestamptz default now()
--
-- RLS is OFF by default for backend-only writes via service_role key.
-- If you ever expose these to anon, add policies before flipping RLS on.

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- 1. DDNDA signatures
-- ---------------------------------------------------------------------------
create table if not exists public.ddnda_signatures (
    id                uuid primary key default uuid_generate_v4(),
    created_at        timestamptz not null default now(),
    name              text not null,
    email             text not null,
    role              text,
    organization      text,
    signature         text not null,
    document_version  text not null default '1.0',
    painting_slug     text,
    ip                text,
    user_agent        text
);

create index if not exists ddnda_signatures_email_idx
    on public.ddnda_signatures (email);
create index if not exists ddnda_signatures_created_at_idx
    on public.ddnda_signatures (created_at desc);

-- ---------------------------------------------------------------------------
-- 2. Inquiries
-- ---------------------------------------------------------------------------
create table if not exists public.inquiries (
    id                  uuid primary key default uuid_generate_v4(),
    created_at          timestamptz not null default now(),
    name                text not null,
    email               text not null,
    painting_slug       text,
    message             text not null,
    contact_preference  text not null default 'email',
    status              text not null default 'received',
    ip                  text,
    user_agent          text
);

create index if not exists inquiries_email_idx
    on public.inquiries (email);
create index if not exists inquiries_painting_slug_idx
    on public.inquiries (painting_slug);
create index if not exists inquiries_created_at_idx
    on public.inquiries (created_at desc);

-- ---------------------------------------------------------------------------
-- 3. Consignment submissions
-- ---------------------------------------------------------------------------
create table if not exists public.consignment_submissions (
    id                uuid primary key default uuid_generate_v4(),
    created_at        timestamptz not null default now(),
    name              text not null,
    email             text not null,
    organization      text,
    artist            text not null,
    title             text not null,
    year              text,
    medium            text,
    dimensions        text,
    current_location  text,
    description       text,
    estimated_value   text,
    status            text not null default 'received',
    ip                text,
    user_agent        text
);

create index if not exists consignment_submissions_email_idx
    on public.consignment_submissions (email);
create index if not exists consignment_submissions_artist_idx
    on public.consignment_submissions (artist);
create index if not exists consignment_submissions_created_at_idx
    on public.consignment_submissions (created_at desc);
