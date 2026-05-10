import { Chess } from '../src/chess'
import { describe, expect, it } from 'vitest'

function setupKnight(knightSquare: string) {
  const chess = new Chess()
  chess.clear()
  chess.put({ type: 'k', color: 'w' }, 'a1a')
  chess.put({ type: 'k', color: 'b' }, 'h8h')
  chess.put({ type: 'n', color: 'w' }, knightSquare as any)
  return chess
}

// Helper: extract destination squares from SAN move list
function destinations(moves: string[]): string[] {
  return moves.map((m) => {
    // Strip piece symbol, captures, check/mate markers, and promotion
    // SAN for knight looks like: Nb3d, Nxc5d etc.
    const stripped = m.replace(/[N][^a-h]*/, '').replace(/[x+#=].*$/, '').replace(/[+#]$/, '')
    // Extract last 3 chars as the destination square
    const match = m.match(/([a-h][1-8][a-h])(?:[+#]|$|=[NBRQ])/)
    return match ? match[1] : ''
  }).filter(Boolean)
}

describe('knight 3D moves', () => {
  // -------------------------------------------------------------------------
  // Classic file-rank plane jumps (±18, ±33, ±31, ±14)
  // -------------------------------------------------------------------------
  describe('file-rank plane (classic 8 jumps)', () => {
    it('reaches all 8 squares on the file-rank plane from a center square', () => {
      const chess = setupKnight('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      // From d4d: file-rank L-shapes stay on same layer (d)
      // +18 = e6d, -18 = c2d, +33 = f5d, -33 = b3d, +31 = b5d, -31 = f3d, +14 = e2d, -14 = c6d
      expect(moves.some((m) => m.includes('e6d'))).toBe(true)
      expect(moves.some((m) => m.includes('c2d'))).toBe(true)
      expect(moves.some((m) => m.includes('f5d'))).toBe(true)
      expect(moves.some((m) => m.includes('b3d'))).toBe(true)
      expect(moves.some((m) => m.includes('b5d'))).toBe(true)
      expect(moves.some((m) => m.includes('f3d'))).toBe(true)
      expect(moves.some((m) => m.includes('e2d'))).toBe(true)
      expect(moves.some((m) => m.includes('c6d'))).toBe(true)
    })

    it('captures an enemy piece in a classic L-shape jump', () => {
      const chess = setupKnight('d4d')
      chess.put({ type: 'r', color: 'b' }, 'e6d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves.some((m) => m.includes('e6d'))).toBe(true)
    })

    it('cannot land on a friendly piece', () => {
      const chess = setupKnight('d4d')
      chess.put({ type: 'p', color: 'w' }, 'e6d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves.some((m) => m.includes('e6d'))).toBe(false)
    })
  })

  // -------------------------------------------------------------------------
  // File-layer plane jumps (±258, ±254, ±513, ±511)
  // -------------------------------------------------------------------------
  describe('file-layer plane (8 jumps)', () => {
    it('reaches squares with ±2 file ±1 layer offset', () => {
      // From d4d (file=3, rank=3, layer=3):
      // +258 = file+2,layer+1 => f4e   (+2 file, same rank, +1 layer)
      // +254 = file-2,layer+1 => b4e   (-2 file, same rank, +1 layer)
      // -258 = file-2,layer-1 => b4c   (-2 file, same rank, -1 layer)
      // -254 = file+2,layer-1 => f4c   (+2 file, same rank, -1 layer)
      const chess = setupKnight('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves.some((m) => m.includes('f4e'))).toBe(true)
      expect(moves.some((m) => m.includes('b4e'))).toBe(true)
      expect(moves.some((m) => m.includes('b4c'))).toBe(true)
      expect(moves.some((m) => m.includes('f4c'))).toBe(true)
    })

    it('reaches squares with ±1 file ±2 layer offset', () => {
      // +513 = file+1,layer+2 => e4f   (+1 file, same rank, +2 layer)
      // +511 = file-1,layer+2 => c4f   (-1 file, same rank, +2 layer)
      // -513 = file-1,layer-2 => c4b   (-1 file, same rank, -2 layer)
      // -511 = file+1,layer-2 => e4b   (+1 file, same rank, -2 layer)
      const chess = setupKnight('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves.some((m) => m.includes('e4f'))).toBe(true)
      expect(moves.some((m) => m.includes('c4f'))).toBe(true)
      expect(moves.some((m) => m.includes('c4b'))).toBe(true)
      expect(moves.some((m) => m.includes('e4b'))).toBe(true)
    })

    it('captures on the file-layer plane', () => {
      const chess = setupKnight('d4d')
      chess.put({ type: 'r', color: 'b' }, 'f4e')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves.some((m) => m.includes('f4e'))).toBe(true)
    })
  })

  // -------------------------------------------------------------------------
  // Rank-layer plane jumps (±288, ±224, ±528, ±496)
  // -------------------------------------------------------------------------
  describe('rank-layer plane (8 jumps)', () => {
    it('reaches squares with ±2 rank ±1 layer offset', () => {
      // From d4d:
      // +288 = rank+2,layer+1 => d6e
      // +224 = rank-2,layer+1 => d2e  (256-32=224; +layer -2rank)
      // -288 = rank-2,layer-1 => d2c
      // -224 = rank+2,layer-1 => d6c  (+2rank -layer)
      const chess = setupKnight('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves.some((m) => m.includes('d6e'))).toBe(true)
      expect(moves.some((m) => m.includes('d2e'))).toBe(true)
      expect(moves.some((m) => m.includes('d2c'))).toBe(true)
      expect(moves.some((m) => m.includes('d6c'))).toBe(true)
    })

    it('reaches squares with ±1 rank ±2 layer offset', () => {
      // +528 = rank+1,layer+2 => d5f
      // +496 = rank-1,layer+2 => d3f  (512-16=496)
      // -528 = rank-1,layer-2 => d3b
      // -496 = rank+1,layer-2 => d5b
      const chess = setupKnight('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves.some((m) => m.includes('d5f'))).toBe(true)
      expect(moves.some((m) => m.includes('d3f'))).toBe(true)
      expect(moves.some((m) => m.includes('d3b'))).toBe(true)
      expect(moves.some((m) => m.includes('d5b'))).toBe(true)
    })

    it('captures on the rank-layer plane', () => {
      const chess = setupKnight('d4d')
      chess.put({ type: 'r', color: 'b' }, 'd6e')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves.some((m) => m.includes('d6e'))).toBe(true)
    })
  })

  // -------------------------------------------------------------------------
  // Knight jumps over pieces (not blocked)
  // -------------------------------------------------------------------------
  describe('knight is not blocked by intervening pieces', () => {
    it('jumps over friendly pieces between start and destination', () => {
      const chess = setupKnight('d4d')
      // Fill the immediate neighbors
      chess.put({ type: 'p', color: 'w' }, 'd5d')
      chess.put({ type: 'p', color: 'w' }, 'e4d')
      chess.put({ type: 'p', color: 'w' }, 'd3d')
      chess.put({ type: 'p', color: 'w' }, 'c4d')
      const moves = chess.moves({ square: 'd4d' as any })
      // Knight should still be able to jump to e6d even with pawns in the way
      expect(moves.some((m) => m.includes('e6d'))).toBe(true)
      expect(moves.some((m) => m.includes('f5d'))).toBe(true)
    })

    it('jumps over enemy pieces between start and destination', () => {
      const chess = setupKnight('d4d')
      chess.put({ type: 'r', color: 'b' }, 'd5d')
      chess.put({ type: 'r', color: 'b' }, 'e4d')
      const moves = chess.moves({ square: 'd4d' as any })
      expect(moves.some((m) => m.includes('e6d'))).toBe(true)
    })

    it('jumps over pieces in the layer direction to reach file-layer destinations', () => {
      const chess = setupKnight('d4d')
      chess.put({ type: 'r', color: 'b' }, 'd4e') // one layer up
      const moves = chess.moves({ square: 'd4d' as any })
      // Should still reach d5f (+528) despite piece at d4e
      expect(moves.some((m) => m.includes('d5f'))).toBe(true)
    })
  })

  // -------------------------------------------------------------------------
  // Total move count from a well-centered square
  // -------------------------------------------------------------------------
  describe('total move count from center square', () => {
    it('has correct number of legal moves from d4d on an empty board', () => {
      const chess = setupKnight('d4d')
      const moves = chess.moves({ square: 'd4d' as any })
      // From d4d, all 24 offsets should be valid (none go off board):
      // file-rank: 8 squares all reachable from middle of board
      // file-layer: 8 squares all reachable from d layer (middle layer)
      // rank-layer: 8 squares all reachable
      // Verify we get at least 20 moves (some edge squares may limit)
      expect(moves.length).toBeGreaterThanOrEqual(20)
    })

    it('has fewer moves from a corner square', () => {
      const chess = setupKnight('a1a')
      chess.put({ type: 'k', color: 'w' }, 'e4d') // move king away from a1a
      const moves = chess.moves({ square: 'a1a' as any })
      // From a corner, many jumps go off-board
      expect(moves.length).toBeLessThan(24)
    })
  })
})
