import { Chess } from '../src/chess'
import { split, fen2d_to_3d } from './utils'
import { expect, test } from 'vitest'

test('isThreefoldRepetition', () => {
  /* Fischer - Petrosian, Buenos Aires, 1971 */
  const fen = fen2d_to_3d('8/pp3p1k/2p2q1p/3r1P2/5R2/7P/P1P1QP2/7K b - - 2 30')
  const moves = split('Qe5d Qh5d Qf6d Qe2d Re5d Qd3d Rd5d Qe2d')

  const chess = new Chess(fen)
  moves.forEach((move) => {
    expect(chess.isThreefoldRepetition()).toBe(false)
    chess.move(move)
  })
  expect(chess.isThreefoldRepetition()).toBe(true)
  chess.move('a6d')
  expect(chess.isThreefoldRepetition()).toBe(false)
})

test('isThreefoldRepetition - 2', () => {
  const fen = fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const moves = 'Nf3d Nf6d Ng1d Ng8d Nf3d Nf6d Ng1d Ng8d'.split(/\s+/)
  const chess = new Chess(fen)
  moves.forEach((move) => {
    expect(chess.isThreefoldRepetition()).toBe(false)
    chess.move(move)
  })
  expect(chess.isThreefoldRepetition()).toBe(true)
  chess.move('e4d')
  expect(chess.isThreefoldRepetition()).toBe(false)
})
