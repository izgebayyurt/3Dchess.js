import { readFileSync } from 'fs'
import { join } from 'path'

export function split(s: string) {
  return s.split(/\s+|\n/)
}

export function diffChars(str1: string, str2: string) {
  let diff = ''
  const maxLength = Math.max(str1.length, str2.length)

  for (let i = 0; i < maxLength; i++) {
    if (str1[i] !== str2[i]) {
      diff += `(${str1[i] || ''} -> ${str2[i] || ''})`
    }
  }
  return diff
}

export function fileToString(filename: string) {
  /*
   * POSIX 3.206 defines a line as `a sequence of zero or more non- <newline>
   * characters plus a terminating <newline> character`, so strip the trailing
   * newline after reading (w/ slice).
   */
  return readFileSync(join(__dirname, './', filename))
    .toString()
    .slice(0, -1)
}

export const SEVEN_TAG_ROSTER_STRING = `[Event "?"]
[Site "?"]
[Date "????.??.??"]
[Round "?"]
[White "?"]
[Black "?"]
[Result "*"]
`

export function fen2d_to_3d(fen2d: string): string {
  const parts = fen2d.split(' ')
  const rows2d = parts[0].split('/') // 8 rows, rank8→rank1
  const layerD = [...rows2d].reverse().join('/') // rank1→rank8
  const empty8 = '8/8/8/8/8/8/8/8'
  const board3d = `${empty8}/${empty8}/${empty8}/${layerD}/${empty8}/${empty8}/${empty8}/${empty8}`
  // update en-passant square
  const ep = parts[3] !== '-' ? parts[3] + 'd' : '-'
  return [board3d, parts[1], parts[2], ep, parts[4], parts[5]].join(' ')
}

// Builds a 3D FEN from a layer-d 8-row position string (rank1→rank8) plus standard fields
export function layerDFen(layerDRows: string, rest = 'w KQkq - 0 1'): string {
  const empty8 = '8/8/8/8/8/8/8/8'
  const board = `${empty8}/${empty8}/${empty8}/${layerDRows}/${empty8}/${empty8}/${empty8}/${empty8}`
  return `${board} ${rest}`
}
