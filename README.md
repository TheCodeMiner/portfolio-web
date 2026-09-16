# Portfolio Web

Frontend for the Samer software-engineering portfolio.

## Stack

- React 19
- TypeScript 7
- Vite
- Oxlint
- Prettier

## Development

```bash
npm install
npm run dev
```

## Commands

```bash
npm run dev
npm run build
npm run preview
npm run typecheck
npm run lint
npm run format:check
```

## Architecture

The frontend is an independent application.

Portfolio case studies will be content-driven so new projects can be added without creating dedicated React pages for each one.

Shared API contracts are provided by `@thecodeminer/portfolio-contracts`.

The frontend communicates with backend functionality only through the Portfolio API.
