import { Chess3D, DEFAULT_POSITION_3D } from '../src/chess'
import { expect, test } from 'vitest'

test('reset', () => {
  const chess = new Chess3D()
  chess.clear()
  chess.reset()
  expect(chess.fen()).toEqual(DEFAULT_POSITION_3D)
})
