# FISC 2026 — Design System

This document is the canonical reference for the FISC 2026 site's visual language, design tokens, and editorial voice. It exists for two audiences:

1. **Anyone building or refining the React prototype** — to know which token to reach for and which patterns are already named.
2. **The team porting this to WordPress (Roots/Sage)** — to translate the tokens and patterns into SCSS variables, theme files, and Blade components without losing the editorial character.

The system is deliberately small. Where a choice could go many ways, the rule is: **one tier per purpose, named, with a reason.** Anything outside the set deserves a comment justifying it.

---

## 1. Brand identity

### What FISC 2026 is

The annual gathering of the FreeBalance customer community — finance ministers, treasurers, budget directors, and public finance leaders from across 40+ governments. Trinidad & Tobago hosts the 18th edition, June 29 – July 2, 2026, at the Hyatt Regency, Port of Spain.

The site reads as **editorial-government, not SaaS-marketing**. Closer to a Financial Times longform or a Bank of England annual report than a tech-product launch page. The audience is ministers and senior public servants; the design has to feel like institutional trust, not a startup pitch.

### Voice — what the site sounds like

| Attribute | Means | Doesn't mean |
| --- | --- | --- |
| **Precise** | "Public finance" not "finance". "PFM reform" not "modernisation". | Jargon for its own sake. Acronyms are explained on first hero use. |
| **Institutional** | "The Government of Trinidad & Tobago hosts FISC 2026." | Stiff. We say "comes to Port of Spain," not "convenes in Port of Spain." |
| **Confident** | "Four days. One PFM agenda." | Marketing language. No "elevate", "seamless", "unleash", or "next-gen." |
| **Editorial** | Display serif italic accent on one phrase per hero. Manifesto-style numbered sections. | Decoration. Italic accent is a once-per-page move, not on every H2. |
| **Direct** | "Open any session for the full briefing." | Cute. No clever metaphor where a verb does the job. |

UK spelling site-wide: *modernise*, *prioritise*, *programme*, *organisation*. American spelling (especially in product names like FreeBalance) is preserved verbatim.

---

## 2. Colour

### Tokens (data.ts)

```ts
BRAND      = "#fd6b18"  // brand orange — accents only
BRAND_SOFT = "#ffb27a"  // muted brand for dark surfaces
INK        = "#0a0a0a"  // off-black — never pure #000
```

### Surface palette

| Surface | Hex | Where it appears |
| --- | --- | --- |
| Ink (off-black) | `#0a0a0a` | Page hero, footer, dark CTA buttons, INK overlay |
| Warm cream | `#f6f4ef` | Agenda + Venue + About section backgrounds — anchors editorial mood |
| Placeholder cream | `#f4efe6` | Initials avatar placeholders (Home host cards, Attendees, etc.) — explicitly NOT brand orange |
| White | `#ffffff` | Default content sections |

### The brand-orange constraint

Brand orange (`#fd6b18`) is **one accent colour, used sparingly**. It appears:

- As small dots in page eyebrows (the `●` before `PROGRAMME`, `DAY 1`, etc.)
- In the gradient text accent on hero H1s
- On primary CTAs (the inner icon square)
- On the active state of Agenda day tabs
- On stats numerals in the Home About-FISC stats row
- On animated status pings (live ticker dot, footer FISC chip)

Brand orange does NOT appear on:
- Placeholder avatars (cream + muted ink instead)
- Inner-page body H2 accents (use plain text or italic em, not gradient text)
- Card surfaces or hover states (use ring + shadow lift)

### Chip tones — OKLCH for perceptual lightness parity

Category chips (Programme / Logistics / Host country / Materials / Recap, etc.) source their `{bg, fg}` from `chipTone(hue)` in `tokens.ts`:

```ts
chipTone(hue) => {
  bg: `oklch(95% 0.05 ${hue})`,
  fg: `oklch(40% 0.13 ${hue})`,
}
```

