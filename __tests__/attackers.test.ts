import { Chess, WHITE, BLACK } from '../src/chess'
import { expect, test } from 'vitest'

/*
 * NOTE: 3D board uses three-character squares (e.g., c5d). Legacy 8-row FENs
 * load onto layer 'a'. Tests below use explicit squares on layer 'a' unless
 * otherwise specified.
 */

// 3D-specific: rook/bishop/queen/knight/pawn attackers across planes

test('attackers - rook attacks along file, rank, and layer planes', () => {
  const chess = new Chess()

  chess.clear()
  chess.put({ type: 'r', color: WHITE }, 'c5b')
  chess.put({ type: 'k', color: WHITE }, 'a1a')
  chess.put({ type: 'k', color: BLACK }, 'h1a')

  console.log(chess.fen())

  // Same layer (rank and file)
  expect(chess.attackers('c1b', WHITE)).to.have.members(['c5b'])
  expect(chess.attackers('c8b', WHITE)).to.have.members(['c5b'])
  expect(chess.attackers('a5b', WHITE)).to.have.members(['c5b'])
  expect(chess.attackers('h5b', WHITE)).to.have.members(['c5b'])

  // Across layers along the same file/rank coordinates
  expect(chess.attackers('c5h', WHITE)).to.have.members(['c5b'])
  expect(chess.attackers('c5a', WHITE)).to.have.members(['c5b'])
})
test('attackers - bishop attacks diagonals in all three orthogonal planes', () => {
  const chess = new Chess()
  chess.clear()
  chess.put({ type: 'k', color: WHITE }, 'a1a')
  chess.put({ type: 'k', color: BLACK }, 'h1a')
  chess.put({ type: 'b', color: WHITE }, 'c5d')

  // File-rank plane diagonals
  expect(chess.attackers('b4d', WHITE)).to.have.members(['c5d'])
  expect(chess.attackers('d6d', WHITE)).to.have.members(['c5d'])

  // File-layer plane diagonals (same rank, +/-file, +/-layer)
  expect(chess.attackers('b5c', WHITE)).to.have.members(['c5d'])
  expect(chess.attackers('d5e', WHITE)).to.have.members(['c5d'])

  // Rank-layer plane diagonals (same file, +/-rank, +/-layer)
  expect(chess.attackers('c4c', WHITE)).to.have.members(['c5d'])
  expect(chess.attackers('c6e', WHITE)).to.have.members(['c5d'])
})

test('attackers - knights attack with L-shapes on any plane', () => {
  const chess = new Chess()
  chess.clear()
  chess.put({ type: 'k', color: WHITE }, 'a1a')
  chess.put({ type: 'k', color: BLACK }, 'h1a')
  chess.put({ type: 'n', color: WHITE }, 'd4d')

  // File-rank plane
  expect(chess.attackers('e6d', WHITE)).to.have.members(['d4d'])
  // File-layer plane
  expect(chess.attackers('f4e', WHITE)).to.have.members(['d4d'])
  // Rank-layer plane
  expect(chess.attackers('d6e', WHITE)).to.have.members(['d4d'])
})

test('attackers - pawns attack forward- and upward-diagonals', () => {
  const chess = new Chess()
  chess.clear()
  chess.put({ type: 'k', color: WHITE }, 'a1a')
  chess.put({ type: 'k', color: BLACK }, 'h1a')
  chess.put({ type: 'p', color: WHITE }, 'e2a')
  chess.put({ type: 'p', color: BLACK }, 'e7h')

  // White forward-diagonal attacks on same layer
  expect(chess.attackers('d3a', WHITE)).to.have.members(['e2a'])
  expect(chess.attackers('f3a', WHITE)).to.have.members(['e2a'])

  // White upward-diagonal attacks across layers
  expect(chess.attackers('d2b', WHITE)).to.have.members(['e2a'])
  expect(chess.attackers('f2b', WHITE)).to.have.members(['e2a'])

  // Black pawn mirrored (from e7a)
  expect(chess.attackers('d6h', BLACK)).to.have.members(['e7h'])
  expect(chess.attackers('f6h', BLACK)).to.have.members(['e7h'])
  expect(chess.attackers('d7g', BLACK)).to.have.members(['e7h'])
  expect(chess.attackers('f7g', BLACK)).to.have.members(['e7h'])
})


