import { Chess } from '../src/chess'
import { describe, expect, it } from 'vitest'

describe('Board Tests', () => {
  const tests = [
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR/64/64/64/64/64/64/64 w KQkq - 0 1',
      board: [
        [
          { square: 'a8a', type: 'r', color: 'b' },
          { square: 'b8a', type: 'n', color: 'b' },
          { square: 'c8a', type: 'b', color: 'b' },
          { square: 'd8a', type: 'q', color: 'b' },
          { square: 'e8a', type: 'k', color: 'b' },
          { square: 'f8a', type: 'b', color: 'b' },
          { square: 'g8a', type: 'n', color: 'b' },
          { square: 'h8a', type: 'r', color: 'b' },
        ],
        [
          { square: 'a7a', type: 'p', color: 'b' },
          { square: 'b7a', type: 'p', color: 'b' },
          { square: 'c7a', type: 'p', color: 'b' },
          { square: 'd7a', type: 'p', color: 'b' },
          { square: 'e7a', type: 'p', color: 'b' },
          { square: 'f7a', type: 'p', color: 'b' },
          { square: 'g7a', type: 'p', color: 'b' },
          { square: 'h7a', type: 'p', color: 'b' },
        ],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [
          { square: 'a2a', type: 'p', color: 'w' },
          { square: 'b2a', type: 'p', color: 'w' },
          { square: 'c2a', type: 'p', color: 'w' },
          { square: 'd2a', type: 'p', color: 'w' },
          { square: 'e2a', type: 'p', color: 'w' },
          { square: 'f2a', type: 'p', color: 'w' },
          { square: 'g2a', type: 'p', color: 'w' },
          { square: 'h2a', type: 'p', color: 'w' },
        ],
        [
          { square: 'a1a', type: 'r', color: 'w' },
          { square: 'b1a', type: 'n', color: 'w' },
          { square: 'c1a', type: 'b', color: 'w' },
          { square: 'd1a', type: 'q', color: 'w' },
          { square: 'e1a', type: 'k', color: 'w' },
          { square: 'f1a', type: 'b', color: 'w' },
          { square: 'g1a', type: 'n', color: 'w' },
          { square: 'h1a', type: 'r', color: 'w' },
        ],
      ],
    },
    // checkmate
    {
      fen: 'r3k2r/ppp2p1p/2n1p1p1/8/2B2P1q/2NPb1n1/PP4PP/R2Q3K w kq - 0 8',
      board: [
        [
          { square: 'a8a', type: 'r', color: 'b' },
          null,
          null,
          null,
          { square: 'e8a', type: 'k', color: 'b' },
          null,
          null,
          { square: 'h8a', type: 'r', color: 'b' },
        ],
        [
          { square: 'a7a', type: 'p', color: 'b' },
          { square: 'b7a', type: 'p', color: 'b' },
          { square: 'c7a', type: 'p', color: 'b' },
          null,
          null,
          { square: 'f7a', type: 'p', color: 'b' },
          null,
          { square: 'h7a', type: 'p', color: 'b' },
        ],
        [
          null,
          null,
          { square: 'c6a', type: 'n', color: 'b' },
          null,
          { square: 'e6a', type: 'p', color: 'b' },
          null,
          { square: 'g6a', type: 'p', color: 'b' },
          null,
        ],
        [null, null, null, null, null, null, null, null],
        [
          null,
          null,
          { square: 'c4a', type: 'b', color: 'w' },
          null,
          null,
          { square: 'f4a', type: 'p', color: 'w' },
          null,
          { square: 'h4a', type: 'q', color: 'b' },
        ],
        [
          null,
          null,
          { square: 'c3a', type: 'n', color: 'w' },
          { square: 'd3a', type: 'p', color: 'w' },
          { square: 'e3a', type: 'b', color: 'b' },
          null,
          { square: 'g3a', type: 'n', color: 'b' },
          null,
        ],
        [
          { square: 'a2a', type: 'p', color: 'w' },
          { square: 'b2a', type: 'p', color: 'w' },
          null,
          null,
          null,
          null,
          { square: 'g2a', type: 'p', color: 'w' },
          { square: 'h2a', type: 'p', color: 'w' },
        ],
        [
          { square: 'a1a', type: 'r', color: 'w' },
          null,
          null,
          { square: 'd1a', type: 'q', color: 'w' },
          null,
          null,
          null,
          { square: 'h1a', type: 'k', color: 'w' },
        ],
      ],
    },
  ]

  tests.forEach(({ fen, board }) => {
    it('Board - ' + fen, () => {
      const chess = new Chess(fen)
      expect(chess.board()).toEqual(board)
    })
  })
})