| Family | Hue | Used for |
| --- | --- | --- |
| Brand / Programme / PFM | 30 | Programme chips, Presentation tags |
| Recap / Reform | 25 | Recap chips, Reform topic |
| Workshop / Performance / Host country | 145 | Workshop tags, host-country eyebrow |
| Logistics / AI | 215 | Logistics chips, AI topic |
| Assessments | 285 | Assessments topic |
| Product | 0 (chroma 0) | Gray-neutral chip override |

Why OKLCH: hex-plus-alpha-15 gives wildly different perceptual lightness across hues. A 15%-alpha orange and a 15%-alpha blue read as completely different darknesses. OKLCH locks lightness (95% bg / 40% fg) and chroma (0.05 bg / 0.13 fg); only the hue varies, so a row of mixed-hue chips reads as a coordinated family.

---

## 3. Typography

### Font stack

| Role | Family | Loaded via |
| --- | --- | --- |
| Body | **Proxima Nova** | `@voaii/proxima-nova` (`main.tsx`) |
| Display italic accent | **Instrument Serif** | Google Fonts `<link>` in `index.html`, `.font-display` class |
| Numerals | `tabular-nums` utility | System mono fallback |

**Banned:** Inter, Roboto, Arial, Open Sans, Helvetica (the "premium template" defaults).

### Type scale (`TYPE` in tokens.ts)

Each tier is a discrete step. Never set a font-size in inline JSX without going through one of these.

| Token | Value | Use |
| --- | --- | --- |
| `display` | `clamp(3rem, 9vw, 8rem)` | Home hero only |
| `hero` | `clamp(2.5rem, 7vw, 6rem)` | Inner-page PageHero |
| `h1` | `clamp(2.45rem, 6vw, 4.5rem)` | Biggest non-hero heading |
| `h2` | `clamp(2rem, 4.5vw, 3.25rem)` | Standard section h2 |
| `h3` | `clamp(1.5rem, 3vw, 2.25rem)` | Sub-section h3 / featured card title |
| `cardTitle` | `1.5rem` (fixed) | List item titles — predictable row rhythm |
| `bodyLg` | `1.125rem` | Lead paragraphs |
| `body` | `1rem` | Standard paragraph |
| `bodySm` | `0.95rem` | Dense list item |
| `meta` | `0.875rem` | Captions, tag chips |
| `micro` | `0.625rem` | Eyebrows, micro labels |

### Body bump

Root font-size is **17px** (`:root { --font-size: 17px }` in `theme.css`) — bumped from the default 16px. This cascades through every rem-based dimension: paragraph copy, padding, gaps, button hit areas, Tailwind utilities. Pixel-sized icons (`size={18}` etc.) stay put. Ministers and older delegates shouldn't need to zoom in.

### Tracking (`TRACKING`)

| Token | Value | Use |
| --- | --- | --- |
| `display` | `-0.04em` | Massive display headlines |
| `tightHeading` | `-0.03em` | Hero h1 |
| `tight` | `-0.025em` | Section h2 |
| `snug` | `-0.02em` | Sub-headings |
| `normal` | `0` | Body |
| `wide` | `0.18em` | Eyebrow / micro |
| `wider` | `0.2em` | Meta labels |
| `widestNarrow` | `0.22em` | SectionLabel eyebrow pills |
| `widest` | `0.25em` | Strongest separation — uppercase chip labels |

### Gradient text — the brand signature

`<GradientText>` (in `shared.tsx`) renders Instrument Serif italic with a brand-orange linear-gradient text-fill. **Reserved for page heroes and rare marquee moments**:

- Home hero (`⟨Caribbean⟩`)
- Home About-FISC intro (`⟨moves from discussion to delivery.⟩`)
- About hero (`⟨public finance reform.⟩`)
- SignIn left (`⟨delegate.⟩`)
- 404 (`⟨transit.⟩`)
- Venue hero (`⟨Twin islands.⟩`)
- All inner-page heroes (Agenda, Speakers, Attendees, DelegateGuide, Videos, Media, Materials, Gallery, Resources, SpeakerDetail)

