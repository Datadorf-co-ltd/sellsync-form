# CLAUDE.md — form-interested-sellsync

## Project Overview
Next.js 16 form for collecting interested leads and saving to Google Sheets (Datadorf / SellSync product).

## Stack
- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS v4, shadcn/ui
- **Font:** Prompt (Google Fonts) — Thai + Latin
- **Validation:** Zod v4 + react-hook-form + @hookform/resolvers
- **Database:** Google Sheets via `google-spreadsheet` package (Service Account auth)
- **Toast:** Sonner

## Architecture Decisions
- Form fields are declared as a `const FIELDS` array → loop-rendered (single source of truth)
- Form submission uses a Next.js **Server Action** (`src/app/form/actions.ts`)
- Google Sheets auth uses **Service Account** (JSON key via env vars)
- No dark mode — light-only minimal modern UI

## Design System
- Color palette defined in `globals.css` as CSS custom properties
- Primary brand: Indigo/Slate palette (see globals.css for tokens)
- Minimal modern — white background, subtle borders, generous spacing

## File Structure
```
src/
  app/
    layout.tsx          # Prompt font, Sonner Toaster
    globals.css         # Design system tokens + Tailwind v4
    form/
      page.tsx          # Form page with metadata
      actions.ts        # Server Action → Google Sheets
  components/
    InterestForm.tsx    # Main form component (loop-rendered fields)
  lib/
    schema.ts           # Zod schema + FieldConfig type + FIELDS const
```

## Environment Variables
```
GOOGLE_SERVICE_ACCOUNT_EMAIL=...
GOOGLE_PRIVATE_KEY=...
GOOGLE_SPREADSHEET_ID=...
```

## Tasks (implementation order)
1. Install packages
2. Setup shadcn/ui (init + add components)
3. Update layout.tsx (Prompt font + Sonner)
4. Update globals.css (design system)
5. Create src/lib/schema.ts
6. Create src/app/form/actions.ts
7. Create src/components/InterestForm.tsx
8. Update src/app/form/page.tsx
9. Create .env.local.example
