import { Chess, type Square } from '../src/chess'
import { expect, test } from 'vitest'

test('squareColor should return light for light squares', () => {
  const chess = new Chess()
  expect(chess.squareColor('a8d')).toBe('light')
  expect(chess.squareColor('h1d')).toBe('light')
  expect(chess.squareColor('e4d')).toBe('light')
})

test('squareColor should return dark for dark squares', () => {
  const chess = new Chess()
  expect(chess.squareColor('a1d')).toBe('dark')
  expect(chess.squareColor('h8d')).toBe('dark')
  expect(chess.squareColor('d4d')).toBe('dark')
})

test('squareColor should return null for out of bounds squares', () => {
  const chess = new Chess()
  expect(chess.squareColor('h9' as Square)).toBeNull()
})
