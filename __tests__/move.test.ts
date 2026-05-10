import { Chess } from '../src/chess'
import { expect, test } from 'vitest'
import { fen2d_to_3d } from './utils'

test('move - works - standard algebraic notation', () => {
  const fen = fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const next = fen2d_to_3d('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1')
  const chess = new Chess(fen)
  const move = chess.move('e4d')
  expect(move.isBigPawn()).toEqual(true)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.after).toEqual(chess.fen())
  expect(chess.fen()).toEqual(next)
})

test('move - works - standard algebraic notation (mates)', () => {
  const fen = fen2d_to_3d('7k/3R4/3p2Q1/6Q1/2N1N3/8/8/3R3K w - - 0 1')
  const next = fen2d_to_3d('3R3k/8/3p2Q1/6Q1/2N1N3/8/8/3R3K b - - 1 1')
  const chess = new Chess(fen)
  const move = chess.move('Rd8d#')
  expect(chess.fen()).toEqual(next)
  expect(move.after).toEqual(chess.fen())
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - works - standard algebraic notation (white en passant)', () => {
  const fen = fen2d_to_3d('rnbqkbnr/pp3ppp/2pp4/4pP2/4P3/8/PPPP2PP/RNBQKBNR w KQkq e6 0 1')
  const next = fen2d_to_3d('rnbqkbnr/pp3ppp/2ppP3/8/4P3/8/PPPP2PP/RNBQKBNR b KQkq - 0 1')
  const chess = new Chess(fen)
  const move = chess.move('fxe6d')

  expect(move).toMatchObject({
    from: 'f5d',
    to: 'e6d',
    captured: 'p',
    flags: 'e',
  })
  expect(chess.fen()).toEqual(move.after)
  expect(move.after).toEqual(next)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(true)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - works - standard algebraic notation (black en passant)', () => {
  const fen = fen2d_to_3d('rnbqkbnr/pppp2pp/8/4p3/4Pp2/2PP4/PP3PPP/RNBQKBNR b KQkq e3 0 1')
  const next = fen2d_to_3d('rnbqkbnr/pppp2pp/8/4p3/8/2PPp3/PP3PPP/RNBQKBNR w KQkq - 0 2')
  const chess = new Chess(fen)
  const move = chess.move('fxe3d')
  expect(move).toMatchObject({
    from: 'f4d',
    to: 'e3d',
    captured: 'p',
    flags: 'e',
  })
  expect(chess.fen()).toEqual(move.after)
  expect(move.after).toEqual(next)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(true)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - works - standard algebraic notation (pin disambiguates piece)', () => {
  const fen = fen2d_to_3d('r2qkbnr/ppp2ppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R b KQkq - 3 7')
  const next = fen2d_to_3d('r2qkb1r/ppp1nppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R w KQkq - 4 8')
  const chess = new Chess(fen)
  const move = chess.move('Ne7d')

  expect(move).toMatchObject({
    from: 'g8d',
    to: 'e7d',
    flags: 'n',
  })
  expect(move.after).toEqual(next)
  expect(chess.fen()).toEqual(move.after)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - works - permissive parser (accepts overly disambiguated piece)', () => {
  const fen = fen2d_to_3d('r2qkbnr/ppp2ppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R b KQkq - 3 7')
  const next = fen2d_to_3d('r2qkb1r/ppp1nppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R w KQkq - 4 8')
  const chess = new Chess(fen)
  const move = chess.move('Nge7d')
  expect(move).toMatchObject({
    to: 'e7d',
    from: 'g8d',
    piece: 'n',
  })
  expect(chess.fen()).toBe(next)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - works - permissive parser (accepts correctly disambiguated piece)', () => {
  const fen = fen2d_to_3d('r2qkbnr/ppp2ppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R b KQkq - 3 7')
  const next = fen2d_to_3d('r2qkb1r/ppp1nppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R w KQkq - 4 8')
  const chess = new Chess(fen)
  const move = chess.move('Ne7d')
  expect(move).toMatchObject({
    to: 'e7d',
    from: 'g8d',
    piece: 'n',
  })
  expect(chess.fen()).toBe(next)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - strict - throws Error - overly disambiguated piece', () => {
  const fen = fen2d_to_3d('r2qkbnr/ppp2ppp/2n5/1B2pQ2/4P3/8/PPP2PPP/RNB1K2R b KQkq - 3 7')
  const chess = new Chess(fen)
  expect(() => chess.move('Nge7d', { strict: true })).toThrowError()
})

test('move - throws Error - illegal move', () => {
  const fen = fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const chess = new Chess(fen)
  expect(() => chess.move('e5d')).toThrowError()
})

test('move - works - verbose', () => {
  const fen = fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const next = fen2d_to_3d('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1')
  const chess = new Chess(fen)
  const move = chess.move({ from: 'e2d', to: 'e4d' })
  expect(chess.fen()).toEqual(next)
  expect(move.after).toEqual(next)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(true)
})

test('move - works - verbose - promotion field ignored if not promoting', () => {
  const fen = fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const next = fen2d_to_3d('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1')
  const chess = new Chess(fen)
  const move = chess.move({ from: 'e2d', to: 'e4d', promotion: 'q' })
  expect(chess.fen()).toBe(next)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(true)
})

test('move - works - verbose - under promotion', () => {
  const fen = fen2d_to_3d('8/1k5P/8/8/8/8/8/1K6 w - - 0 1')
  const next = fen2d_to_3d('7N/1k6/8/8/8/8/8/1K6 b - - 0 1')
  const chess = new Chess(fen)
  const move = chess.move({ from: 'h7d', to: 'h8d', promotion: 'n' })
  expect(chess.fen()).toEqual(next)
  expect(move.after).toEqual(next)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(true)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - throws Error - verbose (illegal move)', () => {
  const fen = fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const chess = new Chess(fen)
  expect(() => chess.move({ from: 'e2d', to: 'e5d' })).toThrowError()
})

