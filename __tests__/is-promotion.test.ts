import { Chess } from '../src/chess'
import { expect, test } from 'vitest'
import { fen2d_to_3d } from './utils'

test('isPromotion - true for promotion', () => {
  const chess = new Chess(fen2d_to_3d('8/1PQ2pk1/3p2p1/3qp3/8/4P3/7p/2K5 w - - 0 56'))
  expect(chess.isPromotion({ from: 'b7d', to: 'b8d' })).toBe(true)
})

test('isPromotion - false for illegal move', () => {
  const chess = new Chess(fen2d_to_3d('8/1PQ2pk1/3p2p1/3qp3/8/4P3/7p/2K5 w - - 0 56'))
  expect(chess.isPromotion({ from: 'b7d', to: 'c8d' })).toBe(false)
})

test('isPromotion - false for normal pawn move', () => {
  const chess = new Chess(
    fen2d_to_3d('r2qk2r/pR1nppbp/3p1np1/1BpP4/4PPb1/2N2N2/P1PB2PP/3QK2R w Kkq - 2 12'),
  )
  expect(chess.isPromotion({ from: 'e4d', to: 'e5d' })).toBe(false)
})

test('isPromotion - false for non pawn move to eighth rank', () => {
  const chess = new Chess(
    fen2d_to_3d('2r1k3/4bp2/p2p2p1/1p2p1P1/3qB3/5Q2/PPP2P2/1K5R w - - 0 25'),
  )
  expect(chess.isPromotion({ from: 'h1d', to: 'h8d' })).toBe(false)
})
