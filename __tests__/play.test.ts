import { Chess3D } from '../src/chess'
import { test } from 'vitest'

test('reset', () => {
  const chess = new Chess3D()
  while (!chess.isGameOver()) {
    const moves = chess.moves()
    const move = moves[Math.floor(Math.random() * moves.length)]
    chess.move(move)
  }
  console.log(chess.pgn())
})
