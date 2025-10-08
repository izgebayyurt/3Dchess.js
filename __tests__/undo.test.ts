import { Chess, Chess3D } from '../src/chess'
import { expect, test } from 'vitest'

test('undo - works', () => {
  const chess = new Chess3D()

  chess.move('e4')
  chess.move('e5')
  expect(chess.undo()?.san).toEqual('e5h')
  expect(chess.undo()?.san).toEqual('e4a')
  expect(chess.undo()).toBeNull()

  chess.undo()
})
