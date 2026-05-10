import { Chess, xoroshiro128 } from '../src/chess'
import { expect, test } from 'vitest'
import { fen2d_to_3d } from './utils'

// Very basic hash tests, more extensive testing is done as part of the move and load pgn tests.

test('rand', () => {
  const rand = xoroshiro128(0xa187eb39cdcaed8f31c4b365b102e01en)

  const results = Array.from({ length: 5 }, () => rand().toString(16))

  // values take from reference implementation
  expect(results).toEqual([
    'c9c4700ec0b2a75c',
    'ce613bcab5ad7ec2',
    'd4abd9ddcd0a382b',
    '5f29a08525b0575f',
    'f6718179e0f7ba94',
  ])
})

test('hash is the same for the same position', () => {
  const a = new Chess()
  const b = new Chess()

  expect(a.hash()).toEqual(b.hash())
})

test('hash is different for different positions', () => {
  const startFen = fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const a = new Chess(startFen)
  a.move('e4d')

  const b = new Chess(startFen)
  b.move('d4d')

  expect(a.hash()).not.toEqual(b.hash())
})
