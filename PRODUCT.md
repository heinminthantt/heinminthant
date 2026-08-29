# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** Hiring managers and recruiters evaluating Hein Min Thant for full-time software engineering roles — scanning for reliability, architecture quality, and shipped work.

**Secondary:** Potential freelance / contract clients with a project or product need who land via direct link, search, or referral and need to quickly judge competence, communication, and availability.

**Tertiary:** Peers, collaborators, and community members exploring toolkit and project approach.

All three arrive cold, without onboarding, on desktop or mobile, and decide within seconds whether to scroll, inspect a project case, or open contact. Their job is to answer: "Can I trust this developer to build maintainable, useful software?"

## Product Purpose

A single-page premium personal portfolio at heinminthant.com that presents who Hein Min Thant is, what he builds, and how he works — as a calm, editorial, high-signal alternative to template developer portfolios.

It makes possible a fast, credible evaluation without a call: clear positioning, scannable proof (selected work, toolkit, journey, certifications), and a direct path to contact — all in one scroll. Success is an inbound message from the right opportunity (full-time role or meaningful freelance project), not traffic volume.

## Positioning

**Mechanism a neighbor could not copy:** A reliability-first engineer who ships maintainable systems, not demos — clean architecture, useful interfaces, and quietly dependable software — evidenced by real projects and toolkit breadth rather than decorative effects.

The portfolio itself is the proof: disciplined structure, real data from Supabase, canvas-based atmosphere kept deliberately behind content, and Typography and whiteness carrying the hierarchy so the work reads clearly.

## Operating Context

- Single scroll narrative: Nav → Hero → About → Toolkit → Selected Work → Journey (experience + education) → Certifications → Contact → Footer. Admin area at `/admin` (protected) edits all content.
- Content is managed in Supabase (PostgREST via `lib/rest.ts`, `lib/queries.ts` with normalization + `DEFAULT_SETTINGS` fallback) across `site_settings`, `skills`, `projects`, `experience`, `education`, `certificates`, `social_links`, `messages`. Admin mutations are server actions.
- Visitors browse via organic search, direct link, GitHub/LinkedIn, or resume link — on devices 320px to 1920px. Most will not interact beyond scroll and outbound links (live URL, repo, credential verify, mailto, socials, contact form).
- Legal/proof context: structured data (`Person` + `WebSite` JSON-LD), `robots.ts`, `sitemap.ts`, canonical URL.
- Dev entry: `npm run dev` (Next 16.3.1), `next build` for prod. No horizontal overflow, prefers-reduced-motion and contrast respected.

## Capabilities and Constraints

**Confirmed capabilities:**
- Hero with availability badge, headline/subheadline from `site_settings`, primary (work) and secondary (contact) CTAs, decorative BlackHole accretion disk + Starfield canvas (desktop only for disk, fixed atmospheric layers).
- About: statement + spotlight text, philosophy quote, avatar, interests / currently-learning chips, location/email/resume.
- Toolkit: grouped by category (languages, frontend, backend, database, tools), with level indicators and tech logos.
- Selected Work: feature row for first project + two-column grid for remainder; each project carries category, year, title, description, technologies, links (live/repo), image or procedural CosmicTile fallback.
- Journey: timeline (experience then education) with date range, role/company/location, description, skills/coursework pills.
- Certifications: horizontal scroll carousel with image or CosmicTile.
- Contact: persistent copy plus `ContactForm` (server action `sendMessage` → `messages` table) with success state and accessible labels.
- Nav: floating liquid-glass capsule, scroll-aware, with mobile disclosure. Footer with socials and back-to-top.

**Technical constraints:**
- Stack is already set: Next.js App Router + TypeScript + Tailwind CSS 4 + Framer Motion + Geist (sans/mono) + Phosphor Icons; data via Supabase (Anon + Service Role + Postgres pooler). Do not replace the stack without explicit user decision.
- All colors/tokens are centralized in `app/globals.css` via `@theme` (deep-space palette). Keep bespoke canvas effects behind `z-0` and content on `z-10` — never repaint-on-scroll.
- Content fidelity constraint: **never invent** companies, employment history, education, certifications, achievements, or project outcomes. Missing fields render as empty/fallback; fabricated copy is prohibited. Supabase rows are source of truth.
- Performance: optimize images (`next/image`), lazy-load offscreen effects, keep JS minimal, respect `prefers-reduced-motion` and `prefers-reduced-transparency`.

