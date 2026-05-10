import { Chess } from '../src/chess'
import { expect, test } from 'vitest'
import { fen2d_to_3d } from './utils'

test('stalemate 1', () => {
  const chess = new Chess(fen2d_to_3d('1R6/8/8/8/8/8/7R/k6K b - - 0 1'))
  expect(chess.isStalemate()).toBe(true)
})

test('stalemate 2', () => {
  const chess = new Chess(fen2d_to_3d('8/8/5k2/p4p1p/P4K1P/1r6/8/8 w - - 0 2'))
  expect(chess.isStalemate()).toBe(true)
})

test('stalemate - starting position is not stalemate', () => {
  const chess = new Chess()
  expect(chess.isStalemate()).toBe(false)
})

test('stalemate - checkmate is not stalemate', () => {
  const chess = new Chess(fen2d_to_3d('R3k3/8/4K3/8/8/8/8/8 b - - 0 1'))
  expect(chess.isStalemate()).toBe(false)
})
