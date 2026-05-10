import { Chess, Square, PAWN, WHITE, BLACK } from '../src/chess'
import { expect, test } from 'vitest'
import { fen2d_to_3d } from './utils'

test('get', () => {
  const chess = new Chess(fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'))
  expect(chess.get('a2d')).toEqual({ type: PAWN, color: WHITE })
  expect(chess.get('a7d')).toEqual({ type: PAWN, color: BLACK })
})

test('get - returns undefined for empty square', () => {
  const chess = new Chess(fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'))
  expect(chess.get('a4d')).toEqual(undefined)
})

test('get - returns undefined for invalid square', () => {
  const chess = new Chess(fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'))
  expect(chess.get('bad-square' as Square)).toEqual(undefined)
})
