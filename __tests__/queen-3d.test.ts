import { Chess } from '../src/chess'
import { describe, expect, it } from 'vitest'

function setupQueen(queenSquare: string) {
  const chess = new Chess()
  chess.clear()
  chess.put({ type: 'k', color: 'w' }, 'a1a')
  chess.put({ type: 'k', color: 'b' }, 'h8h')
  chess.put({ type: 'q', color: 'w' }, queenSquare as any)
  return chess
}

// moves() returns SAN strings like 'Qe4d', 'Qxf6d', etc.
// Use .some((m) => m.includes(sq)) to locate destination square.
function reachesSquare(moves: string[], sq: string): boolean {
  return moves.some((m) => m.includes(sq))
}

describe('queen 3D moves', () => {
  // -------------------------------------------------------------------------
  // Rook-like directions (6 orthogonal axes)
  // -------------------------------------------------------------------------
  describe('slides along all 3 orthogonal axes (rook directions)', () => {
    it('slides along file axis in both directions', () => {
      const chess = setupQueen('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(reachesSquare(moves, 'e4d')).toBe(true)
      expect(reachesSquare(moves, 'f4d')).toBe(true)
      expect(reachesSquare(moves, 'g4d')).toBe(true)
      expect(reachesSquare(moves, 'h4d')).toBe(true)
      expect(reachesSquare(moves, 'c4d')).toBe(true)
      expect(reachesSquare(moves, 'b4d')).toBe(true)
    })

    it('slides along rank axis in both directions', () => {
      const chess = setupQueen('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(reachesSquare(moves, 'd5d')).toBe(true)
      expect(reachesSquare(moves, 'd6d')).toBe(true)
      expect(reachesSquare(moves, 'd8d')).toBe(true)
      expect(reachesSquare(moves, 'd3d')).toBe(true)
      expect(reachesSquare(moves, 'd2d')).toBe(true)
      expect(reachesSquare(moves, 'd1d')).toBe(true)
    })

    it('slides along layer axis in both directions', () => {
      const chess = setupQueen('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(reachesSquare(moves, 'd4e')).toBe(true)
      expect(reachesSquare(moves, 'd4f')).toBe(true)
      expect(reachesSquare(moves, 'd4g')).toBe(true)
      expect(reachesSquare(moves, 'd4h')).toBe(true)
      expect(reachesSquare(moves, 'd4c')).toBe(true)
      expect(reachesSquare(moves, 'd4b')).toBe(true)
    })
  })

  // -------------------------------------------------------------------------
  // Bishop-like directions (12 diagonal axes)
  // -------------------------------------------------------------------------
  describe('slides along all 3 diagonal planes (bishop directions)', () => {
    it('slides on rank-file plane (±17, ±15)', () => {
      const chess = setupQueen('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      // +17 direction
      expect(reachesSquare(moves, 'e5d')).toBe(true)
      expect(reachesSquare(moves, 'f6d')).toBe(true)
      // -17 direction
      expect(reachesSquare(moves, 'c3d')).toBe(true)
      expect(reachesSquare(moves, 'b2d')).toBe(true)
      // +15 direction
      expect(reachesSquare(moves, 'c5d')).toBe(true)
      expect(reachesSquare(moves, 'b6d')).toBe(true)
      // -15 direction
      expect(reachesSquare(moves, 'e3d')).toBe(true)
      expect(reachesSquare(moves, 'f2d')).toBe(true)
    })

    it('slides on file-layer plane (±257, ±255)', () => {
      const chess = setupQueen('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      // +257 direction
      expect(reachesSquare(moves, 'e4e')).toBe(true)
      expect(reachesSquare(moves, 'f4f')).toBe(true)
      // -257 direction
      expect(reachesSquare(moves, 'c4c')).toBe(true)
      expect(reachesSquare(moves, 'b4b')).toBe(true)
      // +255 direction
      expect(reachesSquare(moves, 'c4e')).toBe(true)
      expect(reachesSquare(moves, 'b4f')).toBe(true)
      // -255 direction
      expect(reachesSquare(moves, 'e4c')).toBe(true)
      expect(reachesSquare(moves, 'f4b')).toBe(true)
    })

    it('slides on rank-layer plane (±272, ±240)', () => {
      const chess = setupQueen('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      // +272 direction
      expect(reachesSquare(moves, 'd5e')).toBe(true)
      expect(reachesSquare(moves, 'd6f')).toBe(true)
      // -272 direction
      expect(reachesSquare(moves, 'd3c')).toBe(true)
      expect(reachesSquare(moves, 'd2b')).toBe(true)
      // +240 direction
      expect(reachesSquare(moves, 'd3e')).toBe(true)
      expect(reachesSquare(moves, 'd2f')).toBe(true)
      // -240 direction
      expect(reachesSquare(moves, 'd5c')).toBe(true)
      expect(reachesSquare(moves, 'd6b')).toBe(true)
    })
  })

  // -------------------------------------------------------------------------
  // Blocking behavior
  // -------------------------------------------------------------------------
  describe('blocking on each axis', () => {
    it('is blocked by a friendly piece along file', () => {
      const chess = setupQueen('d4d')
      chess.put({ type: 'p', color: 'w' }, 'f4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(reachesSquare(moves, 'e4d')).toBe(true)
      expect(reachesSquare(moves, 'f4d')).toBe(false)
      expect(reachesSquare(moves, 'g4d')).toBe(false)
    })

    it('captures an enemy piece along rank', () => {
      const chess = setupQueen('d4d')
      chess.put({ type: 'r', color: 'b' }, 'd6d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(reachesSquare(moves, 'd5d')).toBe(true)
      expect(reachesSquare(moves, 'd6d')).toBe(true) // capture
      expect(reachesSquare(moves, 'd7d')).toBe(false)
    })

    it('is blocked by a friendly piece along layer', () => {
      const chess = setupQueen('d4d')
      chess.put({ type: 'p', color: 'w' }, 'd4f')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(reachesSquare(moves, 'd4e')).toBe(true)
      expect(reachesSquare(moves, 'd4f')).toBe(false)
      expect(reachesSquare(moves, 'd4g')).toBe(false)
    })

    it('is blocked by a friendly piece on rank-file diagonal', () => {
      const chess = setupQueen('d4d')
      chess.put({ type: 'p', color: 'w' }, 'f6d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(reachesSquare(moves, 'e5d')).toBe(true)
      expect(reachesSquare(moves, 'f6d')).toBe(false)
      expect(reachesSquare(moves, 'g7d')).toBe(false)
    })

    it('captures an enemy on file-layer diagonal', () => {
      const chess = setupQueen('d4d')
      chess.put({ type: 'r', color: 'b' }, 'f4f')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(reachesSquare(moves, 'e4e')).toBe(true)
      expect(reachesSquare(moves, 'f4f')).toBe(true) // capture
      expect(reachesSquare(moves, 'g4g')).toBe(false)
    })

    it('is blocked by a friendly piece on rank-layer diagonal', () => {
      const chess = setupQueen('d4d')
      chess.put({ type: 'p', color: 'w' }, 'd6f')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(reachesSquare(moves, 'd5e')).toBe(true)
      expect(reachesSquare(moves, 'd6f')).toBe(false)
      expect(reachesSquare(moves, 'd7g')).toBe(false)
    })
  })

  // -------------------------------------------------------------------------
  // Reachable squares count from center with empty board
  // -------------------------------------------------------------------------
  describe('reachable squares from center', () => {
    it('covers a large number of squares from d4d on an empty board', () => {
      const chess = setupQueen('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      // Queen has 18 directions; from a central square many long slides are possible
      // The actual count depends on board geometry but should be well over 30
      expect(moves.length).toBeGreaterThan(30)
    })

    it('can reach the far corner from a center square', () => {
      const chess = setupQueen('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      // Along file axis: can reach h4d
      expect(reachesSquare(moves, 'h4d')).toBe(true)
      // Along rank axis: can reach d8d
      expect(reachesSquare(moves, 'd8d')).toBe(true)
      // Along layer axis: can reach d4h
      expect(reachesSquare(moves, 'd4h')).toBe(true)
    })
  })
})
