import { Chess } from '../src/chess'
import { expect, test } from 'vitest'

// TODO: add 3D perft test cases
// Perft node counts are specific to a starting position and must be
// recalculated for the 3D board.

test.skip('perft - position 1', () => {
  const chess = new Chess()
  expect(chess.perft(4)).toBe(197281)
})

test.skip('perft - position 2', () => {
  const chess = new Chess()
  expect(chess.perft(3)).toBe(97862)
})

test.skip('perft - position 3', () => {
  const chess = new Chess()
  expect(chess.perft(4)).toBe(43238)
})

test.skip('perft - position 4', () => {
  const chess = new Chess()
  expect(chess.perft(4)).toBe(422333)
})

test.skip('perft - position 5', () => {
  const chess = new Chess()
  expect(chess.perft(3)).toBe(62379)
})

test.skip('perft - position 6', () => {
  const chess = new Chess()
  expect(chess.perft(3)).toBe(89890)
})

test.skip('perft - position 7', () => {
  const chess = new Chess()
  expect(chess.perft(3)).toBe(23509)
})
