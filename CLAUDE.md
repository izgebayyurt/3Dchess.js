# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A fork of [chess.js](https://github.com/jhlywa/chess.js) extended to support 3D chess on an 8×8×8 board. It is a TypeScript library for move generation/validation, piece placement, and game-state detection — no AI. Published to npm as `chess.js`.

## Commands

```bash
npm install          # install dependencies
npm run parser       # regenerate src/pgn.js from src/pgn.peggy (required before first build)
npm run build        # parser + type-check + rollup bundle
npm test             # run all tests with vitest (watch mode)
npx vitest run       # run all tests once
npx vitest run __tests__/move.test.ts   # run a single test file
npm run lint         # eslint src/
npm run format       # prettier --write .
npm run check        # full pre-submit check: format + lint + tests + build + api-extractor
npm run api:update   # update etc/chess.js.api.md after intentional public API changes
npm run bench        # run benchmarks (tsx benchmarks/bench.ts)
```

`npm run check` is the gate for any PR — run it and confirm it passes before pushing.

## Architecture

### Source files

The entire library lives in two files:

- **`src/chess.ts`** — Everything: types, constants, Zobrist hashing, `validateFen`, the `Move` class, and the main `Chess` class (~3070 lines).
- **`src/node.ts`** — The `Node` type used by the PGN tree.
- **`src/pgn.peggy`** — PGN grammar. Compiled by `npm run parser` (via [peggy](https://peggyjs.org/)) into `src/pgn.js` (gitignored). `chess.ts` imports from `./pgn`.

### Build outputs (`dist/`)

Rollup (`rollup.config.mjs`) produces three targets from `src/chess.ts`:
- `dist/cjs/chess.js` — CommonJS
- `dist/esm/chess.js` — ES module
- `dist/types/chess.d.ts` — bundled TypeScript declarations

### 3D board representation

Squares use a **3-character algebraic notation**: `{file}{rank}{layer}` — e.g., `a1a`, `h8h`. File is `a–h`, rank is `1–8`, layer is `a–h` (a = bottom, h = top).

Internally the board uses an extended **0x888 algorithm**. The 8×8×8 board is stored in a 1024-element array indexed as:

```
index = file + rank * 16 + layer * 256
```

Off-board detection: `index & 0x888` is non-zero for invalid squares (the original 0x88 trick, extended with `0x800` for the layer dimension). The `Ox888` map converts `Square` strings to indices.

Piece movement offsets in `PIECE_OFFSETS` cover three orthogonal planes:
- file-rank plane (classic 0x88 offsets, stride 1/16)
- file-layer plane (stride 256)
- rank-layer plane (stride 16/256)

### 3D FEN format

Standard 8-row 2D FEN is accepted and mapped to layer `a`. Full 3D FEN has **64 rows** (8 layers × 8 ranks each, separated by `/`). The shorthand `64` in a FEN row expands to eight empty rows. En-passant squares use the 3-character square notation.

`DEFAULT_POSITION` contains the 3D starting position FEN with pieces on layers `a` (white) and `h` (black).

### Pawn promotion

Promotion fires when a pawn reaches:
- **rank 8** or **layer h** (white)
- **rank 1** or **layer a** (black)

### Public API tracking

`etc/chess.js.api.md` is the snapshot of the public API tracked by `@microsoft/api-extractor`. Run `npm run api:check` to detect changes and `npm run api:update` to accept them. This file must be committed alongside any intentional API changes.

### Documentation

Lives in `website/` (Docusaurus). Edit `website/docs/index.md` for the current version. The site uses MDX — outside code blocks, curly braces and angle brackets must be escaped with a backslash.
