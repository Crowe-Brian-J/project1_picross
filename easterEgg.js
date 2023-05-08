//constants

const COLORS = {
  0: 'white',
  1: 'brown',
  2: 'red',
  3: 'orange',
  4: 'yellow',
  5: 'green',
  6: 'blue',
  7: 'purple',
  8: 'gray',
  9: 'black',
  10: 'darkred',
  11: 'darkorange',
  12: 'darkyellow',
  13: 'darkgreen',
  14: 'darkblue',
  15: 'darkpurple'
}

//state variables
let board = []
let palette
let paintColor

for (let i = 0; i < 256; i++) {
  board.push(0)
}

//cached elements
const resetBtn = document.querySelector('#reset')
const paletteColors = [...document.querySelectorAll('#palette > div')]
const cells = [...document.querySelectorAll('#board > div')]

//functions
const init = () => {
  for (let i = 0; i < board.length; i++) {
    board[i] = 0
  }
  palette = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  render()
}

const renderBoard = () => {
  board.forEach((arr, cell) => {
    const cellId = `cell${cell}`
    const cellEl = document.getElementById(cellId)
    cellEl.style.backgroundColor = COLORS[arr]
  })
}

const renderPalette = () => {
  palette.forEach((arr, sq) => {
    const sqId = `p${sq}`
    const sqEl = document.getElementById(sqId)
    sq.style.backgroundColor = COLORS[sqEl]
    console.log(COLORS[sq])
  })
}
const renderControls = () => {}

const render = () => {
  renderBoard()
  renderPalette()
  renderControls()
}
/*---- May need to set these to two separate functions, one to suck up paint color, one to paint cell ----*/
handlePaint = (evt) => {
  const cellIdx = cells.indexOf(evt.target)
  const paletteIdx = paletteColors.indexOf(evt.target)
  if (board[cellIdx] === palette[paletteIdx]) {
    board[(cellIdx = 0)]
    render()
    return
  }
  board[cellIdx] = palette[paletteIdx]
  render()
}

init()
//event listeners
document.getElementById('board').addEventListener('click', handlePaint)
document.getElementById('palette').addEventListener('click', handlePaint)
