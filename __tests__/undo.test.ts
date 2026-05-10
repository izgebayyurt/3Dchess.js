import { Chess } from '../src/chess'
import { expect, test } from 'vitest'
import { fen2d_to_3d } from './utils'

test('undo - works', () => {
  const chess = new Chess(fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'))

  chess.move('e4d')
  chess.move('e5d')
  expect(chess.undo()?.san).toEqual('e5d')
  expect(chess.undo()?.san).toEqual('e4d')
  expect(chess.undo()).toBeNull()

  chess.undo()
})
