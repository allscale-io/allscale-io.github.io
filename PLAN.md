# labs.allscale.io — Ecosystem Directory Plan

A directory-led showcase of every place AllScale Checkout can be used: official integrations, products built on AllScale, and Labs experiments. Replaces the current contents of `labs.allscale.io`.

---

## 1. Decisions locked in

| Question | Decision |
|---|---|
| Relationship to existing Partner Program | **Separate concept.** The existing `allscale.io/partner-program` is a reseller/broker program and stays unchanged. |
| Where it lives | **`labs.allscale.io`**, replacing the current site at that URL. |
| Style | **Directory-led**, not marketing-led. Built to scale from ~5 items to dozens fast. |
| Buy Me a Bagel | **Omit at launch.** Add when it ships. |
| x402charity | **Include** in the directory with an `Experiment` status badge. |
| AllScale POS framing | **B2B / white-label** — for POS and payment companies to integrate crypto. Not merchant-facing. |
| Partner submissions | **Email only** (`ecosystem@allscale.io` or similar) — no self-serve form yet. |

## 2. Open questions still pending

These are decisions still to make before or during design:

1. **Branding: "Ecosystem" vs. "Labs"** as the visible site name. URL is `labs.allscale.io` either way.
   - Recommended: brand as **"AllScale Ecosystem"** in all H1s/headers/SEO. The `labs` subdomain is just plumbing.
   - Alternative: lean into "AllScale Labs" wholesale, accepting that production integrations live under an experimental brand.
2. **Labs as a separate section, or just a filter tag in the unified directory?**
   - Recommended: **unified directory with an `Experiment` status badge** + filter. Cleaner at low volume. Can split out later.
3. **Static site framework choice** — see Section 8.
4. **Submission email address** — `ecosystem@allscale.io`, `partners@allscale.io`, or reuse an existing alias?
5. **AllScale POS detailed landing page** — defer until inbound leads justify it. For launch, the card opens a contact modal.

## 3. Hosting reality

The current `labs.allscale.io` is served from:

- **Repo:** [`allscale-io/allscale-io.github.io`](https://github.com/allscale-io/allscale-io.github.io) (public)
- **Hosting:** GitHub Pages
- **Edge:** Cloudflare proxy in front (DNS resolves to Cloudflare; origin is GitHub Pages)
- **Custom domain:** set via `CNAME` file in the repo root containing `labs.allscale.io`
- **Last updated:** 2026-03-07 — nothing has touched it in months

**Deploy model:** push to the default branch → GitHub Pages rebuilds (~1 min) → Cloudflare cache TTL is 600s (worst-case ~10 min before visitors see updates).

**Recommendation:** stay on GitHub Pages for the rebuild. Static-only is fine for a client-side-filtered directory. Migrate to Vercel only if/when the site needs server-side features (real submission form, partner auth, dynamic per-item pages with edge logic).

## 4. Site information architecture

Top-to-bottom layout:

### 4.1 Header / nav
- Logo → links to `allscale.io`
- Nav anchors: **Integrations**, **Built with AllScale**, **Labs** (only if section exists), **Submit your app**
- Persistent CTA top-right: **"Build with AllScale"** → AllScale docs

### 4.2 Compact hero
- One H1 (e.g., "The AllScale ecosystem — every place you can use stablecoin payments")
- One line of body copy
- One CTA: **Submit your app** (mailto)
- **No carousel, no big illustration** — directory must fit close to the fold. Visitors scroll straight to the grid.

### 4.3 Filter bar (sticky on scroll)
Operates on the unified directory below. Filter dimensions:

| Filter | Type | Values |
|---|---|---|
| Surface | multi-select | WordPress, Telegram, POS hardware, AI agents / Claude Code, Solana, Web/API, Shopify, … |
| Audience | multi-select | Merchants, Developers, AI agents, POS resellers, Creators |
| Type | multi-select | Plugin, SaaS, White-label, Open source, Skill / agent tool, Demo |
| Status | multi-select | Live, Beta, Experiment |
| Built by | multi-select | AllScale, Community, Partner |
| Search | free text | Searches name + description |
| Sort | single-select | Featured (default), Newest, A–Z |

This taxonomy must be locked before content goes in — retro-tagging is painful.

### 4.4 Featured strip
3–4 hand-picked cards above the main directory. Editorially controlled regardless of filters. Same items also appear in the main grid below.

Launch featured set:
- AllScale for WooCommerce
- AllScale Storefront (Telegram)
- AllScale POS
- AllScale Checkout Skill

### 4.5 Main directory grid
Responsive (4/3/2/1 columns). Each card carries the same fields (see Section 5), but **the primary CTA is per-item, not uniform** — don't force everything into "Learn more."

### 4.6 Submission section
Two-column block above the footer:
- **For builders:** "Building a product on AllScale? Get listed." → mailto with templated subject + 3-bullet list of what to include (name, link, one-liner, logo).
- **For partners (POS, SaaS, agencies):** "Want to embed AllScale?" → same or separate email.

### 4.7 Footer
Standard links: allscale.io, docs, GitHub org, social, **and** an explicit link to the reseller Partner Program (so the two don't get confused).

## 5. Card data model

Each directory entry stored as one record (one MD or JSON file per item, in repo):

```yaml
name: "AllScale for WooCommerce"
slug: "woocommerce"
logo: "/logos/woocommerce.svg"
one_liner: "Accept stablecoin payments on your WordPress store"
long_description: "…"             # used on detail page if added later
surface: ["WordPress"]
audience: ["Merchants"]
type: ["Plugin", "Open source"]
status: "Live"                    # Live | Beta | Experiment
built_by: "AllScale"              # AllScale | Community | Partner
primary_cta_label: "Install plugin"
primary_cta_url: "https://github.com/allscale-io/allscale-checkout-woocommerce"
secondary_cta_label: "Read docs"
secondary_cta_url: "https://github.com/allscale-io/allscale-checkout-woocommerce#readme"
featured: true
sort_order: 10
launch_date: "2026-03-10"
```

One file per item = adding a new item is a small PR, no CMS needed.

## 6. Launch directory contents

| Card | Surface | Audience | Type | Status | Built by | Primary CTA |
|---|---|---|---|---|---|---|
| AllScale for WooCommerce | WordPress | Merchants | Plugin · Open source | Live | AllScale | Install plugin → GitHub |
| AllScale Storefront | Telegram | Merchants | SaaS | Live | AllScale | Launch storefront → allscale.store |
| AllScale POS | POS hardware | POS resellers · Payment companies | White-label | Live | AllScale | Talk to us → contact modal |
| AllScale Checkout Skill | AI agents / Claude Code | Developers | Skill · Open source | Live | AllScale | Install in Claude Code → GitHub |
| x402 Charity | Solana | Developers | Demo · Open source | Experiment | AllScale | Try the demo → x402charity.com |

Buy Me a Bagel omitted until launch. The "Built with AllScale" section may be hidden entirely until at least one card exists for it.

## 7. Special handling: AllScale POS

POS is the only B2B-only item. It needs more context than a card holds.

- **For launch:** card CTA opens a modal with a short B2B pitch + email link. Tag clearly as **White-label**.
- **Later:** graduate to a dedicated landing page at `labs.allscale.io/pos` linked from the card. Triggered when inbound POS leads justify the page.

## 8. Implementation plan

Everything below ships in **one pass**. No phasing, no incremental rollout — the current `labs.allscale.io` is replaced by the finished ecosystem directory in a single deploy.

### Prerequisites (resolve before build starts)
- Pick **Ecosystem** vs. **Labs** branding (Section 2, Q1)
- Confirm submission email address (Section 2, Q4)
- Source logos for all 5 launch items (WordPress, Telegram, AllScale POS, Claude Code, x402) and confirm usage rights for third-party marks

### Framework
**Astro.**
- Content-driven (each card = a `.md`/`.mdx` file with frontmatter — maps directly to Section 5's data model)
- Ships zero JS by default; filter UI as an interactive island (React/Solid/Svelte component)
- Excellent GitHub Pages deploy story (built-in adapter)
- Easy to migrate to Vercel later without rewriting content

Alternatives considered (not chosen): Next.js static export (overkill), 11ty (manual filter wiring), vanilla HTML+JSON+JS (doesn't scale past a handful of entries).

### Build checklist
- **Scaffold**: Astro project at repo root, GitHub Actions workflow for Pages deploy, preserve `CNAME` containing `labs.allscale.io`
- **Data layer**: `src/content/entries/` with one `.md` per item using the Section 5 frontmatter schema, validated by Astro content-collection Zod schema (malformed entry = failed build)
- **Components**:
  - `<Hero />` — compact, single CTA
  - `<FilterBar />` — interactive island; reads URL query params so filtered states are shareable
  - `<EntryCard />` — uniform card; renders per-item CTAs
  - `<FeaturedStrip />` — editorial slot, reads `featured: true` entries
  - `<SubmissionCTA />` — bottom-of-page block
  - `<POSContactModal />` — opens from POS card; mailto-based
- **Content**: write the 5 launch entries (Section 6) with sourced logos
- **Submission flow**: mailto link with templated subject (`Ecosystem submission: <your app name>`) and pre-filled body listing required fields. No backend.
- **Deploy**: drop existing repo files (keep `CNAME`), push, verify at `labs.allscale.io`, clear Cloudflare cache (or wait ≤10 min for TTL)

### Explicitly out of scope
The following are deferred until real usage justifies them — do not build now:
- Analytics (Plausible / Umami / GA4)
- Per-item detail pages
- Real submission form (Formspree / Vercel function)
- Migration off GitHub Pages

## 9. Scaling considerations

The schema and IA are deliberately built for 50+ entries:

- **Filtering** is client-side (fine up to a few hundred entries; revisit at that point)
- **One file per entry** means adding partners scales linearly with no central registry to edit
- **Per-item CTAs** mean a new entry type (e.g., a Discord bot, a Shopify app, a CLI tool) needs no new component — just a different `primary_cta_label`
- **Featured strip** stays editorially controlled regardless of how many entries pile up
- **The Labs/Experiment status badge** keeps experiments honest even as production entries dominate the grid

## 10. What to hand to Claude Design

1. This document
2. Decisions on the Section 2 open questions (especially Ecosystem vs. Labs naming)
3. Final copy for the 5 launch cards (Section 6)
4. Logos for each launch item
5. AllScale's existing brand assets (colors, type, button styles) from `allscale.io`
6. The `CNAME` constraint (must preserve `labs.allscale.io` in the deploy)
