# LINDER — Watch Configurator

## 1. Project overview

**What it is:** Premium watch configurator for a fictional Bauhaus-style German watch brand. Single-page configurator experience where users customize a modernist wristwatch (case, dial, hands, strap, engraving) and see changes rendered in real-time on an SVG illustration.

**What it is NOT:** A traditional landing page with scroll-driven sections. Almost all work happens on one screen — the configurator itself. Landing hero is a 30-second warm-up, summary page is a finisher.

**Reference brands for tone/aesthetic:**
- NOMOS Glashütte (primary reference)
- Uniform Wares
- Braun watches (BN0021)
- Anordain
- MeisterSinger

Look these up before starting visual work. The aesthetic is precise, restrained, architectural. Not luxurious in the sense of gold and baroque details — luxurious in the sense of perfect proportion and absence of decoration.

**Timeline target:** 2-3 days.

---

## 2. Tech stack (fixed, do not change)

- Next.js 14+ App Router, TypeScript strict mode
- Tailwind CSS 3.4+
- Framer Motion for animations
- Zustand for configurator state management
- next/font/google for typography
- SVG rendered inline as React components (NOT img tags or external files)

**Do NOT add without explicit approval:**
- Redux, MobX, or any other state library beyond Zustand
- External UI kits (shadcn, Radix) — build primitives from scratch
- Canvas or WebGL — everything is SVG
- Three.js — no 3D
- Backend or database — everything client-side

---

## 3. Brand and copy

**Brand name:** LINDER
**Location:** Berlin (not Glashütte — we want distinct identity)
**Founded:** fictional 1978
**Positioning:** "Bauhaus meets horology. Quiet watches, made slowly."

**Tone of voice:**
- Short sentences. One idea per paragraph.
- Technical without being geeky. Poetic without being flowery.
- German precision in word choice, not German in language (site is English).
- Think: editorial in Cereal magazine, technical in MB&F white papers.

**What NOT to write:**
- No "craftsmanship" used as lazy word
- No "timepieces" — we use "watches" like grown-ups
- No exclamation marks ever
- No "artisanal" / "handcrafted" / "heritage" clichés
- No Swiss-watch references (we compete against NOMOS, not Patek)

---

## 4. Site architecture (three routes)

**Route 1: / (landing hero)**
- Single viewport
- Large typography statement
- SVG watch preview (static, default configuration)
- CTA button "Configure your watch" leading to /configure
- Minimal navigation, no scroll-driven content

**Route 2: /configure (main app, 80% of work)**
- Desktop (>=1024px): horizontal split
  - Left 50%: sticky SVG watch preview, vertically centered
  - Right 50%: scrollable control panel with 8 configuration sections
- Mobile (<1024px): stacked
  - Top ~40vh: sticky SVG watch (smaller, but always visible)
  - Bottom: scrollable control panel
- Price pill fixed in corner showing live price
- "Review configuration" button at bottom of controls leading to /configure/summary

