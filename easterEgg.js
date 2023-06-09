//constants

const COLORS = {
  0: 'white',
  1: 'gray',
  2: 'red',
  3: 'orange',
  4: 'yellow',
  5: 'green',
  6: 'blue',
  7: 'purple',
  8: 'brown',
  9: 'black',
  10: 'khaki',
  11: 'yellowgreen',
  12: 'mediumturquoise',
  13: 'slateblue',
  14: 'violet',
  15: 'pink'
}

//state variables
let board = []
let palette = []
let paintColor
let brush = 0

for (let i = 0; i < 256; i++) {
  board.push(0)
}

//cached elements
const cells = [...document.querySelectorAll('#board > div')]
const palettes = [...document.querySelectorAll('#palette > div')]
const resetBtn = document.querySelector('#reset')

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
    sqEl.style.backgroundColor = COLORS[sq]
  })
}
const renderControls = () => {}

const render = () => {
  renderBoard()
  renderPalette()
  renderControls()
}

handlePaint = (evt) => {
  const cellIdx = cells.indexOf(evt.target)
  board[cellIdx] = brush
  render()
}

handleBrush = (evt) => {
  const brushIdx = palettes.indexOf(evt.target)
  brush = brushIdx
}

resetBoard = () => {
  let newArr = board.map((cell) => {
    return (cell = 0)
  })
  board = [...newArr]
  render()
}

init()

//event listeners
document.getElementById('board').addEventListener('click', handlePaint)
document.getElementById('palette').addEventListener('click', handleBrush)
resetBtn.addEventListener('click', resetBoard)