test('attackers - return value depends on side to move', () => {
  const chess = new Chess()
  expect(chess.attackers('c3a')).to.have.members(['b1a', 'b2a', 'd2a'])
  expect(chess.attackers('c6a')).toEqual([])

  chess.move({from: "e2a", to: "e4a"})
  expect(chess.attackers('c3a')).toEqual([])
  expect(chess.attackers('c6h')).to.have.members(['b7h', 'b8h', 'd7h'])

  chess.move({from: "e7h", to: "e5h"})
  expect(chess.attackers('c3a')).to.have.members(['b1a', 'b2a', 'd2a'])
  expect(chess.attackers('c6h')).toEqual([])
})

 test('attackers - every piece attacking empty square', () => {
  const chess = new Chess('2b5/4kp2/2r5/3q2n1/8/8/4P3/4K3 w - - 0 1')
  expect(chess.attackers('e6a', BLACK)).to.have.members([
    'c6a',
    'c8a',
    'd5a',
    'e7a',
    'f7a',
    'g5a',
  ])
})

 test('attackers - every piece attacking another piece', () => {
  const chess = new Chess('4k3/8/8/8/5Q2/5p1R/4PK2/4N2B w - - 0 1')
  expect(chess.attackers('f3a')).to.have.members([
    'e1a',
    'e2a',
    'f2a',
    'f4a',
    'h1a',
    'h3a',
  ])
})

 test('attackers - every piece defending empty square', () => {
  const chess = new Chess('B3k3/8/8/2K4R/3QPN2/8/8/8 w - - 0 1')
  expect(chess.attackers('d5a', WHITE)).to.have.members([
    'a8a',
    'c5a',
    'd4a',
    'e4a',
    'f4a',
    'h5a',
  ])
})

 test('attackers - every piece defending another piece', () => {
  const chess = new Chess('2r5/1b1p4/1kp1q3/4n3/8/8/8/4K3 b - - 0 1')
  expect(chess.attackers('c6a')).to.have.members([
    'b6a',
    'b7a',
    'c8a',
    'd7a',
    'e5a',
    'e6a',
  ])
})

 test('attackers - pinned pieces still attack and defend', () => {
  // knight on c3 is pinned, but it is still attacking d4 and defending e5
  const chess = new Chess(
    'r1bqkbnr/ppp2ppp/2np4/1B2p3/3PP3/5N2/PPP2PPP/RNBQK2R b KQkq - 0 4',
  )
  expect(chess.attackers('d4a', BLACK)).to.have.members(['c6a', 'e5a'])
  expect(chess.attackers('e5a', BLACK)).to.have.members(['c6a', 'd6a'])
})

 test('attackers - king can "attack" defended piece', () => {
  const chess = new Chess('3k4/8/8/8/3b4/3R4/4Pq2/4K3 w - - 0 1')
  expect(chess.attackers('f2a', WHITE)).to.have.members(['e1a'])
})

 test('attackers - a lot of attackers', () => {
  const chess = new Chess(
    '5k2/8/3N1N2/2NBQQN1/3R1R2/2NPRPN1/3N1N2/4K3 w - - 0 1',
  )
  expect(chess.attackers('e4a', WHITE)).to.have.members([
    'c3a',
    'c5a',
    'd2a',
    'd3a',
    'd4a',
    'd5a',
    'd6a',
    'e3a',
    'e5a',
    'f2a',
    'f3a',
    'f4a',
    'f5a',
    'f6a',
    'g3a',
    'g5a',
  ])
})

 test('attackers - no attackers', () => {
  const chess = new Chess()
  expect(chess.attackers('e4a', WHITE)).toEqual([])
})

 test('attackers - readme tests', () => {
  const chess = new Chess()
  expect(chess.attackers('f3a')).to.have.members(['e2a', 'g2a', 'g1a'])
  expect(chess.attackers('e2a')).to.have.members(['d1a', 'e1a', 'f1a', 'g1a'])
  expect(chess.attackers('f6a')).to.have.members([])
   chess.move({from: "e2a", to: "e4a"})
  expect(chess.attackers('f6h')).to.have.members(['g8h', 'e7h', 'g7h'])
  expect(chess.attackers('f3a', WHITE)).to.have.members(['g2a', 'd1a', 'g1a'])
  chess.load('4k3/4n3/8/8/8/8/4R3/4K3/64/64/64/64/64/64 w - - 0 1')
  expect(chess.attackers('c6a', BLACK)).to.have.members(['e7a'])
})
