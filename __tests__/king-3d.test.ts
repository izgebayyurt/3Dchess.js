import { Chess } from '../src/chess'
import { describe, expect, it } from 'vitest'

function setupKing(whiteKingSquare: string, blackKingSquare: string) {
  const chess = new Chess()
  chess.clear()
  chess.put({ type: 'k', color: 'w' }, whiteKingSquare as any)
  chess.put({ type: 'k', color: 'b' }, blackKingSquare as any)
  return chess
}

// moves() returns SAN strings like 'Ke5d', 'Kxf6d', etc.
// Use .some((m) => m.includes(sq)) to locate destination square.
function reachesSquare(moves: string[], sq: string): boolean {
  return moves.some((m) => m.includes(sq))
}

describe('king 3D moves', () => {
  // -------------------------------------------------------------------------
  // King moves one step in 18 directions (6 orthogonal + 12 diagonal)
  // -------------------------------------------------------------------------
  describe('one-step orthogonal moves (6 rook directions)', () => {
    it('moves +1 file', () => {
      const chess = setupKing('d4d', 'h8h')
      expect(reachesSquare(chess.moves({ square: 'd4d' as any }), 'e4d')).toBe(true)
    })

    it('moves -1 file', () => {
      const chess = setupKing('d4d', 'h8h')
      expect(reachesSquare(chess.moves({ square: 'd4d' as any }), 'c4d')).toBe(true)
    })

    it('moves +1 rank', () => {
      const chess = setupKing('d4d', 'h8h')
      expect(reachesSquare(chess.moves({ square: 'd4d' as any }), 'd5d')).toBe(true)
    })

    it('moves -1 rank', () => {
      const chess = setupKing('d4d', 'h8h')
      expect(reachesSquare(chess.moves({ square: 'd4d' as any }), 'd3d')).toBe(true)
    })

    it('moves +1 layer', () => {
      const chess = setupKing('d4d', 'h8h')
      expect(reachesSquare(chess.moves({ square: 'd4d' as any }), 'd4e')).toBe(true)
    })

    it('moves -1 layer', () => {
      const chess = setupKing('d4d', 'h8h')
      expect(reachesSquare(chess.moves({ square: 'd4d' as any }), 'd4c')).toBe(true)
    })
  })

  describe('one-step diagonal moves (12 bishop directions)', () => {
    it('moves on rank-file plane diagonal (+17: +file +rank)', () => {
      const chess = setupKing('d4d', 'h8h')
      expect(reachesSquare(chess.moves({ square: 'd4d' as any }), 'e5d')).toBe(true)
    })

    it('moves on rank-file plane diagonal (-17: -file -rank)', () => {
      const chess = setupKing('d4d', 'h8h')
      expect(reachesSquare(chess.moves({ square: 'd4d' as any }), 'c3d')).toBe(true)
    })

    it('moves on rank-file plane diagonal (+15: -file +rank)', () => {
      const chess = setupKing('d4d', 'h8h')
      expect(reachesSquare(chess.moves({ square: 'd4d' as any }), 'c5d')).toBe(true)
    })

    it('moves on rank-file plane diagonal (-15: +file -rank)', () => {
      const chess = setupKing('d4d', 'h8h')
      expect(reachesSquare(chess.moves({ square: 'd4d' as any }), 'e3d')).toBe(true)
    })

    it('moves on file-layer plane diagonal (+257: +file +layer)', () => {
      const chess = setupKing('d4d', 'h8h')
      expect(reachesSquare(chess.moves({ square: 'd4d' as any }), 'e4e')).toBe(true)
    })

    it('moves on file-layer plane diagonal (-257: -file -layer)', () => {
      const chess = setupKing('d4d', 'h8h')
      expect(reachesSquare(chess.moves({ square: 'd4d' as any }), 'c4c')).toBe(true)
    })

    it('moves on file-layer plane diagonal (+255: -file +layer)', () => {
      const chess = setupKing('d4d', 'h8h')
      expect(reachesSquare(chess.moves({ square: 'd4d' as any }), 'c4e')).toBe(true)
    })

    it('moves on file-layer plane diagonal (-255: +file -layer)', () => {
      const chess = setupKing('d4d', 'h8h')
      expect(reachesSquare(chess.moves({ square: 'd4d' as any }), 'e4c')).toBe(true)
    })

    it('moves on rank-layer plane diagonal (+272: +rank +layer)', () => {
      const chess = setupKing('d4d', 'h8h')
      expect(reachesSquare(chess.moves({ square: 'd4d' as any }), 'd5e')).toBe(true)
    })

    it('moves on rank-layer plane diagonal (-272: -rank -layer)', () => {
      const chess = setupKing('d4d', 'h8h')
      expect(reachesSquare(chess.moves({ square: 'd4d' as any }), 'd3c')).toBe(true)
    })

    it('moves on rank-layer plane diagonal (+240: -rank +layer)', () => {
      const chess = setupKing('d4d', 'h8h')
      expect(reachesSquare(chess.moves({ square: 'd4d' as any }), 'd3e')).toBe(true)
    })

    it('moves on rank-layer plane diagonal (-240: +rank -layer)', () => {
      const chess = setupKing('d4d', 'h8h')
      expect(reachesSquare(chess.moves({ square: 'd4d' as any }), 'd5c')).toBe(true)
    })
  })

  // -------------------------------------------------------------------------
  // King from center: should have up to 18 legal moves (ignoring check)
  // -------------------------------------------------------------------------
  describe('move count from center square', () => {
    it('can reach up to 18 squares from a fully-central position', () => {
      const chess = setupKing('d4d', 'h8h')
      const moves = chess.moves({ square: 'd4d' as any })
      // All 18 directions available from d4d (far from other king and board edges)
      expect(moves.length).toBe(18)
    })
  })

  // -------------------------------------------------------------------------
  // King from a corner: fewer moves
  // -------------------------------------------------------------------------
  describe('move count from a corner square', () => {
    it('has fewer moves from the a1a corner', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a')
      chess.put({ type: 'k', color: 'b' }, 'h8h')
      const moves = chess.moves({ square: 'a1a' as any })
      // From a corner: limited by board boundaries on 3 axes
      expect(moves.length).toBeLessThan(18)
      expect(moves.length).toBeGreaterThan(0)
    })

    it('can reach b1a from a1a (file+1)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a')
      chess.put({ type: 'k', color: 'b' }, 'h8h')
      expect(reachesSquare(chess.moves({ square: 'a1a' as any }), 'b1a')).toBe(true)
    })

    it('can reach a2a from a1a (rank+1)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a')
      chess.put({ type: 'k', color: 'b' }, 'h8h')
      expect(reachesSquare(chess.moves({ square: 'a1a' as any }), 'a2a')).toBe(true)
    })

    it('can reach a1b from a1a (layer+1)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a')
      chess.put({ type: 'k', color: 'b' }, 'h8h')
      expect(reachesSquare(chess.moves({ square: 'a1a' as any }), 'a1b')).toBe(true)
    })
  })

  // -------------------------------------------------------------------------
  // King does NOT reach body-diagonal squares (8 3D-diagonal corners omitted)
  // -------------------------------------------------------------------------
  describe('king does NOT move in body-diagonal direction (+/-file +/-rank +/-layer simultaneously)', () => {
    it('cannot reach a 3D body-diagonal square (+file +rank +layer from d4d)', () => {
      const chess = setupKing('d4d', 'h8h')
      const moves = chess.moves({ square: 'd4d' as any })
      // Body diagonal: +1 file +1 rank +1 layer = e5e
      expect(reachesSquare(moves, 'e5e')).toBe(false)
    })

    it('cannot reach body diagonal -file -rank -layer from d4d', () => {
      const chess = setupKing('d4d', 'h8h')
      const moves = chess.moves({ square: 'd4d' as any })
      // c3c
      expect(reachesSquare(moves, 'c3c')).toBe(false)
    })

    it('cannot reach body diagonal +file -rank +layer from d4d', () => {
      const chess = setupKing('d4d', 'h8h')
      const moves = chess.moves({ square: 'd4d' as any })
      // e3e
      expect(reachesSquare(moves, 'e3e')).toBe(false)
    })

    it('cannot reach body diagonal -file +rank +layer from d4d', () => {
      const chess = setupKing('d4d', 'h8h')
      const moves = chess.moves({ square: 'd4d' as any })
      // c5e
      expect(reachesSquare(moves, 'c5e')).toBe(false)
    })

    it('cannot reach body diagonal +file +rank -layer from d4d', () => {
      const chess = setupKing('d4d', 'h8h')
      const moves = chess.moves({ square: 'd4d' as any })
      // e5c
      expect(reachesSquare(moves, 'e5c')).toBe(false)
    })

    it('cannot reach body diagonal -file -rank +layer from d4d', () => {
      const chess = setupKing('d4d', 'h8h')
      const moves = chess.moves({ square: 'd4d' as any })
      // c3e
      expect(reachesSquare(moves, 'c3e')).toBe(false)
    })

    it('cannot reach body diagonal +file -rank -layer from d4d', () => {
      const chess = setupKing('d4d', 'h8h')
      const moves = chess.moves({ square: 'd4d' as any })
      // e3c
      expect(reachesSquare(moves, 'e3c')).toBe(false)
    })

    it('cannot reach body diagonal -file +rank -layer from d4d', () => {
      const chess = setupKing('d4d', 'h8h')
      const moves = chess.moves({ square: 'd4d' as any })
      // c5c
      expect(reachesSquare(moves, 'c5c')).toBe(false)
    })
  })

  // -------------------------------------------------------------------------
  // King cannot move into check
  // -------------------------------------------------------------------------
  describe('king cannot move into check', () => {
    it('cannot step onto a square attacked by enemy rook along layer', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'd4d')
      chess.put({ type: 'k', color: 'b' }, 'h8h')
      // Enemy rook at d4h controls the entire d4 layer column; d4e is attacked
      chess.put({ type: 'r', color: 'b' }, 'd4h')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(reachesSquare(moves, 'd4e')).toBe(false)
    })

    it('cannot step onto a square attacked by enemy queen on rank-file diagonal', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'd4d')
      chess.put({ type: 'k', color: 'b' }, 'h8h')
      // Enemy queen at f6d attacks e5d diagonally
      chess.put({ type: 'q', color: 'b' }, 'f6d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(reachesSquare(moves, 'e5d')).toBe(false)
    })
  })
})
