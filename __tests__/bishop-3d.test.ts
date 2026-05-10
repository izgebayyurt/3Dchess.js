import { Chess } from '../src/chess'
import { describe, expect, it } from 'vitest'

// Helper: set up minimal position with two kings far apart and a white bishop
function setupBishop(bishopSquare: string) {
  const chess = new Chess()
  chess.clear()
  chess.put({ type: 'k', color: 'w' }, 'a1a')
  chess.put({ type: 'k', color: 'b' }, 'h8h')
  chess.put({ type: 'b', color: 'w' }, bishopSquare as any)
  return chess
}

describe('bishop 3D moves', () => {
  // -------------------------------------------------------------------------
  // Rank-file plane: offsets ±17 and ±15 (classic 2D diagonals)
  // -------------------------------------------------------------------------
  describe('slides on rank-file plane', () => {
    it('slides in +17 direction (file+, rank+)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('e5d')
      expect(moves).toContain('f6d')
      expect(moves).toContain('g7d')
      expect(moves).toContain('h8d')
    })

    it('slides in -17 direction (file-, rank-)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('c3d')
      expect(moves).toContain('b2d')
    })

    it('slides in +15 direction (file-, rank+)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('c5d')
      expect(moves).toContain('b6d')
      expect(moves).toContain('a7d')
    })

    it('slides in -15 direction (file+, rank-)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('e3d')
      expect(moves).toContain('f2d')
      expect(moves).toContain('g1d')
    })

    it('is blocked by a friendly piece on the rank-file plane', () => {
      const chess = setupBishop('d4d')
      chess.put({ type: 'p', color: 'w' }, 'f6d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('e5d')
      expect(moves).not.toContain('f6d') // blocked
      expect(moves).not.toContain('g7d')
    })

    it('captures an enemy piece on the rank-file plane', () => {
      const chess = setupBishop('d4d')
      chess.put({ type: 'r', color: 'b' }, 'f6d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('e5d')
      expect(moves.some((m) => m.includes('f6d'))).toBe(true) // capture
      expect(moves).not.toContain('g7d') // blocked beyond capture
    })
  })

  // -------------------------------------------------------------------------
  // File-layer plane: offsets ±257 and ±255
  // -------------------------------------------------------------------------
  describe('slides on file-layer plane', () => {
    it('slides in +257 direction (file+, layer+)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('e4e')
      expect(moves).toContain('f4f')
      expect(moves).toContain('g4g')
      expect(moves).toContain('h4h')
    })

    it('slides in -257 direction (file-, layer-)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('c4c')
      expect(moves).toContain('b4b')
    })

    it('slides in +255 direction (file-, layer+)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('c4e')
      expect(moves).toContain('b4f')
      expect(moves).toContain('a4g')
    })

    it('slides in -255 direction (file+, layer-)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('e4c')
      expect(moves).toContain('f4b')
      expect(moves).toContain('g4a')
    })

    it('is blocked by a friendly piece on the file-layer plane', () => {
      const chess = setupBishop('d4d')
      chess.put({ type: 'p', color: 'w' }, 'f4f')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('e4e')
      expect(moves).not.toContain('f4f') // blocked
      expect(moves).not.toContain('g4g')
    })

    it('captures an enemy piece on the file-layer plane', () => {
      const chess = setupBishop('d4d')
      chess.put({ type: 'r', color: 'b' }, 'f4f')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('e4e')
      expect(moves.some((m) => m.includes('f4f'))).toBe(true) // capture
      expect(moves).not.toContain('g4g') // blocked beyond
    })
  })

  // -------------------------------------------------------------------------
  // Rank-layer plane: offsets ±272 and ±240
  // -------------------------------------------------------------------------
  describe('slides on rank-layer plane', () => {
    it('slides in +272 direction (rank+, layer+)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('d5e')
      expect(moves).toContain('d6f')
      expect(moves).toContain('d7g')
      expect(moves).toContain('d8h')
    })

    it('slides in -272 direction (rank-, layer-)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('d3c')
      expect(moves).toContain('d2b')
    })

    it('slides in +240 direction (rank-, layer+)', () => {
      // 240 = 256 - 16 = +layer -rank
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('d3e')
      expect(moves).toContain('d2f')
      expect(moves).toContain('d1g')
    })

    it('slides in -240 direction (rank+, layer-)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('d5c')
      expect(moves).toContain('d6b')
      expect(moves).toContain('d7a')
    })

    it('is blocked by a friendly piece on the rank-layer plane', () => {
      const chess = setupBishop('d4d')
      chess.put({ type: 'p', color: 'w' }, 'd6f')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('d5e')
      expect(moves).not.toContain('d6f') // blocked
      expect(moves).not.toContain('d7g')
    })

    it('captures an enemy piece on the rank-layer plane', () => {
      const chess = setupBishop('d4d')
      chess.put({ type: 'r', color: 'b' }, 'd6f')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('d5e')
      expect(moves.some((m) => m.includes('d6f'))).toBe(true) // capture
      expect(moves).not.toContain('d7g') // blocked beyond
    })
  })

  // -------------------------------------------------------------------------
  // Bishop cannot slide along pure orthogonal directions
  // -------------------------------------------------------------------------
  describe('bishop does not slide along orthogonal axes', () => {
    it('cannot reach squares that are pure file-moves away', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      // e4d, f4d, g4d etc are pure file moves — bishop should not reach them
      expect(moves).not.toContain('e4d')
      expect(moves).not.toContain('f4d')
    })

    it('cannot reach squares that are pure rank-moves away', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).not.toContain('d5d')
      expect(moves).not.toContain('d6d')
    })

    it('cannot reach squares that are pure layer-moves away', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).not.toContain('d4e')
      expect(moves).not.toContain('d4f')
    })
  })
})