NOT on body H2s. Body H2s use either plain text or `<em className="italic">` (the secondary italic tier). The gradient is once-per-page.

### Numerals

Always `tabular-nums` for any number that lives next to other numbers in a column or stacks vertically. Agenda time columns, stats rows, countdown ticker, attendee directory counts, all use this.

---

## 4. Spacing & layout

### Container

```
max-w-7xl mx-auto px-5 md:px-6
```

Standard content container, used by every section. The narrow gutter (`px-5`) on mobile lets long-line copy breathe; `px-6` on desktop matches the floating nav pill's padding.

### Section padding

| Use | Padding |
| --- | --- |
| Standard editorial section | `py-14 md:py-28` |
| Compact (Agenda content area) | `py-10 md:py-16` |
| Tight (utility band) | `py-8 md:py-12` |

### Layout register

Site-wide design variance ≈ 7 on a 1–10 scale: **asymmetric but not chaotic**. Patterns we use:

- **Editorial split** — hero left, supporting imagery right (Home Hero, Venue Hotel)
- **Asymmetric bento** — varied tile sizes anchored by wider tiles (Venue "Around the islands")
- **Numbered manifesto** — single-column stacked rows with outsized numerals (Home About-FISC stats)
- **3-up content directories** — Speakers, Attendees, Materials, Videos (intentional pattern for content lists, not "feature rows")

Patterns we don't use: bento masonry with rotated cards, Z-axis cascades with overlapping tilted cards, centred hero billboards.

### Mobile collapse

Every asymmetric layout above `md:` collapses to a single-column stack below 768px. Container drops to `px-4`, sections to `py-8`–`py-10`. Negative-margin "bleed-to-edge" tricks are used for horizontal-scroll rails (e.g. Agenda day tabs) so the last item isn't cropped by container padding.

`min-h-[100dvh]` is used on full-height sections (Root, SignIn, 404) instead of `min-h-screen` to prevent iOS Safari viewport jumping when the URL bar collapses.

---

## 5. Radii (`RADIUS`)

Four tiers. Anything outside this set deserves a comment.

| Token | Tailwind | Use |
| --- | --- | --- |
| `chip` | `rounded-sm` | Tags, time pills, dense list items, inner cores of double-bezel cards |
| `card` | `rounded-md` | Cards, containers, content surfaces, outer trays of double-bezel cards |
| `media` | `rounded-2xl` | Image tiles, photo cards, video posters, hero overlays |
| `pill` | `rounded-full` | Buttons, avatars, status dots, anything circular |

Pre-cleanup the codebase had `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, and `rounded-full` all appearing somewhere. The result was that "this is a card" and "this is a media tile" weren't visually distinguishable. Lock to these four.

### Double-bezel (Doppelrand)

Premium surfaces use a nested-radius pattern: outer hairline tray + inner core with inset highlight. Mathematically calculated radii so the curves are concentric.

```jsx
<div className="rounded-md p-1.5 bg-black/[0.03] ring-1 ring-black/[0.06]">
  <div className="rounded-sm bg-white" style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)" }}>
    {/* content */}
  </div>
