import { Chess } from '../src/chess'
import { describe, expect, it } from 'vitest'

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
      expect(moves).toContain('Be5d')
      expect(moves).toContain('Bf6d')
      expect(moves).toContain('Bg7d')
      expect(moves).toContain('Bh8d')
    })

    it('slides in -17 direction (file-, rank-)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Bc3d')
      expect(moves).toContain('Bb2d')
    })

    it('slides in +15 direction (file-, rank+)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Bc5d')
      expect(moves).toContain('Bb6d')
      expect(moves).toContain('Ba7d')
    })

    it('slides in -15 direction (file+, rank-)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Be3d')
      expect(moves).toContain('Bf2d')
      expect(moves).toContain('Bg1d')
    })

    it('is blocked by a friendly piece on the rank-file plane', () => {
      const chess = setupBishop('d4d')
      chess.put({ type: 'p', color: 'w' }, 'f6d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Be5d')
      expect(moves).not.toContain('Bf6d') // blocked
      expect(moves).not.toContain('Bg7d')
    })

    it('captures an enemy piece on the rank-file plane', () => {
      const chess = setupBishop('d4d')
      chess.put({ type: 'r', color: 'b' }, 'f6d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Be5d')
      expect(moves.some((m) => m.includes('f6d'))).toBe(true) // capture
      expect(moves).not.toContain('Bg7d') // blocked beyond capture
    })
  })

  // -------------------------------------------------------------------------
  // File-layer plane: offsets ±257 and ±255
  // -------------------------------------------------------------------------
  describe('slides on file-layer plane', () => {
    it('slides in +257 direction (file+, layer+)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Be4e')
      expect(moves).toContain('Bf4f')
      expect(moves).toContain('Bg4g')
      expect(moves).toContain('Bh4h')
    })

    it('slides in -257 direction (file-, layer-)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Bc4c')
      expect(moves).toContain('Bb4b')
    })

    it('slides in +255 direction (file-, layer+)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Bc4e')
      expect(moves).toContain('Bb4f')
      expect(moves).toContain('Ba4g')
    })

    it('slides in -255 direction (file+, layer-)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Be4c')
      expect(moves).toContain('Bf4b')
      expect(moves).toContain('Bg4a')
    })

    it('is blocked by a friendly piece on the file-layer plane', () => {
      const chess = setupBishop('d4d')
      chess.put({ type: 'p', color: 'w' }, 'f4f')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Be4e')
      expect(moves).not.toContain('Bf4f') // blocked
      expect(moves).not.toContain('Bg4g')
    })

    it('captures an enemy piece on the file-layer plane', () => {
      const chess = setupBishop('d4d')
      chess.put({ type: 'r', color: 'b' }, 'f4f')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Be4e')
      expect(moves.some((m) => m.includes('f4f'))).toBe(true) // capture
      expect(moves).not.toContain('Bg4g') // blocked beyond
    })
  })

  // -------------------------------------------------------------------------
  // Rank-layer plane: offsets ±272 and ±240
  // -------------------------------------------------------------------------
  describe('slides on rank-layer plane', () => {
    it('slides in +272 direction (rank+, layer+)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Bd5e')
      expect(moves).toContain('Bd6f')
      expect(moves).toContain('Bd7g')
      expect(moves).toContain('Bd8h')
    })

    it('slides in -272 direction (rank-, layer-)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Bd3c')
      expect(moves).toContain('Bd2b')
    })

    it('slides in +240 direction (rank-, layer+)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Bd3e')
      expect(moves).toContain('Bd2f')
      expect(moves).toContain('Bd1g')
    })

    it('slides in -240 direction (rank+, layer-)', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Bd5c')
      expect(moves).toContain('Bd6b')
      expect(moves).toContain('Bd7a')
    })

    it('is blocked by a friendly piece on the rank-layer plane', () => {
      const chess = setupBishop('d4d')
      chess.put({ type: 'p', color: 'w' }, 'd6f')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Bd5e')
      expect(moves).not.toContain('Bd6f') // blocked
      expect(moves).not.toContain('Bd7g')
    })

    it('captures an enemy piece on the rank-layer plane', () => {
      const chess = setupBishop('d4d')
      chess.put({ type: 'r', color: 'b' }, 'd6f')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Bd5e')
      expect(moves.some((m) => m.includes('d6f'))).toBe(true) // capture
      expect(moves).not.toContain('Bd7g') // blocked beyond
    })
  })

  // -------------------------------------------------------------------------
  // Bishop cannot slide along pure orthogonal directions
  // -------------------------------------------------------------------------
  describe('bishop does not slide along orthogonal axes', () => {
    it('cannot reach squares that are pure file-moves away', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).not.toContain('Be4d')
      expect(moves).not.toContain('Bf4d')
    })

    it('cannot reach squares that are pure rank-moves away', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).not.toContain('Bd5d')
      expect(moves).not.toContain('Bd6d')
    })

    it('cannot reach squares that are pure layer-moves away', () => {
      const chess = setupBishop('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).not.toContain('Bd4e')
      expect(moves).not.toContain('Bd4f')
    })
  })
})
