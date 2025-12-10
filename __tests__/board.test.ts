import { Chess3D } from '../src/chess'
import { describe, expect, it } from 'vitest'

describe('Board Tests', () => {
  const tests = [
    {
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      board: [
        [
          { square: '1a8', type: 'r', color: 'b' },
          { square: '1b8', type: 'n', color: 'b' },
          { square: '1c8', type: 'b', color: 'b' },
          { square: '1d8', type: 'q', color: 'b' },
          { square: '1e8', type: 'k', color: 'b' },
          { square: '1f8', type: 'b', color: 'b' },
          { square: '1g8', type: 'n', color: 'b' },
          { square: '1h8', type: 'r', color: 'b' },
        ],
        [
          { square: '1a7', type: 'p', color: 'b' },
          { square: '1b7', type: 'p', color: 'b' },
          { square: '1c7', type: 'p', color: 'b' },
          { square: '1d7', type: 'p', color: 'b' },
          { square: '1e7', type: 'p', color: 'b' },
          { square: '1f7', type: 'p', color: 'b' },
          { square: '1g7', type: 'p', color: 'b' },
          { square: '1h7', type: 'p', color: 'b' },
        ],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [
          { square: '1a2', type: 'p', color: 'w' },
          { square: '1b2', type: 'p', color: 'w' },
          { square: '1c2', type: 'p', color: 'w' },
          { square: '1d2', type: 'p', color: 'w' },
          { square: '1e2', type: 'p', color: 'w' },
          { square: '1f2', type: 'p', color: 'w' },
          { square: '1g2', type: 'p', color: 'w' },
          { square: '1h2', type: 'p', color: 'w' },
        ],
        [
          { square: '1a1', type: 'r', color: 'w' },
          { square: '1b1', type: 'n', color: 'w' },
          { square: '1c1', type: 'b', color: 'w' },
          { square: '1d1', type: 'q', color: 'w' },
          { square: '1e1', type: 'k', color: 'w' },
          { square: '1f1', type: 'b', color: 'w' },
          { square: '1g1', type: 'n', color: 'w' },
          { square: '1h1', type: 'r', color: 'w' },
        ],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null]
      ],
    }
    /*// checkmate
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
    },*/
  ]

  tests.forEach(({ fen, board }) => {
    it('Board - ' + fen, () => {
      const chess = new Chess3D(fen)
      console.log(chess.board())
      expect(chess.board()).toEqual(board)
    })
  })
})