</div>
```

Used on: Venue Quick Facts strip, Venue Travel Essentials cards, Newsletter card. Used sparingly — overusing this on every card becomes visual noise.

---

## 6. Ring, shadow & elevation

### Rings (`RING`)

Borders are banned site-wide; rings are the preferred sub-pixel edge.

| Light surface | Dark surface |
| --- | --- |
| `RING.hair`  → `ring-1 ring-black/[0.05]` | `RING_DARK.hair` → `ring-1 ring-white/10` |
| `RING.thin`  → `ring-1 ring-black/10` | `RING_DARK.thin` → `ring-1 ring-white/15` |
| `RING.bold`  → `ring-1 ring-black/20` | `RING_DARK.bold` → `ring-1 ring-white/25` |

### Shadows (`SHADOW`)

| Token | Value | Use |
| --- | --- | --- |
| `ambient` | `shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]` | Floating header, lifted CTAs, hovered cards |
| `innerHighlight` | `shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]` | Inner core of double-bezel cards |

Brand-tinted shadows are used on the primary CTA (`shadow-[0_3px_10px_-5px_rgba(253,107,24,0.35)]`) so the lift carries the brand colour. Harsh dark drop shadows (`shadow-md` / `rgba(0,0,0,0.3)`) are banned.

### Hover lift

Cards do NOT flip to ink-inversion on hover (the previous treatment fought a directory of 40+ items). The standard hover lift:

```jsx
className="ring-1 ring-black/[0.05] shadow-[0_4px_18px_-12px_rgba(0,0,0,0.1)]
           transition-fluid hover:ring-neutral-300
           hover:shadow-[0_10px_28px_-14px_rgba(0,0,0,0.16)]"
```

Tactile press feedback via `active:scale-[0.98]`.

---

## 7. Motion (`EASE`, `DURATION`, motion.ts)

### Easing

| Token | Cubic-bezier | Use |
| --- | --- | --- |
| `EASE.fluid` | `[0.32, 0.72, 0, 1]` | iOS-standard curve. Default for all UI motion. |
| `EASE.deep` | `[0.22, 1, 0.36, 1]` | Scroll-arrival entries. Slower, with overshoot resistance. |

Standard `linear` and `ease-in-out` are banned. The CSS utility class `.transition-fluid` (in `theme.css`) wires the fluid cubic-bezier at 500ms.

### Duration

| Token | Seconds | Use |
| --- | --- | --- |
| `DURATION.snap` | 0.25 | Hover state shifts |
| `DURATION.fluid` | 0.5 | Standard UI motion (default) |
| `DURATION.deep` | 0.9 | Scroll arrival, heavy entry |

### Variants & orchestration

In `motion.ts`:

| Variant | Behaviour |
| --- | --- |
| `fadeUp` | `y: 24 → 0`, opacity `0 → 1`. Standard reveal. |
| `fadeUpTight` | `y: 8 → 0`, opacity `0 → 1`. Smaller travel for nested children. |
| `fadeIn` | Opacity only. For pieces that shouldn't translate. |
| `scaleIn` | `scale: 0.97 → 1` + opacity. For media tiles. |
| `staggerHero` | Parent orchestration for hero contents (eyebrow → headline → body → slot) |
| `staggerSection` | Parent for section reveals — section eyebrow → h2 → body → CTA |
| `staggerList` | Parent for long rows — fast cascade so the list doesn't drag |

All viewport-triggered animations use `REVEAL_VIEWPORT = { once: true, amount: 0.15 }` — fires once when 15% in view.

### Hooks

```ts
useCountUp(target, { duration, format })   // rAF-driven numeral count-up, prefers-reduced-motion aware
useDocumentTitle(leading)                   // per-route browser tab title, " · FISC 2026" appended automatically
```

### Performance guardrails

- **GPU-safe animation only.** Animate `transform` and `opacity`, never `width`/`height`/`top`/`left`. Height-tween accordions use `grid-template-rows: 0fr → 1fr`.
- **No raw scroll listeners.** Use Motion's `useScroll` + `useMotionValueEvent` (shared, rAF-batched across the page).
- **Backdrop-blur** only on fixed / sticky elements (header pill, modal scrim). Never on scrolling containers.
- **Grain texture** only on fixed `pointer-events-none` parents. Never on scrolling containers.

---

## 8. Z-index ladder (`Z`)

Four explicit layers. Arbitrary `z-50` / `z-[60]` / etc. sprinkled through markup is banned.

| Token | Numeric | Use |
| --- | --- | --- |
| `Z.nav` | 50 | Sticky floating navbar |
| `Z.modalScrim` | 60 | Modal / drawer backdrop |
| `Z.modal` | 70 | Modal / drawer panel |
| `Z.overlay` | 100 | Onboarding tour, full-screen overlay |

---

## 9. Components

### `<PageHero>` — inner-page hero

```jsx
<PageHero
  label="Programme"
  title={<>Four days.<br />One <GradientText>PFM agenda.</GradientText></>}
  subtitle="Country-led workshops, presentations and panels…"
  image={HERO_AGENDA}
