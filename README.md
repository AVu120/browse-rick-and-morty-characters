## Notes About Project

- Accessible (entire website can be used with just keyboard e.g. by navigating using tab, enter and esc keys).
- Compliant with device's setting of light or dark mode.
- Performant as possible by moving state as far down the component tree as possible.
- Used as few dependencies as possible. Local storage used as the preferred choice of on-disc state/data persistence.
- Built to be responsive across mobile and design.
- Uses apollo client to query public ricky and morty graphql API (https://rickandmortyapi.com/graphql).
- Chakra-UI v3 used for UI component library.
- NextJS v15 with App Router & TypeScript used.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Run in Production Mode

```bash
npm run build
npm run start
```
