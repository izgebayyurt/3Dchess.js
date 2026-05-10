import { Chess } from '../src/chess'
import { describe, expect, it, test } from 'vitest'
import { fen2d_to_3d } from './utils'

describe('.load() / .fen() should be symmetric', () => {
  const validPositions2d = [
    'k7/8/8/8/8/8/8/7K w - - 0 1',
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',
    '1nbqkbn1/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/1NBQKBN1 b - - 1 2',
  ]

  const chess = new Chess()

  validPositions2d.forEach((fen2d) => {
    const fen = fen2d_to_3d(fen2d)
    it('fen - symmetry - ' + fen2d, () => {
      expect(() => chess.load(fen)).not.toThrow()
      expect(chess.fen()).toEqual(fen)
    })
  })
})

test('fen - ep square present only if en passant is legal (legal)', () => {
  const chess = new Chess(fen2d_to_3d('4k3/8/8/8/5p2/8/4P3/4K3 w - - 0 1'))
  chess.move('e4d')
  expect(chess.fen()).toEqual(fen2d_to_3d('4k3/8/8/8/4Pp2/8/8/4K3 b - e3 0 1'))
})

test('fen - ep square only if en passant is legal (illegal - pinned) - #1)', () => {
  const chess = new Chess(fen2d_to_3d('5k2/8/8/8/5p2/8/4P3/4KR2 w - - 0 1'))
  chess.move('e4d')
  expect(chess.fen()).toEqual(fen2d_to_3d('5k2/8/8/8/4Pp2/8/8/4KR2 b - - 0 1'))
})

test('fen - ep square only if en passant is legal (illegal - pinned - #2)', () => {
  // black queen pins the ep pawn, making ep illegal (submitted by @ajax333221)
  const chess = new Chess(
    fen2d_to_3d('rnb1kbn1/p1p1pp2/PpPp2qr/5Pp1/8/R1P4p/1PK1P1PP/1NBQ1BNR b - - 0 1'),
  )
  chess.move('e5d')
  expect(chess.fen()).toEqual(
    fen2d_to_3d('rnb1kbn1/p1p2p2/PpPp2qr/4pPp1/8/R1P4p/1PK1P1PP/1NBQ1BNR w - - 0 2'),
  )
})

test('fen - allow EP square to be included by option (pinned)', () => {
  // black queen pins the ep pawn, making ep illegal (submitted by @ajax333221)
  const chess = new Chess(
    fen2d_to_3d('rnb1kbn1/p1p1pp2/PpPp2qr/5Pp1/8/R1P4p/1PK1P1PP/1NBQ1BNR b - - 0 1'),
  )
  chess.move('e5d')
  expect(chess.fen({ forceEnpassantSquare: true })).toEqual(
    fen2d_to_3d('rnb1kbn1/p1p2p2/PpPp2qr/4pPp1/8/R1P4p/1PK1P1PP/1NBQ1BNR w - e6 0 2'),
  )
})

test('fen - allow EP square to be included by option (no capturing pawn)`', () => {
  // GitHub Issue #544
  const chess = new Chess(fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'))
  chess.move('h4d')

  expect(chess.fen({ forceEnpassantSquare: true })).toEqual(
    fen2d_to_3d('rnbqkbnr/pppppppp/8/8/7P/8/PPPPPPP1/RNBQKBNR b KQkq h3 0 1'),
  )
})
