import { Chess } from '../src/chess'
import { test, expect } from 'vitest'
import { fen2d_to_3d } from './utils'

test('null move at start', () => {
  const fen = fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const next = fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 1 1')
  const chess = new Chess(fen)
  chess.move('--')
  expect(chess.fen()).toBe(next)
})

test('making null move by passing null object', () => {
  const fen = fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const next = fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 1 1')
  const chess = new Chess(fen)
  chess.move(null)
  expect(chess.fen()).toBe(next)
})

test('null move is correctly displayed in pgn', () => {
  const fen = fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const chess = new Chess(fen)
  chess.move('e4d')
  chess.move('e5d')
  chess.move('--')
  chess.move('Nf6d')
  chess.move('--')
  chess.move('--')
  chess.move('Nf3d')

  // The PGN includes SetUp/FEN headers since we loaded a custom (non-default) position
  expect(chess.pgn()).toContain('1. e4d e5d 2. -- Nf6d 3. -- -- 4. Nf3d *')
})

test('null move while in check is not allowed', () => {
  const fn = () => {
    const fen = fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')

    const chess = new Chess(fen)
    chess.move('e4d')
    chess.move('e5d')
    chess.move('Nf3d')
    chess.move('d6d')
    chess.move('Bb5d+')
    chess.move('--')
  }
  expect(fn).toThrow('Null move not allowed when in check')
})

//tests describing current behaviour and should be discussed if this behaviour is desired or if other null move logic is better

test('6 null moves in a row result in a draw', () => {
  const fen = fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const chess = new Chess(fen)
  chess.move('--')
  chess.move('--')
  chess.move('--')
  chess.move(null)
  chess.move(null)
  chess.move(null)

  expect(chess.isDraw()).toBe(true)
})
