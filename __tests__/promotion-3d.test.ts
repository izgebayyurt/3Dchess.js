import { Chess } from '../src/chess'
import { describe, expect, it } from 'vitest'

// Verify that all 4 promotion types appear in the move list for a given destination
function hasAllPromotions(moves: string[], destSquare: string): boolean {
  const promos = ['n', 'b', 'r', 'q']
  return promos.every((p) =>
    moves.some((m) => m.toLowerCase().includes(destSquare) && m.toLowerCase().includes(p)),
  )
}

describe('promotion 3D', () => {
  // -------------------------------------------------------------------------
  // White promotes at rank 8 (any layer)
  // -------------------------------------------------------------------------
  describe('white pawn promotes at rank 8', () => {
    it('promotes to all 4 piece types via forward move to rank 8 (layer d)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'w' }, 'e7d')
      const moves = chess.moves({ square: 'e7d' as any })
      expect(moves.some((m) => m.toLowerCase().includes('e8d') && m.includes('=N'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('e8d') && m.includes('=B'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('e8d') && m.includes('=R'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('e8d') && m.includes('=Q'))).toBe(true)
    })

    it('generates exactly 4 moves when pawn is on e7d with clear path', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'w' }, 'e7d')
      const moves = chess.moves({ square: 'e7d' as any })
      const toRank8 = moves.filter((m) => m.toLowerCase().includes('e8d'))
      expect(toRank8.length).toBe(4)
    })

    it('promotes via rank 8 at a different layer (layer b)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'h8h')
      chess.put({ type: 'p', color: 'w' }, 'c7b')
      const moves = chess.moves({ square: 'c7b' as any })
      expect(moves.some((m) => m.toLowerCase().includes('c8b') && m.includes('=Q'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('c8b') && m.includes('=R'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('c8b') && m.includes('=N'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('c8b') && m.includes('=B'))).toBe(true)
    })

    it('promotes via rank-file diagonal capture into rank 8', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'w' }, 'e7d')
      chess.put({ type: 'r', color: 'b' }, 'f8d')
      const moves = chess.moves({ square: 'e7d' as any })
      expect(moves.some((m) => m.toLowerCase().includes('f8d') && m.includes('=Q'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('f8d') && m.includes('=R'))).toBe(true)
    })
  })

  // -------------------------------------------------------------------------
  // White promotes at layer h (any rank)
  // -------------------------------------------------------------------------
  describe('white pawn promotes at layer h', () => {
    it('promotes to all 4 piece types via layer move into layer h (rank 4)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8a')
      chess.put({ type: 'p', color: 'w' }, 'e4g')
      const moves = chess.moves({ square: 'e4g' as any })
      expect(moves.some((m) => m.toLowerCase().includes('e4h') && m.includes('=Q'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('e4h') && m.includes('=R'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('e4h') && m.includes('=N'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('e4h') && m.includes('=B'))).toBe(true)
    })

    it('generates exactly 4 promotion moves when pawn is on e4g reaching e4h', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8a')
      chess.put({ type: 'p', color: 'w' }, 'e4g')
      const moves = chess.moves({ square: 'e4g' as any })
      const toLayerH = moves.filter((m) => m.toLowerCase().includes('e4h'))
      expect(toLayerH.length).toBe(4)
    })

    it('promotes via layer h at rank 1 (non-standard rank)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a')
      chess.put({ type: 'k', color: 'b' }, 'h8h')
      chess.put({ type: 'p', color: 'w' }, 'c1g') // rank 1, layer g
      const moves = chess.moves({ square: 'c1g' as any })
      expect(moves.some((m) => m.toLowerCase().includes('c1h') && m.includes('=Q'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('c1h') && m.includes('=R'))).toBe(true)
    })

    it('promotes via file-layer diagonal capture into layer h', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8a')
      chess.put({ type: 'p', color: 'w' }, 'e4g')
      chess.put({ type: 'r', color: 'b' }, 'f4h')
      const moves = chess.moves({ square: 'e4g' as any })
      expect(moves.some((m) => m.toLowerCase().includes('f4h') && m.includes('=Q'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('f4h') && m.includes('=R'))).toBe(true)
    })

    it('promotes via file-layer diagonal capture into layer h on the -file side', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8a')
      chess.put({ type: 'p', color: 'w' }, 'e4g')
      chess.put({ type: 'r', color: 'b' }, 'd4h')
      const moves = chess.moves({ square: 'e4g' as any })
      expect(moves.some((m) => m.toLowerCase().includes('d4h') && m.includes('=Q'))).toBe(true)
    })
  })

  // -------------------------------------------------------------------------
  // Black promotes at rank 1 (any layer)
  // -------------------------------------------------------------------------
  describe('black pawn promotes at rank 1', () => {
    it('promotes to all 4 piece types via forward move to rank 1 (layer d)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'b' }, 'e2d')
      chess.load(chess.fen().replace(' w ', ' b '))
      const moves = chess.moves({ square: 'e2d' as any })
      expect(moves.some((m) => m.toLowerCase().includes('e1d') && m.includes('=Q'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('e1d') && m.includes('=R'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('e1d') && m.includes('=N'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('e1d') && m.includes('=B'))).toBe(true)
    })

    it('generates exactly 4 moves when black pawn is on e2d reaching rank 1', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'b' }, 'e2d')
      chess.load(chess.fen().replace(' w ', ' b '))
      const moves = chess.moves({ square: 'e2d' as any })
      const toRank1 = moves.filter((m) => m.toLowerCase().includes('e1d'))
      expect(toRank1.length).toBe(4)
    })

    it('promotes via rank 1 at a different layer (layer f)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'h8h')
      chess.put({ type: 'p', color: 'b' }, 'c2f')
      chess.load(chess.fen().replace(' w ', ' b '))
      const moves = chess.moves({ square: 'c2f' as any })
      expect(moves.some((m) => m.toLowerCase().includes('c1f') && m.includes('=Q'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('c1f') && m.includes('=R'))).toBe(true)
    })

    it('promotes via rank-file diagonal capture into rank 1 for black', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'b' }, 'e2d')
      chess.put({ type: 'r', color: 'w' }, 'f1d')
      chess.load(chess.fen().replace(' w ', ' b '))
      const moves = chess.moves({ square: 'e2d' as any })
      expect(moves.some((m) => m.toLowerCase().includes('f1d') && m.includes('=Q'))).toBe(true)
    })
  })

  // -------------------------------------------------------------------------
  // Black promotes at layer a (any rank)
  // -------------------------------------------------------------------------
  describe('black pawn promotes at layer a', () => {
    it('promotes to all 4 piece types via layer move into layer a (rank 4)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e8h')
      chess.put({ type: 'k', color: 'b' }, 'e1h')
      chess.put({ type: 'p', color: 'b' }, 'e4b')
      chess.load(chess.fen().replace(' w ', ' b '))
      const moves = chess.moves({ square: 'e4b' as any })
      expect(moves.some((m) => m.toLowerCase().includes('e4a') && m.includes('=Q'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('e4a') && m.includes('=R'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('e4a') && m.includes('=N'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('e4a') && m.includes('=B'))).toBe(true)
    })

    it('generates exactly 4 promotion moves when black pawn is on e4b reaching layer a', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e8h')
      chess.put({ type: 'k', color: 'b' }, 'e1h')
      chess.put({ type: 'p', color: 'b' }, 'e4b')
      chess.load(chess.fen().replace(' w ', ' b '))
      const moves = chess.moves({ square: 'e4b' as any })
      const toLayerA = moves.filter((m) => m.toLowerCase().includes('e4a'))
      expect(toLayerA.length).toBe(4)
    })

    it('promotes via layer a at rank 8 (non-standard rank for layer promotion)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1h')
      chess.put({ type: 'k', color: 'b' }, 'h8h')
      chess.put({ type: 'p', color: 'b' }, 'c8b') // rank 8, layer b
      chess.load(chess.fen().replace(' w ', ' b '))
      const moves = chess.moves({ square: 'c8b' as any })
      expect(moves.some((m) => m.toLowerCase().includes('c8a') && m.includes('=Q'))).toBe(true)
      expect(moves.some((m) => m.toLowerCase().includes('c8a') && m.includes('=R'))).toBe(true)
    })

    it('promotes via file-layer diagonal capture into layer a for black', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e8h')
      chess.put({ type: 'k', color: 'b' }, 'e1h')
      chess.put({ type: 'p', color: 'b' }, 'e4b')
      chess.put({ type: 'r', color: 'w' }, 'f4a')
      chess.load(chess.fen().replace(' w ', ' b '))
      const moves = chess.moves({ square: 'e4b' as any })
      expect(moves.some((m) => m.toLowerCase().includes('f4a') && m.includes('=Q'))).toBe(true)
    })

    it('promotes via file-layer diagonal capture into layer a on the -file side for black', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e8h')
      chess.put({ type: 'k', color: 'b' }, 'e1h')
      chess.put({ type: 'p', color: 'b' }, 'e4b')
      chess.put({ type: 'r', color: 'w' }, 'd4a')
      chess.load(chess.fen().replace(' w ', ' b '))
      const moves = chess.moves({ square: 'e4b' as any })
      expect(moves.some((m) => m.toLowerCase().includes('d4a') && m.includes('=Q'))).toBe(true)
    })
  })

  // -------------------------------------------------------------------------
  // Promoted piece is actually on the board
  // -------------------------------------------------------------------------
  describe('promoted piece is placed correctly on the board', () => {
    it('after white promotes to queen at rank 8, a queen is on that square', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'w' }, 'e7d')
      chess.move({ from: 'e7d', to: 'e8d', promotion: 'q' })
      const piece = chess.get('e8d' as any)
      expect(piece?.type).toBe('q')
      expect(piece?.color).toBe('w')
    })

    it('after white promotes to knight at layer h, a knight is on that square', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8a')
      chess.put({ type: 'p', color: 'w' }, 'e4g')
      chess.move({ from: 'e4g', to: 'e4h', promotion: 'n' })
      const piece = chess.get('e4h' as any)
      expect(piece?.type).toBe('n')
      expect(piece?.color).toBe('w')
    })

    it('after black promotes to rook at rank 1, a rook is on that square', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'b' }, 'e2d')
      chess.load(chess.fen().replace(' w ', ' b '))
      chess.move({ from: 'e2d', to: 'e1d', promotion: 'r' })
      const piece = chess.get('e1d' as any)
      expect(piece?.type).toBe('r')
      expect(piece?.color).toBe('b')
    })
  })
})