**Explicitly undecided:**
- Whether to add a dedicated project detail route vs keeping modal/section-level case studies.
- Freelance positioning (rates, service packages) is not yet formalized — keep contact open-ended rather than committing to pricing tiers.

## Brand Commitments

- Name: **Hein Min Thant**. Domain `heinminthant.com`. SEO title pattern `Hein Min Thant — Software Engineer / Developer`.
- Voice: minimal, editorial, professional rather than corporate — confident but quiet; lets work and hierarchy speak. No corporate jargon, no hype claims.
- Visual direction (from `instructions.md` + shipped code): minimal, editorial, premium, spacious, typography-focused, modern, slightly experimental, restrained color, subtle borders, abundant whitespace-equivalent (in dark space: generous vertical rhythm), strong hierarchy.
- Existing deep-space world is incumbent in code (`--color-space #05060c`, `--color-starlight #e6b95f` as sole accent, nebula haze + grain + starfield + black hole). Product truth does not lock this world forever, but `new-work.md` must deliberately preserve or replace it — never half-replace. For refinement work, preserve the token system.
- Google Fonts / Geist pairing is committed; Phosphor Icons and Framer Motion are the motion/icon language.

## Evidence on Hand

- **Real data:** Supabase tables (`site_settings`, `skills`, `projects`, `experience` including METATEAM Myanmar Software Development Intern work, `education`, `certificates` e.g. Meta Android Developer, `social_links`). Normalizers in `lib/queries.ts:38-138` enforce typed defaults; `DEFAULT_SETTINGS` at `lib/queries.ts:172` defines honest fallbacks. Absence of data must render as absence — not invented copy.
- **Existing build evidence:** `app/page.tsx`, `app/globals.css`, `components/Hero.tsx`, `Nav.tsx`, `About.tsx`, `Toolkit.tsx`, `Projects.tsx`, `Journey.tsx`, `Certificates.tsx`, `Contact.tsx`, plus `/app/admin` CRUD surfaces and `lib/rest.ts`.
- **Not yet available / must not fabricate:** client logos, third-party testimonials, press mentions, project metrics/results, additional case-study imagery. Do not invent placeholder screenshots that imply built outcomes; use `CosmicTile.tsx` or clearly labeled placeholders where imagery is missing.
- **Assets to collect before irreversible claims:** portrait photo (`avatar_url`), resume PDF (`resume_url`), project hero images, credential verification URLs.

## Product Principles

1. **Truth over theatre** — every claim maps to a verifiable row or asset. Empty is better than invented.
2. **Hierarchy does the selling** — typography, spacing, and reveal carry the narrative; decoration never competes with content.
3. **Reliability made visible** — architecture, naming, and data separation demonstrate the same care promised for client work.
4. **One decisive action** — every viewport offers a single obvious next step toward contact or proof, without competing CTAs.
5. **Respect the visitor's medium** — keyboard, screen reader, reduced-motion, low-bandwidth, and any viewport from 320px to 1920px receive a complete, unbroken experience.

## Accessibility & Inclusion

- Semantic HTML, proper heading hierarchy, accessible labels for form and nav, keyboard-navigable, focus-visible states (`field-input: focus` in `app/globals.css:274`).
- Sufficient color contrast against deep-space background (mist #e9ebf4 on space #05060c, starlight accent never as sole signal).
- Motion respects `prefers-reduced-motion` (global kill at `app/globals.css:279` plus JS `useReducedMotion` guards); transparency respects `prefers-reduced-transparency`.
- Target WCAG 2.2 AA; do not regress contrast, focus order, or alt text. Contact form errors are `role="alert"`, success is `role="status"`.
