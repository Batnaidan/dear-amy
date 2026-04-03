# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

**Dear Amy** is a personalized birthday gift/date-selection web app. The landing page shows an animated envelope that opens to reveal a letter; clicking through leads to a selection page where the recipient picks gifts and dates, then receives a redeem code. Selections are emailed to the sender via Resend.

## Commands

- `npm run dev` — start Next.js dev server (localhost:3000)
- `npm run build` — production build
- `npm run lint` — ESLint

## Stack

Next.js 16 (App Router), React 19, Framer Motion, Tailwind CSS v4, TypeScript. Email delivery via Resend (`RESEND_API_KEY` and `NOTIFY_EMAIL` env vars required for the notify API route).

## Architecture

Two pages with client-side rendering (components loaded via `next/dynamic` with `ssr: false`):

- **`/`** — Landing page: `LandingScene` (floating background decorations + animated birds) + `Envelope` (3D animated envelope with layered SVG flaps, wax seal, and a letter that slides out on click)
- **`/choose`** — Selection page: `SelectionGrid` manages a multi-stage flow (select gifts → select dates → animated confirmation with redeem code). On final submit, POSTs selections + action log to `/api/notify`.
- **`/api/notify`** — Server route that sends an HTML email with chosen gifts, dates, and a full action log via Resend.

## Theming

Custom color palette and fonts defined in `globals.css` via Tailwind v4 `@theme inline`:
- Colors: `amy-blue`, `amy-purple`, `amy-deep` (primary), `amy-card`, `amy-text`, `amy-pink`
- Fonts: `font-caveat` (handwritten headings), `font-quicksand` (body text)