>
  {/* optional in-hero slot — e.g. Agenda day tabs */}
</PageHero>
```

- Dark surface (`#0a0a0a`) with optional background image at 45% opacity
- Brand-orange radial wash + linear-gradient overlay tuned for AA contrast on portraits
- `SectionLabel` eyebrow with brand-orange dot prefix
- Display H1 from `TYPE.hero` clamp
- Optional `subtitle` paragraph and `children` slot (used by Agenda for the day-tabs row)
- Staggered reveal via `staggerHero` variants

### `<NestedCTA>` — primary button-in-button

Three variants:

- `brand` — solid orange background, dark inner well
- `ink` — solid ink background, white inner well
- `ghost` — transparent background, hairline ring, neutral inner well

Pattern: text label on the left, trailing icon nested inside its own square well at the right edge. Multi-layer hover: container lift, inner well tone shift, icon translate. Active state `scale-[0.98]`. Used as the only "lit" CTA on each page — multiple NestedCTAs in a row should be variant `ghost` except for the primary.

### `<BracketArrow>` — custom CTA icon

SVG arrow with corner-bracket head + diagonal shaft. Replaces Lucide `ArrowUpRight` in all primary CTAs site-wide. Ultra-light stroke (1.5 default, 1.75 inside CTAs).

### `<SectionLabel>` — section eyebrow

```jsx
<SectionLabel>Programme</SectionLabel>
<SectionLabel tone="light">Travel essentials</SectionLabel>
```

Brand-orange dot + uppercase letterspaced label (`tracking-[0.22em]`). Anchors every major section header on the site.

### `<GradientText>` — italic accent

See §3 Typography. Reserved for hero marquee moments.

### `<BezelCard>` — double-bezel container

Helper component for the Doppelrand pattern. Auto-handles the radius differential and inset highlight.

### Skeletons (`Skeletons.tsx`)

Pure-CSS shimmer (no Motion dependency) for loading states. Used in Profile while baseline loads, and as a reference for WordPress port. Primitives: `Skeleton`, `SkeletonText`, `SkeletonHeading`, `SkeletonAvatar`, `SkeletonImage`, `SkeletonPill`. Composed: `SkeletonPersonCard`, `SkeletonSessionRow`, `SkeletonStat`, `SkeletonHero`, `SkeletonGrid`.

### `<Toast>` — status notifications

Variants: `success`, `error`, `info`, `loading`. Stack bottom-right on desktop, full-width bottom on mobile. Loading toasts persist until updated. Used by Profile photo upload, save-state, validation errors.

---

## 10. Copy patterns

### CTAs

Start with a verb. Be specific.

| ✓ | ✗ |
| --- | --- |
| `Open the full briefing` | `View more` |
| `Show all takeaways` | `Browse all` |
| `Reserve your room at the Hyatt Regency` | `Reservations` |
| `Delegate sign in` | `Sign in` (without context) |
| `Download programme` | `Get the PDF` |

### Validation messages

Structure: *what to do*, in second person.

```
✓ Enter the email your invitation was sent to.
✗ Email is required.

✓ That doesn't look like an email address.
✗ Invalid email.

✓ Access codes are at least 4 characters.
✗ Code too short.
```

### Empty states

Structure: *what's missing + why + how to recover*. Big icon + bold title + body + recovery CTA.

```
[icon]
No takeaways match
Try a different search term, or switch the topic filter back to All to see every FISC Takeaway.
[Show all takeaways]
```

