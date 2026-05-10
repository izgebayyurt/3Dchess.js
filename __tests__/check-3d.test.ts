import { Chess } from '../src/chess'
import { describe, expect, it } from 'vitest'

describe('check and checkmate in 3D', () => {
  // -------------------------------------------------------------------------
  // Check delivered along the layer axis
  // -------------------------------------------------------------------------
  describe('check along layer axis (rook/queen on same file+rank, different layer)', () => {
    it('white rook on same file+rank gives check to black king via layer axis', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a')
      chess.put({ type: 'k', color: 'b' }, 'e4h')
      // White rook at e4a — same file (e) and rank (4), different layer
      chess.put({ type: 'r', color: 'w' }, 'e4a')
      // Load as black to move, so we can check isCheck
      chess.load(chess.fen().replace(' w ', ' b '))
      expect(chess.isCheck()).toBe(true)
    })

    it('white queen on same file+rank gives check to black king via layer axis', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a')
      chess.put({ type: 'k', color: 'b' }, 'e4h')
      chess.put({ type: 'q', color: 'w' }, 'e4b')
      chess.load(chess.fen().replace(' w ', ' b '))
      expect(chess.isCheck()).toBe(true)
    })

    it('layer-axis check is blocked by an intervening piece', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a')
      chess.put({ type: 'k', color: 'b' }, 'e4h')
      chess.put({ type: 'r', color: 'w' }, 'e4a')
      // Friendly pawn blocks the check at e4d
      chess.put({ type: 'p', color: 'b' }, 'e4d')
      chess.load(chess.fen().replace(' w ', ' b '))
      expect(chess.isCheck()).toBe(false)
    })

    it('rook on different file does NOT give check via layer', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a')
      chess.put({ type: 'k', color: 'b' }, 'e4h')
      // Rook at f4a: different file, so not on same layer column
      chess.put({ type: 'r', color: 'w' }, 'f4a')
      chess.load(chess.fen().replace(' w ', ' b '))
      expect(chess.isCheck()).toBe(false)
    })
  })

  // -------------------------------------------------------------------------
  // Check via 3D bishop diagonal
  // -------------------------------------------------------------------------
  describe('check via 3D bishop diagonal', () => {
    it('white bishop checks black king via file-layer diagonal (+257)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a')
      chess.put({ type: 'k', color: 'b' }, 'g4h')
      // Bishop at d4e: +257 direction: d4e → e4f → f4g → g4h
      chess.put({ type: 'b', color: 'w' }, 'd4e')
      chess.load(chess.fen().replace(' w ', ' b '))
      expect(chess.isCheck()).toBe(true)
    })

    it('white bishop checks black king via rank-layer diagonal (+272)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a')
      chess.put({ type: 'k', color: 'b' }, 'd7h')
      // Bishop at d4e: +272 direction: d4e → d5f → d6g → d7h
      chess.put({ type: 'b', color: 'w' }, 'd4e')
      chess.load(chess.fen().replace(' w ', ' b '))
      expect(chess.isCheck()).toBe(true)
    })

    it('3D bishop check is blocked by intervening piece', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a')
      chess.put({ type: 'k', color: 'b' }, 'g4h')
      chess.put({ type: 'b', color: 'w' }, 'd4e')
      // Block the diagonal at f4g
      chess.put({ type: 'p', color: 'b' }, 'f4g')
      chess.load(chess.fen().replace(' w ', ' b '))
      expect(chess.isCheck()).toBe(false)
    })

    it('white queen checks black king via rank-file diagonal (classic 2D)', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a')
      chess.put({ type: 'k', color: 'b' }, 'g7d')
      // Queen at d4d: +17 diagonal d4d → e5d → f6d → g7d
      chess.put({ type: 'q', color: 'w' }, 'd4d')
      chess.load(chess.fen().replace(' w ', ' b '))
      expect(chess.isCheck()).toBe(true)
    })
  })

  // -------------------------------------------------------------------------
  // White king in check from 3D directions
  // -------------------------------------------------------------------------
  describe('white king in check from 3D directions', () => {
    it('white king is in check from black rook along layer axis', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e4d')
      chess.put({ type: 'k', color: 'b' }, 'h8h')
      chess.put({ type: 'r', color: 'b' }, 'e4h')
      expect(chess.isCheck()).toBe(true)
    })

    it('white king is in check from black bishop along file-layer diagonal', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e4d')
      chess.put({ type: 'k', color: 'b' }, 'h8h')
      // Bishop at b4a: +257 direction: b4a → c4b → d4c → e4d
      chess.put({ type: 'b', color: 'b' }, 'b4a')
      expect(chess.isCheck()).toBe(true)
    })

    it('white king is NOT in check if block exists', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e4d')
      chess.put({ type: 'k', color: 'b' }, 'h8h')
      chess.put({ type: 'r', color: 'b' }, 'e4h')
      chess.put({ type: 'p', color: 'w' }, 'e4f')
      expect(chess.isCheck()).toBe(false)
    })
  })

  // -------------------------------------------------------------------------
  // Check detection causes move filtering
  // -------------------------------------------------------------------------
  describe('check detection filters illegal moves', () => {
    it('king cannot move to a square attacked along layer axis', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e4d')
      chess.put({ type: 'k', color: 'b' }, 'h8h')
      // Black rook at e4h attacks entire e4 layer column
      chess.put({ type: 'r', color: 'b' }, 'e4h')
      const moves = chess.moves({ square: 'e4d' as any })
      // King must not be able to stay or move to any square on e4 layer column
      expect(moves).not.toContain('e4e')
    })

    it('moving a piece that blocks a 3D check exposes the king', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'e4d')
      chess.put({ type: 'k', color: 'b' }, 'h8h')
      // Rook at e4h attacks e4d through e4f as blocker
      chess.put({ type: 'r', color: 'b' }, 'e4h')
      chess.put({ type: 'r', color: 'w' }, 'e4f')
      // White rook at e4f blocks the attack; it cannot move away freely
      const rookMoves = chess.moves({ square: 'e4f' as any })
      // The white rook should not be able to leave the e4 file/rank/layer column
      // (any move off the layer axis exposes king)
      expect(rookMoves.every((m) => m.includes('e4'))).toBe(true)
    })
  })

  // -------------------------------------------------------------------------
  // Simple checkmate using 3D geometry
  // -------------------------------------------------------------------------
  describe('simple checkmate in 3D', () => {
    it('black king is checkmated when surrounded on all 3D escape routes', () => {
      // Black king at h8h (file=h, rank=8, layer=h) — 3D corner.
      // In 3D, the king has up to 7 escape squares from this corner:
      //   On layer h: g8h, h7h, g7h
      //   Down to layer g: h8g, g8g, h7g, g7g
      // We need to cover all of them plus deliver check:
      //   - Rook at a8h → covers rank 8 on layer h (attacks h8h directly AND blocks g8h)
      //   - Rook at a7h → covers rank 7 on layer h (blocks h7h, g7h)
      //   - Rook at a8g → covers rank 8 on layer g (blocks h8g, g8g)
      //   - Rook at a7g → covers rank 7 on layer g (blocks h7g, g7g)
      // Black king is in check from a8h and cannot escape.
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a') // white king away from action
      chess.put({ type: 'k', color: 'b' }, 'h8h') // black king cornered
      chess.put({ type: 'r', color: 'w' }, 'a8h') // covers rank 8 on layer h (delivers check)
      chess.put({ type: 'r', color: 'w' }, 'a7h') // covers rank 7 on layer h
      chess.put({ type: 'r', color: 'w' }, 'a8g') // covers rank 8 on layer g
      chess.put({ type: 'r', color: 'w' }, 'a7g') // covers rank 7 on layer g
      chess.load(chess.fen().replace(' w ', ' b '))
      expect(chess.isCheckmate()).toBe(true)
    })

    it('black king at h8h is in check from white rook on h1h', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'f6a')
      chess.put({ type: 'k', color: 'b' }, 'h8h')
      chess.put({ type: 'r', color: 'w' }, 'h1h')
      chess.load(chess.fen().replace(' w ', ' b '))
      expect(chess.isCheck()).toBe(true)
    })

    it('isCheck returns false when there is no check', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a')
      chess.put({ type: 'k', color: 'b' }, 'h8h')
      expect(chess.isCheck()).toBe(false)
      chess.load(chess.fen().replace(' w ', ' b '))
      expect(chess.isCheck()).toBe(false)
    })

    it('after white moves rook to give check along layer axis, isCheck is true for black', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a')
      chess.put({ type: 'k', color: 'b' }, 'e4h')
      // White rook at e4b: not yet giving check (layer b, king at layer h)
      // but e4b → e4c is still on same file/rank as king, so rook attacks along layer
      // Use a rook that is NOT on same file/rank initially
      chess.put({ type: 'r', color: 'w' }, 'e1b')
      // Move rook from e1b to e4b — rook now on same file(e) and rank(4) as black king
      chess.move({ from: 'e1b', to: 'e4b' })
      // Now black's turn; the rook at e4b attacks black king at e4h via layer axis
      expect(chess.isCheck()).toBe(true)
    })
  })

  // -------------------------------------------------------------------------
  // Knight check via 3D jump
  // -------------------------------------------------------------------------
  describe('knight delivers check via 3D jump', () => {
    it('white knight on d4d delivers check to black king at e6d via file-rank jump', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a')
      chess.put({ type: 'k', color: 'b' }, 'e6d')
      // Knight at d4d: +18 jump (file+2 rank+1) goes to f5d, not e6d
      // Knight at c5d: +18 jump (file+2 rank+1) = e6d? Let's verify:
      // c=2, 5=rank4 in 0-indexed, layer d=3
      // +18: file+2=e, rank+1=6 => e6d YES
      chess.put({ type: 'n', color: 'w' }, 'c5d')
      chess.load(chess.fen().replace(' w ', ' b '))
      expect(chess.isCheck()).toBe(true)
    })

    it('white knight delivers check via file-layer jump', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a')
      // Knight at d4d: +258 jump (file+2, layer+1) = f4e
      // So put black king at f4e and knight at d4d
      chess.put({ type: 'k', color: 'b' }, 'f4e')
      chess.put({ type: 'n', color: 'w' }, 'd4d')
      chess.load(chess.fen().replace(' w ', ' b '))
      expect(chess.isCheck()).toBe(true)
    })

    it('white knight delivers check via rank-layer jump', () => {
      const chess = new Chess()
      chess.clear()
      chess.put({ type: 'k', color: 'w' }, 'a1a')
      // Knight at d4d: +288 jump (rank+2, layer+1) = d6e
      chess.put({ type: 'k', color: 'b' }, 'd6e')
      chess.put({ type: 'n', color: 'w' }, 'd4d')
      chess.load(chess.fen().replace(' w ', ' b '))
      expect(chess.isCheck()).toBe(true)
    })
  })
})
