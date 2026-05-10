import { Chess } from '../src/chess'
import { expect, test } from 'vitest'
import { fen2d_to_3d } from './utils'

// NOTE: 2D stalemate/checkmate positions do NOT translate to 3D because the
// king can escape to adjacent layers. These tests are skipped until 3D-specific
// positions are designed.
test.skip('isGameOver - works - stalemate (skipped: 2D stalemate not stalemate in 3D)', () => {
  const chess = new Chess(fen2d_to_3d('8/8/5k2/p4p1p/P4K1P/1r6/8/8 w - - 0 2'))
  expect(chess.isGameOver()).toBe(true)
})

test.skip('isGameOver - works - checkmate (skipped: 2D checkmate not checkmate in 3D)', () => {
  const chess = new Chess(fen2d_to_3d('8/5r2/4K1q1/4p3/3k4/8/8/8 w - - 0 7'))
  expect(chess.isGameOver()).toBe(true)
})

test('isGameOver - works - insufficient material', () => {
  const chess = new Chess(fen2d_to_3d('k7/8/8/8/8/8/8/7K w - - 0 1'))
  expect(chess.isGameOver()).toBe(true)
})