Implemented on: Speakers, Attendees, Materials, Media Coverage directories.

### Toasts

Title is a complete clause. Description is the directive.

```
✓ "That file type isn't supported"   → "Pick a JPG, PNG, or WEBP image."
✓ "Some fields need attention"       → "The highlighted fields are missing or need fixing."
✓ "Profile updated"                  → "Other delegates will see these details in the Attendees directory."
✓ "Save didn't go through"           → "Try again in a moment."
```

### Forms

- Label above input
- Brand-dot eyebrow above each section group
- Error text below input with `AlertCircle` icon
- Helper text minimal — most fields don't need it

### Confirmation dialogs

Title names the consequence, not the question.

```
✓ Discard your changes?
✗ Are you sure?
```

Button labels are the actions, not "OK / Cancel."

```
✓ [Discard changes] [Keep editing]
✗ [OK] [Cancel]
```

---

## 11. Editorial principles

### One marquee moment per page

The gradient italic accent (`<GradientText>`) is reserved for one phrase per page hero. The "See you in Trinidad." closing wordmark is reserved for Home only. The huge clamp display H1 (`TYPE.display`) is used on Home Hero only. If a page has multiple "biggest" moments, the system breaks.

### Real names, real numbers

No "John Doe" / "Sarah Chan" / "Acme Corp" / "99.99%". Real ministers (Kamla Persad-Bissessar, Davendranath Tancoo), real FreeBalance leadership (Manuel Schiappa Pietra, Aldo Sagastume, Doug Hadden), real institutions (Hyatt Regency, Piarco International). Stats are real or omitted entirely — "hundreds of delegates from more than 40 countries" is preferred over a precise count that might shift.

### Image library

