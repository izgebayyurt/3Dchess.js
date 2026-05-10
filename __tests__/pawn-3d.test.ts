import { Chess } from '../src/chess'
import { describe, expect, it } from 'vitest'

describe('pawn 3D moves', () => {
  // -------------------------------------------------------------------------
  // White pawn forward (rank direction)
  // -------------------------------------------------------------------------
  describe('white pawn forward rank moves', () => {
    it('moves one square forward on the rank axis (layer d)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'w' }, 'e4d')
      const moves = chess.moves({ square: 'e4d' })
      expect(moves).toContain('e5d')
    })

    it('moves two squares forward from second rank', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'w' }, 'e2d')
      const moves = chess.moves({ square: 'e2d' })
      expect(moves).toContain('e3d')
      expect(moves).toContain('e4d')
    })

    it('cannot double push if intermediate square is blocked', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'w' }, 'e2d')
      chess.put({ type: 'n', color: 'b' }, 'e3d')
      const moves = chess.moves({ square: 'e2d' })
      expect(moves).not.toContain('e3d')
      expect(moves).not.toContain('e4d')
    })
  })

  // -------------------------------------------------------------------------
  // White pawn upward layer move (non-capturing)
  // -------------------------------------------------------------------------
  describe('white pawn layer-up moves', () => {
    it('moves one layer upward (non-capturing)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'w' }, 'e4d')
      const moves = chess.moves({ square: 'e4d' })
      expect(moves).toContain('e4e')
    })

    it('cannot move layer-up if that square is occupied by an enemy', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'w' }, 'e4d')
      chess.put({ type: 'r', color: 'b' }, 'e4e')
      const moves = chess.moves({ square: 'e4d' })
      expect(moves).not.toContain('e4e')
    })

    it('cannot move layer-up if that square is occupied by a friendly', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'w' }, 'e4d')
      chess.put({ type: 'p', color: 'w' }, 'e4e')
      const moves = chess.moves({ square: 'e4d' })
      expect(moves).not.toContain('e4e')
    })
  })

  // -------------------------------------------------------------------------
  // White pawn rank-file diagonal captures (+17, +15)
  // -------------------------------------------------------------------------
  describe('white pawn rank-file diagonal captures', () => {
    it('captures diagonally right (+17: +file +rank)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'w' }, 'e4d')
      chess.put({ type: 'r', color: 'b' }, 'f5d')
      const moves = chess.moves({ square: 'e4d' })
      expect(moves.some((m) => m.includes('f5d'))).toBe(true)
    })

    it('captures diagonally left (+15: -file +rank)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'w' }, 'e4d')
      chess.put({ type: 'r', color: 'b' }, 'd5d')
      const moves = chess.moves({ square: 'e4d' })
      expect(moves.some((m) => m.includes('d5d'))).toBe(true)
    })

    it('does not capture empty diagonal squares', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'w' }, 'e4d')
      const moves = chess.moves({ square: 'e4d' })
      expect(moves.some((m) => m.includes('f5d'))).toBe(false)
      expect(moves.some((m) => m.includes('d5d'))).toBe(false)
    })
  })

  // -------------------------------------------------------------------------
  // White pawn file-layer diagonal captures (+257 = +file +layer, +255 = -file +layer)
  // -------------------------------------------------------------------------
  describe('white pawn file-layer diagonal captures', () => {
    it('captures diagonally +file +layer (offset +257)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'w' }, 'e4d')
      chess.put({ type: 'r', color: 'b' }, 'f4e')
      const moves = chess.moves({ square: 'e4d' })
      expect(moves.some((m) => m.includes('f4e'))).toBe(true)
    })

    it('captures diagonally -file +layer (offset +255)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'w' }, 'e4d')
      chess.put({ type: 'r', color: 'b' }, 'd4e')
      const moves = chess.moves({ square: 'e4d' })
      expect(moves.some((m) => m.includes('d4e'))).toBe(true)
    })

    it('does not capture empty layer-diagonal squares', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'w' }, 'e4d')
      const moves = chess.moves({ square: 'e4d' })
      expect(moves.some((m) => m.includes('f4e'))).toBe(false)
      expect(moves.some((m) => m.includes('d4e'))).toBe(false)
    })

    it('does NOT allow offset +512 (two layers) as a capture', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'w' }, 'e4d')
      chess.put({ type: 'r', color: 'b' }, 'e4f') // two layers up from d
      const moves = chess.moves({ square: 'e4d' })
      // e4f is 2 layers away — must never be a pawn capture destination
      expect(moves.some((m) => m.includes('e4f'))).toBe(false)
    })
  })

  // -------------------------------------------------------------------------
  // Black pawn equivalents
  // -------------------------------------------------------------------------
  describe('black pawn forward rank moves', () => {
    it('moves one square forward (rank decreasing)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'b' }, 'e5d')
      // set turn to black
      chess.load(chess.fen().replace(' w ', ' b '))
      const moves = chess.moves({ square: 'e5d' })
      expect(moves).toContain('e4d')
    })

    it('double moves from rank 7', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'b' }, 'e7d')
      chess.load(chess.fen().replace(' w ', ' b '))
      const moves = chess.moves({ square: 'e7d' })
      expect(moves).toContain('e6d')
      expect(moves).toContain('e5d')
    })
  })

  describe('black pawn layer-down moves', () => {
    it('moves one layer downward (non-capturing)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'b' }, 'e4d')
      chess.load(chess.fen().replace(' w ', ' b '))
      const moves = chess.moves({ square: 'e4d' })
      expect(moves).toContain('e4c')
    })
  })

  describe('black pawn rank-file diagonal captures', () => {
    it('captures diagonally forward-right for black', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'b' }, 'e5d')
      chess.put({ type: 'r', color: 'w' }, 'f4d')
      chess.load(chess.fen().replace(' w ', ' b '))
      const moves = chess.moves({ square: 'e5d' })
      expect(moves.some((m) => m.includes('f4d'))).toBe(true)
    })

    it('captures diagonally forward-left for black', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'b' }, 'e5d')
      chess.put({ type: 'r', color: 'w' }, 'd4d')
      chess.load(chess.fen().replace(' w ', ' b '))
      const moves = chess.moves({ square: 'e5d' })
      expect(moves.some((m) => m.includes('d4d'))).toBe(true)
    })
  })

  describe('black pawn file-layer diagonal captures', () => {
    it('captures diagonally +file -layer (offset -255)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'b' }, 'e4d')
      chess.put({ type: 'r', color: 'w' }, 'f4c')
      chess.load(chess.fen().replace(' w ', ' b '))
      const moves = chess.moves({ square: 'e4d' })
      expect(moves.some((m) => m.includes('f4c'))).toBe(true)
    })

    it('captures diagonally -file -layer (offset -257)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'b' }, 'e4d')
      chess.put({ type: 'r', color: 'w' }, 'd4c')
      chess.load(chess.fen().replace(' w ', ' b '))
      const moves = chess.moves({ square: 'e4d' })
      expect(moves.some((m) => m.includes('d4c'))).toBe(true)
    })
  })

  // -------------------------------------------------------------------------
  // Promotion: white at rank 8
  // -------------------------------------------------------------------------
  describe('white pawn promotion at rank 8', () => {
    it('promotes to queen when reaching rank 8 via forward move', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'w' }, 'e7d')
      const moves = chess.moves({ square: 'e7d' })
      expect(moves.some((m) => m.includes('e8d') && m.includes('Q'))).toBe(true)
      expect(moves.some((m) => m.includes('e8d') && m.includes('R'))).toBe(true)
      expect(moves.some((m) => m.includes('e8d') && m.includes('B'))).toBe(true)
      expect(moves.some((m) => m.includes('e8d') && m.includes('N'))).toBe(true)
    })

    it('does not generate non-promotion moves when reaching rank 8', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'w' }, 'e7d')
      const moves = chess.moves({ square: 'e7d' })
      // all e8d moves must include a promotion suffix
      const toRank8 = moves.filter((m) => m.includes('e8d'))
      expect(toRank8.length).toBe(4) // n, b, r, q
      for (const m of toRank8) {
        expect(m).toMatch(/=[nbrq]/i)
      }
    })
  })

  // -------------------------------------------------------------------------
  // Promotion: white at layer h
  // -------------------------------------------------------------------------
  describe('white pawn promotion at layer h', () => {
    it('promotes when moving forward into layer h (not rank 8)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8a') // king on layer a
      chess.put({ type: 'p', color: 'w' }, 'e4g') // pawn on layer g, rank 4
      const moves = chess.moves({ square: 'e4g' })
      // moving to e4h should be a promotion
      expect(moves.some((m) => m.includes('e4h') && m.includes('Q'))).toBe(true)
      expect(moves.some((m) => m.includes('e4h') && m.includes('R'))).toBe(true)
    })

    it('promotes via layer-diagonal capture into layer h', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8a')
      chess.put({ type: 'p', color: 'w' }, 'e4g')
      chess.put({ type: 'r', color: 'b' }, 'f4h')
      const moves = chess.moves({ square: 'e4g' })
      // capturing f4h is a promotion
      expect(moves.some((m) => m.includes('f4h') && m.includes('Q'))).toBe(true)
    })
  })

  // -------------------------------------------------------------------------
  // Promotion: black at rank 1
  // -------------------------------------------------------------------------
  describe('black pawn promotion at rank 1', () => {
    it('promotes when reaching rank 1', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e1a')
      chess.put({ type: 'k', color: 'b' }, 'e8h')
      chess.put({ type: 'p', color: 'b' }, 'e2d')
      chess.load(chess.fen().replace(' w ', ' b '))
      const moves = chess.moves({ square: 'e2d' })
      expect(moves.some((m) => m.includes('e1d') && m.includes('Q'))).toBe(true)
      expect(moves.some((m) => m.includes('e1d') && m.includes('R'))).toBe(true)
      expect(moves.some((m) => m.includes('e1d') && m.includes('B'))).toBe(true)
      expect(moves.some((m) => m.includes('e1d') && m.includes('N'))).toBe(true)
    })
  })

  // -------------------------------------------------------------------------
  // Promotion: black at layer a
  // -------------------------------------------------------------------------
  describe('black pawn promotion at layer a', () => {
    it('promotes when moving down into layer a (not rank 1)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e8h')
      chess.put({ type: 'k', color: 'b' }, 'e1h')
      chess.put({ type: 'p', color: 'b' }, 'e4b') // pawn on layer b, rank 4
      chess.load(chess.fen().replace(' w ', ' b '))
      const moves = chess.moves({ square: 'e4b' })
      // moving to e4a should be a promotion
      expect(moves.some((m) => m.includes('e4a') && m.includes('Q'))).toBe(true)
      expect(moves.some((m) => m.includes('e4a') && m.includes('R'))).toBe(true)
    })
  })
})