test('move - works - permissive parser (piece capture without x)', () => {
  const fen = fen2d_to_3d(
    'r1bqk2r/p1p2pp1/2n1pn2/1p5p/2pP4/bPNB1PN1/PB1Q2PP/R3K2R w KQkq - 0 12',
  )
  const next = fen2d_to_3d(
    'r1bqk2r/p1p2pp1/2n1pn2/1p5p/2pP4/BPNB1PN1/P2Q2PP/R3K2R b KQkq - 0 12',
  )
  const chess = new Chess(fen)
  const move = chess.move('Ba3d')
  expect(move).toMatchObject({
    to: 'a3d',
    from: 'b2d',
    piece: 'b',
  })
  expect(chess.fen()).toEqual(next)
  expect(move.after).toEqual(next)
  expect(move.isCapture()).toEqual(true)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - works - permissive parser (pawn capture without x)', () => {
  const fen = fen2d_to_3d('rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2')
  const next = fen2d_to_3d('rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPP2PP/RNBQKBNR w KQkq - 0 3')
  const chess = new Chess(fen)
  const move = chess.move('ef4d')
  expect(move).toMatchObject({
    to: 'f4d',
    from: 'e5d',
    piece: 'p',
  })
  expect(chess.fen()).toEqual(next)
  expect(move.after).toEqual(next)
  expect(move.isCapture()).toEqual(true)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(false)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - works - permissive parser (en passant capture without x)', () => {
  const fen = fen2d_to_3d('rnbqkbnr/pppp1ppp/8/8/4PpP1/8/PPPP3P/RNBQKBNR b KQkq g3 0 3')
  const next = fen2d_to_3d('rnbqkbnr/pppp1ppp/8/8/4P3/6p1/PPPP3P/RNBQKBNR w KQkq - 0 4')
  const chess = new Chess(fen)
  const move = chess.move('fg3d')
  expect(move).toMatchObject({
    to: 'g3d',
    from: 'f4d',
    piece: 'p',
  })
  expect(chess.fen()).toEqual(next)
  expect(move.after).toEqual(next)
  expect(move.isCapture()).toEqual(false)
  expect(move.isPromotion()).toEqual(false)
  expect(move.isEnPassant()).toEqual(true)
  expect(move.isKingsideCastle()).toEqual(false)
  expect(move.isQueensideCastle()).toEqual(false)
  expect(move.isBigPawn()).toEqual(false)
})

test('move - works - kingside castling', () => {
  const fen = fen2d_to_3d(
    'r1bqkbnr/ppp2ppp/2np4/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1',
  )
  const next = fen2d_to_3d(
    'r1bqkbnr/ppp2ppp/2np4/4p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 1 1',
  )
  const moves = ['O-O', { from: 'e1d', to: 'g1d' }] as const
  for (const theMove of moves) {
    const chess = new Chess(fen)
    const move = chess.move(theMove as string | { from: string, to: string })
    expect(move.isBigPawn()).toEqual(false)
    expect(move.isCapture()).toEqual(false)
    expect(move.isPromotion()).toEqual(false)
    expect(move.isEnPassant()).toEqual(false)
    expect(move.isKingsideCastle()).toEqual(true)
    expect(move.isQueensideCastle()).toEqual(false)
    expect(move.after).toEqual(chess.fen())
    expect(chess.fen()).toEqual(next)
  }
})

test('move - works - queenside castling', () => {
  const fen = fen2d_to_3d(
    'r3kb1r/pppbqppp/2np1n2/4p3/4P3/2NP1N2/PPPBBPPP/R2Q1RK1 b kq - 5 7',
  )
  const next = fen2d_to_3d(
    '2kr1b1r/pppbqppp/2np1n2/4p3/4P3/2NP1N2/PPPBBPPP/R2Q1RK1 w - - 6 8',
  )
  const moves = ['O-O-O', { from: 'e8d', to: 'c8d' }] as const
  for (const theMove of moves) {
    const chess = new Chess(fen)
    const move = chess.move(theMove as string | { from: string, to: string })
    expect(move.isBigPawn()).toEqual(false)
    expect(move.isCapture()).toEqual(false)
    expect(move.isPromotion()).toEqual(false)
    expect(move.isEnPassant()).toEqual(false)
    expect(move.isKingsideCastle()).toEqual(false)
    expect(move.isQueensideCastle()).toEqual(true)
    expect(move.after).toEqual(chess.fen())
    expect(chess.fen()).toEqual(next)
  }
})

test('move - works - ambiguous capitalization in move notation', () => {
  /*
   * Some positions and moves may be ambiguous when using the permissive
   * parser. For example, in this position: ,
   * the move b1c3 may be interpreted as Nc3 or B1c3 (a disambiguated bishop
   * move). In these cases, the permissive parser will default to the most
   * basic interpretation (which is b1c3 parsing to Nc3).
   */
  const chess = new Chess(fen2d_to_3d('6k1/8/8/B7/8/8/8/BN4K1 w - - 0 1'))
  // use verbose move: b1d to c3d — permissive parser would treat 'b1c3d' ambiguously
  const move = chess.move({ from: 'b1d', to: 'c3d' })
  expect(move.san).not.toEqual('B1c3d')
  expect(move.san).toEqual('Nc3d')
})
