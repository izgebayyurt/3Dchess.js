import { Chess } from '../src/chess'
import { describe, expect, it } from 'vitest'

function setupRook(rookSquare: string) {
  const chess = new Chess()
  chess.clear()
  chess.put({ type: 'k', color: 'w' }, 'a1a')
  chess.put({ type: 'k', color: 'b' }, 'h8h')
  chess.put({ type: 'r', color: 'w' }, rookSquare as any)
  return chess
}

describe('rook 3D moves', () => {
  // -------------------------------------------------------------------------
  // Along the file axis (±1)
  // -------------------------------------------------------------------------
  describe('slides along file axis', () => {
    it('slides to higher files', () => {
      const chess = setupRook('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Re4d')
      expect(moves).toContain('Rf4d')
      expect(moves).toContain('Rg4d')
      expect(moves).toContain('Rh4d')
    })

    it('slides to lower files', () => {
      const chess = setupRook('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Rc4d')
      expect(moves).toContain('Rb4d')
    })

    it('is blocked by a friendly piece along file', () => {
      const chess = setupRook('d4d')
      chess.put({ type: 'p', color: 'w' }, 'f4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Re4d')
      expect(moves).not.toContain('Rf4d') // blocked
      expect(moves).not.toContain('Rg4d')
    })

    it('captures an enemy piece along file', () => {
      const chess = setupRook('d4d')
      chess.put({ type: 'p', color: 'b' }, 'f4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Re4d')
      expect(moves.some((m) => m.includes('f4d'))).toBe(true) // capture
      expect(moves).not.toContain('Rg4d')
    })
  })

  // -------------------------------------------------------------------------
  // Along the rank axis (±16)
  // -------------------------------------------------------------------------
  describe('slides along rank axis', () => {
    it('slides to higher ranks', () => {
      const chess = setupRook('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Rd5d')
      expect(moves).toContain('Rd6d')
      expect(moves).toContain('Rd7d')
      expect(moves).toContain('Rd8d')
    })

    it('slides to lower ranks', () => {
      const chess = setupRook('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Rd3d')
      expect(moves).toContain('Rd2d')
      expect(moves).toContain('Rd1d')
    })

    it('is blocked by a friendly piece along rank', () => {
      const chess = setupRook('d4d')
      chess.put({ type: 'p', color: 'w' }, 'd6d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Rd5d')
      expect(moves).not.toContain('Rd6d')
      expect(moves).not.toContain('Rd7d')
    })

    it('captures an enemy piece along rank', () => {
      const chess = setupRook('d4d')
      chess.put({ type: 'p', color: 'b' }, 'd6d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Rd5d')
      expect(moves.some((m) => m.includes('d6d'))).toBe(true)
      expect(moves).not.toContain('Rd7d')
    })
  })

  // -------------------------------------------------------------------------
  // Along the layer axis (±256) — new 3D axis
  // -------------------------------------------------------------------------
  describe('slides along layer axis', () => {
    it('slides to higher layers', () => {
      const chess = setupRook('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Rd4e')
      expect(moves).toContain('Rd4f')
      expect(moves).toContain('Rd4g')
      expect(moves).toContain('Rd4h')
    })

    it('slides to lower layers', () => {
      const chess = setupRook('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Rd4c')
      expect(moves).toContain('Rd4b')
      expect(moves).toContain('Rd4a')
    })

    it('is blocked by a friendly piece along layer', () => {
      const chess = setupRook('d4d')
      chess.put({ type: 'p', color: 'w' }, 'd4f')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Rd4e')
      expect(moves).not.toContain('Rd4f')
      expect(moves).not.toContain('Rd4g')
    })

    it('captures an enemy piece along layer', () => {
      const chess = setupRook('d4d')
      chess.put({ type: 'p', color: 'b' }, 'd4f')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves).toContain('Rd4e')
      expect(moves.some((m) => m.includes('d4f'))).toBe(true) // capture
      expect(moves).not.toContain('Rd4g')
    })

    it('can traverse all 8 layers when path is clear', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a')
      chess.put({ type: 'k', color: 'b' }, 'h8h')
      chess.put({ type: 'r', color: 'w' }, 'd4a')
      const moves = chess.moves({ square: 'd4a' as any })
      expect(moves).toContain('Rd4b')
      expect(moves).toContain('Rd4c')
      expect(moves).toContain('Rd4d')
      expect(moves).toContain('Rd4e')
      expect(moves).toContain('Rd4f')
      expect(moves).toContain('Rd4g')
      expect(moves).toContain('Rd4h')
    })
  })

  // -------------------------------------------------------------------------
  // Rook does NOT move diagonally
  // -------------------------------------------------------------------------
  describe('rook does not move diagonally', () => {
    it('cannot reach diagonal squares on any plane', () => {
      const chess = setupRook('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      // rank-file diagonal
      expect(moves).not.toContain('Re5d')
      expect(moves).not.toContain('Rc3d')
      // file-layer diagonal
      expect(moves).not.toContain('Re4e')
      expect(moves).not.toContain('Rc4c')
      // rank-layer diagonal
      expect(moves).not.toContain('Rd5e')
      expect(moves).not.toContain('Rd3c')
    })
  })
})
