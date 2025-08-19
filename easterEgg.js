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
let isPainting = false
let isErasing = false
let lastPaintedIdx = -1

for (let i = 0; i < 256; i++) {
  board.push(0)
}

//cached elements
const cells = [...document.querySelectorAll('#board > div')]
const palettes = [...document.querySelectorAll('#palette > div')]
const resetBtn = document.querySelector('#reset')
const srStatus = document.getElementById('sr-status')

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
    cellEl.setAttribute('role', 'gridcell')
    cellEl.setAttribute('tabindex', '0')
    cellEl.setAttribute('aria-label', `Cell ${cell + 1}, ${COLORS[arr]}`)
  })
}

const renderPalette = () => {
  palette.forEach((arr, sq) => {
    const sqId = `p${sq}`
    const sqEl = document.getElementById(sqId)
    sqEl.style.backgroundColor = COLORS[sq]
    sqEl.setAttribute('role', 'radio')
    sqEl.setAttribute('tabindex', sq === brush ? '0' : '-1')
    sqEl.setAttribute('aria-checked', sq === brush ? 'true' : 'false')
    sqEl.setAttribute('aria-label', `Choose ${COLORS[sq]}`)
  })
}
const renderControls = () => {}

const render = () => {
  renderBoard()
  renderPalette()
  renderControls()
}

const paintCellAtIndex = (cellIdx, colorIdx = brush) => {
  if (cellIdx < 0 || cellIdx >= board.length) return
  if (board[cellIdx] === colorIdx) return
  board[cellIdx] = colorIdx
}

handlePaint = (evt) => {
  const cellIdx = cells.indexOf(evt.target)
  paintCellAtIndex(cellIdx, isErasing ? 0 : brush)
  render()
}

handleBrush = (evt) => {
  const brushIdx = palettes.indexOf(evt.target)
  if (brushIdx === -1) return
  brush = brushIdx

  palettes.forEach((p) => p.classList.remove('selected'))
  evt.target.classList.add('selected')

  if (srStatus) srStatus.textContent = `Selected color ${COLORS[brush]}`
  render()
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
const boardEl = document.getElementById('board')
boardEl.addEventListener('click', handlePaint)
document.getElementById('palette').addEventListener('click', handleBrush)
resetBtn.addEventListener('click', resetBoard)

// Mouse drag-to-paint
const handleMouseDown = (evt) => {
  if (!evt.target.classList.contains('cell')) return
  isPainting = true
  isErasing = evt.button === 2
  const idx = cells.indexOf(evt.target)
  lastPaintedIdx = idx
  paintCellAtIndex(idx, isErasing ? 0 : brush)
  if (srStatus)
    srStatus.textContent = `Painted cell ${idx + 1} ${
      COLORS[isErasing ? 0 : brush]
    }`
  render()
}

const handleMouseOver = (evt) => {
  if (!isPainting) return
  if (!evt.target.classList.contains('cell')) return
  const idx = cells.indexOf(evt.target)
  if (idx === lastPaintedIdx) return
  lastPaintedIdx = idx
  paintCellAtIndex(idx, isErasing ? 0 : brush)
  if (srStatus)
    srStatus.textContent = `Painted cell ${idx + 1} ${
      COLORS[isErasing ? 0 : brush]
    }`
  render()
}

const stopPainting = () => {
  isPainting = false
  isErasing = false
  lastPaintedIdx = -1
}

boardEl.addEventListener('mousedown', handleMouseDown)
boardEl.addEventListener('mouseover', handleMouseOver)
document.addEventListener('mouseup', stopPainting)
// Prevent context menu on right-drag erase
boardEl.addEventListener('contextmenu', (e) => e.preventDefault())

// Touch drag-to-paint
const findCellIdxFromTouch = (touch) => {
  const el = document.elementFromPoint(touch.clientX, touch.clientY)
  if (!el || !el.classList || !el.classList.contains('cell')) return -1
  return cells.indexOf(el)
}

let touchEraserTimerId = null
let touchEraserActive = false

const handleTouchStart = (e) => {
  if (!e.touches || e.touches.length !== 1) return
  e.preventDefault()
  const idx = findCellIdxFromTouch(e.touches[0])
  if (idx === -1) return
  isPainting = true
  lastPaintedIdx = idx
  paintCellAtIndex(idx, touchEraserActive ? 0 : brush)
  if (srStatus)
    srStatus.textContent = `Painted cell ${idx + 1} ${
      COLORS[touchEraserActive ? 0 : brush]
    }`
  render()
  // Start long-press timer to enable eraser while holding
  touchEraserActive = false
  if (touchEraserTimerId) clearTimeout(touchEraserTimerId)
  touchEraserTimerId = setTimeout(() => {
    touchEraserActive = true
  }, 500)
}

const handleTouchMove = (e) => {
  if (!isPainting) return
  if (!e.touches || e.touches.length !== 1) return
  e.preventDefault()
  const idx = findCellIdxFromTouch(e.touches[0])
  if (idx === -1 || idx === lastPaintedIdx) return
  lastPaintedIdx = idx
  paintCellAtIndex(idx, touchEraserActive ? 0 : brush)
  if (srStatus)
    srStatus.textContent = `Painted cell ${idx + 1} ${
      COLORS[touchEraserActive ? 0 : brush]
    }`
  render()
}

const handleTouchEnd = () => {
  stopPainting()
  if (touchEraserTimerId) clearTimeout(touchEraserTimerId)
  touchEraserTimerId = null
  touchEraserActive = false
}

boardEl.addEventListener('touchstart', handleTouchStart, { passive: false })
boardEl.addEventListener('touchmove', handleTouchMove, { passive: false })
boardEl.addEventListener('touchend', handleTouchEnd, { passive: false })
boardEl.addEventListener('touchcancel', handleTouchEnd, { passive: false })
