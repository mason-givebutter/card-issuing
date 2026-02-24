# Card Issuing

A polished card issuing flow built with Next.js. Supports virtual and physical card types with distinct interactive experiences for each.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4-teal)

---

## Features

- **Multi-step wizard** — card type selection, details, usage settings, and shipping
- **Live card preview** — real-time card rendering as you fill out the form
- **Virtual card** — holographic card with animated WebGL grid background (Three.js + GLSL)
- **Physical card** — drag, throw, and drop the card with realistic physics; metal clank on landing; auto-returns to center after 3 seconds
- Form validation with Zod + React Hook Form
- Global state via Zustand

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4, shadcn/ui |
| Animation | Framer Motion |
| 3D / WebGL | Three.js, postprocessing |
| Forms | React Hook Form + Zod |
| State | Zustand |
| Icons | Font Awesome, Lucide |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and navigate to `/create` to see the flow.

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Root redirect
│   └── create/page.tsx           # Card issuing flow
├── components/
│   ├── GridScan.tsx              # WebGL animated grid background (virtual card)
│   └── card-issuing/
│       ├── CardPreviewPanel.tsx  # Sticky live preview (sidebar)
│       ├── ModalCardPreview.tsx  # Full-screen card preview modal
│       ├── CardImage.tsx         # Card face renderer with holographic effect
│       ├── AnalogBackground.tsx  # Warm wood/vignette background (physical card)
│       ├── CardTypeModal.tsx     # Card type selection modal
│       ├── CardDetailsForm.tsx   # Main multi-step form
│       ├── CardDetailsSection.tsx
│       ├── CardUsageSection.tsx
│       └── ShippingSection.tsx
├── stores/
│   └── card-issuing-store.ts    # Zustand store
├── lib/
│   ├── validations.ts           # Zod schemas
│   ├── animations.ts            # Shared animation configs
│   └── constants/card-types.ts
└── types/
    ├── card.ts
    └── wizard.ts
```

## Card Physics

The physical card uses a two-layer Framer Motion architecture:

- **Outer layer** — owns drag and physics via `useMotionValue` + imperative `animate()`
- **Inner layer** — owns the virtual float animation via the `animate` prop

**Throw sequence:**
1. Pick up → card lifts 90px, scales to 1.12×
2. Drag → card tilts based on horizontal velocity
3. Release → momentum carry with spring physics
4. Landing → metal thud (stiffness 750, mass 4) + micro-bounce clank sequence
5. After 3s → smoothly returns to center
