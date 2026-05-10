import { Chess } from '../src/chess'
import { describe, expect, it } from 'vitest'
import { fen2d_to_3d } from './utils'

describe('Board Tests', () => {
  const tests = [
    {
      fen: fen2d_to_3d('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'),
      board: [
        [
          { square: 'a8d', type: 'r', color: 'b' },
          { square: 'b8d', type: 'n', color: 'b' },
          { square: 'c8d', type: 'b', color: 'b' },
          { square: 'd8d', type: 'q', color: 'b' },
          { square: 'e8d', type: 'k', color: 'b' },
          { square: 'f8d', type: 'b', color: 'b' },
          { square: 'g8d', type: 'n', color: 'b' },
          { square: 'h8d', type: 'r', color: 'b' },
        ],
        [
          { square: 'a7d', type: 'p', color: 'b' },
          { square: 'b7d', type: 'p', color: 'b' },
          { square: 'c7d', type: 'p', color: 'b' },
          { square: 'd7d', type: 'p', color: 'b' },
          { square: 'e7d', type: 'p', color: 'b' },
          { square: 'f7d', type: 'p', color: 'b' },
          { square: 'g7d', type: 'p', color: 'b' },
          { square: 'h7d', type: 'p', color: 'b' },
        ],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [
          { square: 'a2d', type: 'p', color: 'w' },
          { square: 'b2d', type: 'p', color: 'w' },
          { square: 'c2d', type: 'p', color: 'w' },
          { square: 'd2d', type: 'p', color: 'w' },
          { square: 'e2d', type: 'p', color: 'w' },
          { square: 'f2d', type: 'p', color: 'w' },
          { square: 'g2d', type: 'p', color: 'w' },
          { square: 'h2d', type: 'p', color: 'w' },
        ],
        [
          { square: 'a1d', type: 'r', color: 'w' },
          { square: 'b1d', type: 'n', color: 'w' },
          { square: 'c1d', type: 'b', color: 'w' },
          { square: 'd1d', type: 'q', color: 'w' },
          { square: 'e1d', type: 'k', color: 'w' },
          { square: 'f1d', type: 'b', color: 'w' },
          { square: 'g1d', type: 'n', color: 'w' },
          { square: 'h1d', type: 'r', color: 'w' },
        ],
      ],
    },
    // checkmate
    {
      fen: fen2d_to_3d('r3k2r/ppp2p1p/2n1p1p1/8/2B2P1q/2NPb1n1/PP4PP/R2Q3K w kq - 0 8'),
      board: [
        [
          { square: 'a8d', type: 'r', color: 'b' },
          null,
          null,
          null,
          { square: 'e8d', type: 'k', color: 'b' },
          null,
          null,
          { square: 'h8d', type: 'r', color: 'b' },
        ],
        [
          { square: 'a7d', type: 'p', color: 'b' },
          { square: 'b7d', type: 'p', color: 'b' },
          { square: 'c7d', type: 'p', color: 'b' },
          null,
          null,
          { square: 'f7d', type: 'p', color: 'b' },
          null,
          { square: 'h7d', type: 'p', color: 'b' },
        ],
        [
          null,
          null,
          { square: 'c6d', type: 'n', color: 'b' },
          null,
          { square: 'e6d', type: 'p', color: 'b' },
          null,
          { square: 'g6d', type: 'p', color: 'b' },
          null,
        ],
        [null, null, null, null, null, null, null, null],
        [
          null,
          null,
          { square: 'c4d', type: 'b', color: 'w' },
          null,
          null,
          { square: 'f4d', type: 'p', color: 'w' },
          null,
          { square: 'h4d', type: 'q', color: 'b' },
        ],
        [
          null,
          null,
          { square: 'c3d', type: 'n', color: 'w' },
          { square: 'd3d', type: 'p', color: 'w' },
          { square: 'e3d', type: 'b', color: 'b' },
          null,
          { square: 'g3d', type: 'n', color: 'b' },
          null,
        ],
        [
          { square: 'a2d', type: 'p', color: 'w' },
          { square: 'b2d', type: 'p', color: 'w' },
          null,
          null,
          null,
          null,
          { square: 'g2d', type: 'p', color: 'w' },
          { square: 'h2d', type: 'p', color: 'w' },
        ],
        [
          { square: 'a1d', type: 'r', color: 'w' },
          null,
          null,
          { square: 'd1d', type: 'q', color: 'w' },
          null,
          null,
          null,
          { square: 'h1d', type: 'k', color: 'w' },
        ],
      ],
    },
  ]

  tests.forEach(({ fen, board }) => {
    it('Board - ' + fen.split(' ')[0].substring(0, 30) + '...', () => {
      const chess = new Chess(fen)
      expect(chess.board('d')).toEqual(board)
    })
  })
})
