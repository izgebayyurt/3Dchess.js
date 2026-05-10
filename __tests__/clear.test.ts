import { Chess, SEVEN_TAG_ROSTER } from '../src/chess'
import { expect, test } from 'vitest'

const EMPTY_3D_FEN = '8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8/8 w - - 0 1'

test('clear', () => {
  const chess = new Chess()
  chess.setHeader('White', 'Magnus Carlsen')
  chess.setHeader('Black', 'Viswanathan Anand')

  chess.clear()
  expect(chess.fen()).toEqual(EMPTY_3D_FEN)
  expect(chess.getHeaders()).toEqual({ ...SEVEN_TAG_ROSTER })

  expect(chess.hash()).toEqual(
    new Chess(EMPTY_3D_FEN, { skipValidation: true }).hash(),
  )
})

test('clear - preserveHeaders = true', () => {
  const chess = new Chess()
  chess.setHeader('White', 'Magnus Carlsen')
  chess.setHeader('Black', 'Viswanathan Anand')

  chess.clear({ preserveHeaders: true })

  expect(chess.fen()).toEqual(EMPTY_3D_FEN)
  expect(chess.getHeaders()).toEqual({
    ...SEVEN_TAG_ROSTER,
    White: 'Magnus Carlsen',
    Black: 'Viswanathan Anand',
  })
})