**Route 3: /configure/summary (finisher)**
- Large final SVG render of configured watch
- Summary list of all choices with individual prices
- Final total price
- CTA "Place order" (dummy, doesn't do anything — this is portfolio)
- "Back to configurator" link

---

## 5. Configuration options (8 components)

Each option has: internal id, display label, price delta from base, SVG rendering logic.

**Base price: 1450 EUR** (steel case, white dial, arabic numerals, blue hands, sub-dial at six, black calf strap, 38mm, no engraving)

### 5.1. Case material (4 options)
- steel — +0 — polished 316L steel (default, light grey)
- rose-gold — +800 — warm pink-gold tone
- yellow-gold — +950 — classic yellow gold
- blackened — +200 — DLC-coated black steel

### 5.2. Dial color (5 options)
- white — +0 — pure white (default)
- silver — +0 — silver sunray (for SVG = off-white with slight warmth)
- black — +100 — matte black
- navy — +150 — deep navy blue
- cream — +80 — ivory/eggshell tone

### 5.3. Index style (3 options)
- arabic-cardinals — +0 — arabic numerals at 12/3/6/9, sticks elsewhere (default)
- roman — +180 — roman numerals at all positions (I-XII)
- sticks-only — -50 — just sticks, no numerals (most minimalist)

### 5.4. Hand color (4 options)
- blue — +0 — blued steel (default, var(--color-linder-blue))
- black — +0 — polished black
- silver — +0 — polished steel
- gold — +120 — warm gold (matches rose-gold/yellow-gold cases)

### 5.5. Complications (3 options)
- sub-seconds-six — +0 — sub-dial seconds at 6 o'clock (default)
- sub-seconds-nine — +0 — sub-dial seconds at 9 o'clock
- none — -100 — clean dial, no sub-dial, centre seconds hand

### 5.6. Strap material (5 options)
- black-calf — +0 — black calfskin leather (default)
- brown-calf — +0 — mocha brown calfskin
- tan-leather — +50 — cognac/tan shade
- steel-bracelet — +380 — brushed steel link bracelet
- nato-textile — -80 — textile NATO strap (grey/navy stripe)

### 5.7. Case size (3 options)
- 35mm — -50 — smaller, more classical
- 38mm — +0 — standard (default)
- 41mm — +80 — larger, modern

### 5.8. Engraving (optional text)
- No engraving: +0 (default)
- With engraving: +200
- Max 24 characters
- Only alphanumeric + spaces + common punctuation (. , - ' &)
- Preview on case back (requires toggle Front/Back view)
- Font: same serif as dial numerals for consistency

---

## 6. SVG structure requirements

**Single master SVG component:** components/watch/Watch.tsx

Takes props from Zustand store, renders accordingly. All nested sub-components (case, dial, hands, strap, back case) are separate React components with their own prop interfaces.

Structure (pseudo-JSX):

    <Watch view="front" or "back">
      <Strap material={...} />           // behind everything
      <Crown />                           // sits right edge
      <Case material={...} size={...} /> // circular container
      <Dial color={...}>
        <MinuteTrack />
        <HourIndexes style={...} />
        <SubDial position={...} hidden={...} />
        <DateWindow />
        <BrandName />
      </Dial>
      <Hands color={...} />               // on top of dial
      <BackCase engraving={...} visible={view === "back"} />
    </Watch>

**Critical implementation notes:**
- All colors passed as CSS variables or props, never hardcoded inside components
- Transitions on prop changes: 400ms ease-out-expo on fill attributes (use Framer Motion's animate on SVG attributes)
- SVG viewBox stays constant: "0 0 400 500" regardless of case size
- Case size changes via internal scale transform, not viewBox resize
- Hands always point to 10:10:30 (iconic watch ad position) — time does not tick, this is a static product image

---

## 7. State management (Zustand)

Single store at store/configuratorStore.ts

TypeScript interface (conceptual):

    interface ConfiguratorState {
      caseMaterial: CaseMaterialId;
      dialColor: DialColorId;
      indexStyle: IndexStyleId;
      handColor: HandColorId;
      complication: ComplicationId;
      strapMaterial: StrapMaterialId;
      caseSize: CaseSizeId;
      engraving: string;  // empty string = no engraving
      view: "front" or "back";

      // actions
      setOption(key, value)
      reset()

      // computed
      getTotalPrice(): number  // sums base + all deltas
      getConfigUrl(): string   // URL params for sharing
      loadFromUrl(params)
    }

**Persistence:** use Zustand persist middleware with localStorage adapter. Store key: linder-watch-config-v1

**URL sync:** On every state change, update URL via router.replace with searchParams. On mount, check URL params and hydrate state from them (URL takes precedence over localStorage).

---

## 8. Design tokens (CSS variables in globals.css)

    :root {
      /* Surfaces */
      --color-paper: #F9F7F2;        /* main bg, warm off-white */
      --color-bone: #F0ECE2;         /* section bg, slightly deeper */
      --color-ink: #131312;          /* primary text, near-black */
      --color-graphite: #3E3D3A;     /* secondary text */
      --color-mist: #7A7975;         /* tertiary / muted */
      --color-rule: #D4CEC1;         /* hairline borders */

      /* Accents */
      --color-linder-blue: #1E3A6F;  /* blued steel, hand color */
      --color-linder-red: #8B1A1A;   /* rarely used, seconds hand tip */

      /* Watch material colors (used in SVG) */
      --color-case-steel: #C7C5C0;
      --color-case-rose-gold: #C9A88B;
      --color-case-yellow-gold: #D4B87C;
      --color-case-blackened: #2A2826;

      --color-dial-white: #FFFFFF;
      --color-dial-silver: #F5F3ED;
      --color-dial-black: #141412;
      --color-dial-navy: #1A2F4F;
      --color-dial-cream: #F5EBD5;

      --color-strap-black: #1A1814;
      --color-strap-brown: #4A2F1E;
      --color-strap-tan: #A26B3E;
      --color-strap-steel: #B8B5AE;
      --color-strap-nato: #4A5568;
    }

---

## 9. Typography

**Google fonts (next/font):**
- Display: **Instrument Serif** (variable, 400) — for brand name, large headlines. It's what NOMOS uses tonally. Slightly unusual, editorial.
- Body: **Inter** (variable) — clean neo-grotesque for UI and body
- Mono: **JetBrains Mono** (400, 500) — for prices, technical labels, code-like moments

**Scale:**
- Hero heading: Instrument Serif 64px to 88px (xl), line-height 1.0
- Section heading: 32px to 44px, line-height 1.1
- Option group label: Inter 16px medium, uppercase tracking-[0.12em]
- Option radio/button label: Inter 15px, regular
- Price display: JetBrains Mono 14px for option deltas, Instrument Serif 48px for total price
- Body: Inter 16px regular, line-height 1.55

---

## 10. Banned patterns (hard no)

These things are instant-kill for the aesthetic. Do not use them under any circumstance:

- Large rounded corners (max 4px radius anywhere, 2px preferred)
- Drop shadows larger than 1px (subtle or none)
- Gradients anywhere (flat colors only)
- Emoji in UI or copy
- Bold as emphasis inside body text
- Sticky header with backdrop blur (we have no sticky header)
- "Get Started" / "Start now" / "Let's go" as CTAs
- Generic configurator patterns: coloured circles grid for "choose color", big preview box with thumbnails — be more editorial
- Icons as decoration (icons only if functional)
- Chat widgets, cookie banners (portfolio site, no tracking)
- Loading spinners — use skeleton fades or nothing
- Toast notifications (price updates inline, no popup confirmations)
- Progress bars for configurator ("step 3 of 8" patterns) — we are not a form wizard, user picks in any order

---

## 11. Development priority (strict order)

Each section should be completed and approved before moving to the next. Do not start a new section when the previous one has unresolved issues.

1. **Setup + SVG Watch component** — the foundation. Modernist NOMOS-style watch rendering in React, all 8 options working via props. No UI yet, just /test-watch page showing default configuration. Approx. 4-6 hours.

2. **Zustand store + URL/localStorage sync** — state layer before any UI. Write a /test-state page with raw buttons for each option toggle, verify state updates, URL updates, localStorage persists.

3. **Landing / hero** — simplest route. Single viewport, big typography, default watch SVG, CTA to /configure.

4. **Configure layout shell** — the two-column (desktop) or stacked (mobile) layout with sticky watch + scrollable controls. Empty control panel for now.

5. **Control sections (8 sub-sections, one at a time)** — case, dial, indexes, hands, complications, strap, size, engraving. Each with its own UI pattern appropriate to the choice type.

6. **Price pill** — sticky corner element showing live total price with animated transitions on change.

7. **Review summary /configure/summary** — final page with big watch render, config breakdown, total.

8. **Polish pass** — loading states, reduced-motion handling, keyboard accessibility, mobile breakpoints, final review of all routes.

---

## 12. Pre-flight checks before every session

Before asking me to implement a section, answer:

1. **What state does this section read/write?** List exact store fields.
2. **What SVG props change from this section?** If none — explain.
3. **What's the mobile breakpoint behaviour?** Horizontal to stacked transition point is 1024px.
4. **What's the reduced-motion behaviour?** If there's animation in this section, describe its non-animated fallback.
5. **What's the keyboard interaction?** Tab order, Enter/Space behaviour on radio options.

If you can't answer all five — you haven't planned enough.

---

## 13. Development method (mandatory)

**For every section:**

1. I write a prompt describing what to build
2. You respond with a **plan** in 5-8 bullet points — architecture decisions, file list, technical approach. You do NOT write code yet.
3. I approve or iterate on the plan
4. You write the code, committing to the plan
5. I review the output, either approve or request changes

**Breaking this rhythm (writing code without a plan) is the fastest way to spend two days rebuilding something.**

For complex sections (SVG watch component, main configurator layout), break into explicit stages:
- Stage 1: static markup only, no state
- Stage 2: state wiring
- Stage 3: animations and polish

Do not combine stages without explicit approval.

---

## 14. Quality gates (before each deploy)

These must all pass before the project is considered done:

- npm run build succeeds with zero errors
- npm run typecheck passes with zero errors
- npm run lint passes (warnings acceptable, errors not)
- All 8 configuration options change the SVG visibly and immediately
- Total price updates on every option change
- URL params update on every option change
- Refreshing the page loads the same configuration from URL
- localStorage persists configuration between browser sessions (test: make changes, close tab, reopen site)
- /configure/summary shows the correct configured watch
- Mobile breakpoint (1023px and below) stacks layout correctly
- prefers-reduced-motion: reduce disables animations
- No console errors in production build
- No CLS (layout shift) during initial page load
- meta tags, OG image, favicon set correctly

---

## 15. File structure (target)

    app/
      layout.tsx              # root layout, fonts, metadata
      page.tsx                # landing hero
      configure/
        page.tsx              # main configurator
        summary/page.tsx      # review summary
      globals.css             # CSS variables, Tailwind base

    components/
      watch/
        Watch.tsx             # master SVG orchestrator
        Case.tsx
        Dial.tsx
        Hands.tsx
        Strap.tsx
        BackCase.tsx
        HourIndexes.tsx
        SubDial.tsx
      configurator/
        LayoutShell.tsx       # split layout or stacked
        PricePill.tsx
        ViewToggle.tsx        # front / back
        sections/
          CaseSection.tsx
          DialSection.tsx
          IndexSection.tsx
          HandSection.tsx
          ComplicationSection.tsx
          StrapSection.tsx
          SizeSection.tsx
          EngravingSection.tsx
      ui/
        OptionCard.tsx        # reusable choice card
        PriceDelta.tsx        # "+120" component
        CopyButton.tsx        # copy share URL
      landing/
        Hero.tsx
      summary/
        ConfigList.tsx

    store/
      configuratorStore.ts

    lib/
      pricing.ts              # price calculation
      urlSync.ts              # URL param encode/decode
      constants.ts            # options, labels, price deltas

---

## 16. What success looks like

A recruiter or potential employer visits the site. They:

1. Land on /, understand in 3 seconds it's a watch configurator
2. Click CTA, go to /configure
3. Play with options for 30-60 seconds, see the watch change visibly with every click
4. Notice the price updating in real time
5. Try the back-of-case engraving and see their name appear
6. Click "Review configuration", see the summary
7. Copy the share URL, paste it in a new tab, see their exact configuration load

At any point they can say: "This was built by someone who understands state management, SVG rendering, responsive design, and aesthetic restraint."

**That's the bar. Nothing less counts.**