All hero and gallery imagery lives in `src/imports/` as bundled assets. No Unsplash URLs, no Replicate URLs in production code. Imagery is real photography of Trinidad and Tobago (Maracas Bay, Port of Spain aerial, Carnival mas, Scarlet Ibis, Queen's Royal College, Hyatt Regency).

### One accent colour

Brand orange + INK + cream + neutrals. Category chips add OKLCH-tuned tints at consistent perceptual lightness. No additional brand colours. No purple / blue / green AI-aesthetic gradients.

### Whitespace is the design

Section padding tops out at `py-28` on desktop. Inner cards have `p-7` / `p-10`. Lists use `space-y-2` between items, not `space-y-1`. The composition breathes; nothing is glued to the next thing.

---

## 12. Accessibility

- **AA contrast** on every text-on-image surface. Hero overlays bumped to 0.75/0.35/0.55 alpha after audit showed portrait photos competing with headlines.
- **Reduced motion** honoured — `useCountUp` snaps to target, video heroes swap to static images, all major variants respect `prefers-reduced-motion`.
- **Focus rings** preserved on every interactive element (`focus-visible:ring-2`).
- **`aria-label`** on every icon-only button (social pills, hamburger, expand toggles, sign-out).
- **`aria-expanded`** on every collapsible row (Agenda sessions, DelegateGuide essentials, Header dropdown).
- **`role="status"`** on the newsletter success state and any other async-update region.
- **Keyboard parity** — Agenda session cards toggle on Enter and Space, not just click. The whole card is the hit target; the `+/-` glyph is visual affordance.
- **Document titles** per-route via `useDocumentTitle` so screen readers and browser history announce the right page name.

---

## 13. Worktree → WordPress port

The React/Vite codebase is a throwaway visual prototype. The final target is WordPress, likely Roots/Sage with Bedrock. When porting:

### Tokens → SCSS variables

`tokens.ts` becomes `theme/assets/styles/_tokens.scss`. The Tailwind utility classes (`Z.nav`, `RADIUS.card`) become utility mixins or SCSS variables consumed by Tailwind v4 in the Sage build.

### Components → Blade

| React component | Blade equivalent |
| --- | --- |
| `<PageHero>` | `@include('components.page-hero', [...])` |
| `<NestedCTA>` | `@include('components.cta', ['variant' => 'brand', ...])` |
| `<SectionLabel>` | `@include('components.section-label')` |
| `<GradientText>` | `<span class="font-display italic gradient-text">...</span>` — pure CSS, no component |
| `<Skeleton*>` | CSS-only (the React implementation is already JS-free) |

### Motion

Motion/React variants don't port directly. Reimplement entrance reveals with IntersectionObserver in a small vanilla-JS module, applying the same `transform`/`opacity` deltas with the same `[0.32, 0.72, 0, 1]` cubic-bezier. Scroll-linked parallax (homepage About row) becomes an optional progressive enhancement; skip if not on the critical path.

### Data layer

`data.ts` arrays (`agenda`, `speakers`, `attendees`, `materials`, etc.) become WordPress custom post types or ACF repeater fields. The `delegateGuide` static object becomes an Options Page in ACF. Auth becomes Ultimate Member or similar; the `useAuth` interface defines the shape the WP layer needs to match.

### Routes → templates

| React route | WP template |
| --- | --- |
| `/` | `front-page.blade.php` |
| `/about` | `page-about.blade.php` |
| `/agenda` | `archive-session.blade.php` |
| `/agenda/:day/:idx` | `single-session.blade.php` |
| `/speakers` | `archive-speaker.blade.php` |
| `/speakers/:slug` | `single-speaker.blade.php` |
| `/profile` | gated member page (Ultimate Member) |
| `/sign-in` | UM sign-in form template |

The `useDocumentTitle` system becomes Yoast SEO / Rank Math title rules.

### What to skip

- The mock auth in `auth.tsx` — pure prototype scaffolding, WP handles this end-to-end.
- The `useChecklist` localStorage layer — WordPress user meta replaces it.
- The OnboardingTour first-sign-in detection — WP user meta + a Blade-rendered modal replaces it.

---

## 14. File map

```
src/
├── app/
│   ├── tokens.ts                 — design tokens (THIS IS THE FOUNDATION)
│   ├── motion.ts                 — variants, easing, useCountUp, useDocumentTitle
│   ├── data.ts                   — content (agenda, speakers, attendees, materials)
│   ├── auth.tsx                  — mock auth (port to WP)
│   ├── checklist.ts              — per-user task tracking (port to WP user meta)
│   ├── profile.ts                — per-user profile content (port to WP user meta)
│   ├── components/
│   │   ├── shared.tsx            — PageHero, SectionLabel, GradientText, Grain, Marquee
│   │   ├── OnboardingTour.tsx    — first-sign-in modal flow + context provider
│   │   ├── GatedBody.tsx         — signed-out gate
│   │   ├── CountryFlag.tsx       — flag SVG renderer
│   │   ├── brand/Lockup.tsx      — FreeBalance + FISC 2026 wordmark
│   │   └── ui/
│   │       ├── NestedCTA.tsx     — primary button-in-button
│   │       ├── BracketArrow.tsx  — custom CTA icon
│   │       ├── BezelCard.tsx     — double-bezel helper
│   │       ├── Skeletons.tsx     — CSS-only loading states
│   │       ├── Toast.tsx         — status notifications
│   │       └── CountryDropdown.tsx — searchable country combobox
│   ├── layout/
│   │   ├── Root.tsx              — layout wrapper, per-route title, footer variant
│   │   ├── Header.tsx            — floating nav pill
│   │   └── Footer.tsx            — Newsletter + Footer (variant: full | compact)
│   └── pages/                    — every route lives here
└── styles/
    ├── theme.css                 — :root variables, body, html, .scrollbar-hide, .transition-fluid, .lucide
    └── fonts.css                 — Proxima Nova + Instrument Serif setup
```

---

**Last updated:** May 2026. Maintained as edits land — keep this doc in sync with `tokens.ts`, `motion.ts`, and `shared.tsx`. When in doubt, the code is the source of truth and this doc is the explanation.
