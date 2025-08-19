'use strict'
/* ----- constants ----- */
const MARKS = {
  0: '#9bbc0f', //blank
  1: '#0f380f', //marked
  '-1': 'rgba(48, 98, 48, 0.5)' //marked empty
}
//solutions and clues for puzzles
const PUZZLES = [
  {
    name: 'a heart',
    solution: [
      1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0
    ],
    topClue: [3, 4, 4, 4, 3],
    leftClue: [[2, 2], 5, 5, 3, 1]
  },
  {
    name: 'a skull',
    solution: [
      0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0
    ],
    topClue: [2, [2, 2], 4, [2, 2], 2],
    leftClue: [3, 5, [1, 1, 1], 3, [1, 1]]
  },
  {
    name: 'a boat',
    solution: [
      0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0
    ],
    topClue: [1, 2, 5, [2, 2], [1, 1]],
    leftClue: [2, 3, 1, 5, 3]
  },
  {
    name: 'a capital a',
    solution: [
      0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1
    ],
    topClue: [3, [1, 1], [1, 1], [1, 1], 3],
    leftClue: [1, [1, 1], [1, 1], 5, [1, 1]]
  },
  {
    name: 'a capital z',
    solution: [
      1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1
    ],
    topClue: [
      [2, 1],
      [1, 2],
      [1, 1, 1],
      [2, 1],
      [1, 2]
    ],
    leftClue: [5, [1, 1], 1, [1, 1], 5]
  }
]

/* ----- state variables ----- */
let board
let winner
let check = 0

let puzzle = 0 // Iterator for which puzzle user is playing.
let clicker = 1 // set to 1 initially, -1 if marking blank
let lastCheckCorrectCells = null

/* ----- cached elements ----- */
const messageEl = document.querySelector('h1')
const resetBtn = document.querySelector('#reset')
const checkBtn = document.querySelector('#check')
const newPuzzBtn = document.querySelector('#newPuzzle')
const filledBtn = document.querySelector('#toggleFilled')
const blankBtn = document.querySelector('#toggleBlank')
const boardAdd = document.querySelector('#board')
let diceCheck = document.querySelector('h3')
const cells = [...document.querySelectorAll('#board > div')]
const instructionBtn = document.querySelector('#instruction')
const instructionModal = document.querySelector('#instructionModal')
const modalCloseBtn = document.querySelector('#modalClose')
const instructionText = document.querySelector('#instructionText')

// Accessibility: identify grid, make cells focusable and screen-reader friendly
boardAdd && boardAdd.setAttribute('role', 'grid')
cells.forEach((cell, idx) => {
  cell.setAttribute('tabindex', '0')
  cell.setAttribute('role', 'gridcell')
})

/* ----- functions ----- */
const init = () => {
  board = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]
  winner = null
  render()
  updateToggleAria()
}

const renderBoard = () => {
  board.forEach((arr, cell) => {
    const cellId = `cell${cell}`
    const cellEl = document.getElementById(cellId)
    cellEl.style.backgroundColor = MARKS[arr]
    if (MARKS[arr] === 'rgba(48, 98, 48, 0.5)') {
      cellEl.innerText = 'X'
      cellEl.classList.add('xmark')
    }
    if (MARKS[arr] !== 'rgba(48, 98, 48, 0.5)') {
      //clears X
      cellEl.innerText = ''
      cellEl.classList.remove('xmark')
    }
    const stateLabel =
      arr === 1 ? 'filled' : arr === -1 ? 'marked empty' : 'blank'
    cellEl.setAttribute('aria-label', `Cell ${cell + 1} ${stateLabel}`)
  })

  //DRYer Code - Defining repeatable code for each set of clues
  const clueDiv = (clue, id) => {
    const clueEl = document.getElementById(id)
    let longClue = ''
    if (clue.length > 1) {
      clue.forEach((cl, idx2) => {
        longClue += `<div>${cl}</div>`
      })
    } else {
      longClue = `<div>${clue}</div>`
    }
    clueEl.innerHTML = longClue
  }

  PUZZLES[puzzle].topClue.forEach((clue, idx) => {
    const clueId = `col${idx}`
    clueDiv(clue, clueId)
  })

  PUZZLES[puzzle].leftClue.forEach((clue, idx) => {
    const clueId = `row${idx}`
    clueDiv(clue, clueId)
  })
}

const renderMessage = () => {
  if (winner) {
    messageEl.style.backgroundColor = '#306230'
    messageEl.style.color = '#9bbc0f'
    messageEl.innerHTML = `You won! It's ${PUZZLES[puzzle].name}!`
  } else if (check) {
    messageEl.style.backgroundColor = '#9bbc0f'
    messageEl.style.color = '#0f380f'
    const summary =
      typeof lastCheckCorrectCells === 'number'
        ? ` — ${lastCheckCorrectCells}/25 cells match`
        : ''
    messageEl.innerHTML = `Not correct yet, try again${summary}`
  } else {
    messageEl.style.backgroundColor = '#9bbc0f'
    messageEl.style.color = '#0f380f'
    messageEl.innerHTML = "What's it supposed to be?"
  }
}

const renderControls = () => {
  resetBtn.style.visibility = winner ? 'hidden' : 'visible'
  newPuzzBtn.style.visibility = winner ? 'visible' : 'hidden'
}

const render = () => {
  renderBoard()
  renderMessage()
  renderControls()
}

const generateBoard = () => {
  // refactor
  let abstractBoard = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]

  for (let i = 0; i < abstractBoard.length; i++) {
    abstractBoard[i] = Math.floor(Math.random() * 2)
  }
  return abstractBoard
}

const topClueGen = (abBoard) => {
  const compArray = []
  let simpArray0 = []
  let simpArray1 = []
  let simpArray2 = []
  let simpArray3 = []
  let simpArray4 = []

  let simpNum0 = 0
  let simpNum1 = 0
  let simpNum2 = 0
  let simpNum3 = 0
  let simpNum4 = 0

  for (let i = 0; i < abBoard.length; i++) {
    switch (i) {
      case 0:
      case 5:
      case 10:
      case 15:
      case 20:
        //only above i cases apply to topClue[0] in abstract board --> Also applies to boards below
        if (abBoard[i] === 1) simpNum0++
        if (abBoard[i] === 0) {
          if (simpNum0 > 0) simpArray0.push(simpNum0)
          simpNum0 = 0 //revert to 0 to construct next clue
        }
        if (i === 20) {
          if (simpArray0.length === 0 || simpNum0 > 0) simpArray0.push(simpNum0)
        }
        break
      case 1:
      case 6:
      case 11:
      case 16:
      case 21:
        if (abBoard[i] === 1) simpNum1++
        if (abBoard[i] === 0) {
          if (simpNum1 > 0) simpArray1.push(simpNum1)
          simpNum1 = 0
        }
        if (i === 21) {
          if (simpArray1.length === 0 || simpNum1 > 0) simpArray1.push(simpNum1)
        }
        break
      case 2:
      case 7:
      case 12:
      case 17:
      case 22:
        if (abBoard[i] === 1) simpNum2++
        if (abBoard[i] === 0) {
          if (simpNum2 > 0) simpArray2.push(simpNum2)
          simpNum2 = 0
        }
        if (i === 22) {
          if (simpArray2.length === 0 || simpNum2 > 0) simpArray2.push(simpNum2)
        }
        break
      case 3:
      case 8:
      case 13:
      case 18:
      case 23:
        if (abBoard[i] === 1) simpNum3++
        if (abBoard[i] === 0) {
          if (simpNum3 > 0) simpArray3.push(simpNum3)
          simpNum3 = 0
        }
        if (i === 23) {
          if (simpArray3.length === 0 || simpNum3 > 0) simpArray3.push(simpNum3)
        }
        break
      case 4:
      case 9:
      case 14:
      case 19:
      case 24:
        if (abBoard[i] === 1) simpNum4++
        if (abBoard[i] === 0) {
          if (simpNum4 > 0) simpArray4.push(simpNum4)
          simpNum4 = 0
        }
        if (i === 24) {
          if (simpArray4.length === 0 || simpNum4 > 0) simpArray4.push(simpNum4)
        }
        break
      default:
        break
    }
  }
  compArray.push(simpArray0)
  compArray.push(simpArray1)
  compArray.push(simpArray2)
  compArray.push(simpArray3)
  compArray.push(simpArray4)

  return compArray
}

const leftClueGen = (abBoard) => {
  const compArray = []
  let simpArray = []
  let simpNum = 0
  for (let i = 0; i < abBoard.length; i++) {
    if (abBoard[i] === 1) {
      simpNum++
    }
    if (abBoard[i] === 0) {
      if (simpNum > 0) {
        simpArray.push(simpNum)
      }
      simpNum = 0
    }
    if (i === 4 || i === 9 || i === 14 || i === 19 || i === 24) {
      if (simpArray.length === 0 || simpNum > 0) {
        simpArray.push(simpNum)
      }
      compArray.push(simpArray)
      simpArray = []
      simpNum = 0
    }
  }
  return compArray
}

const generatePuzzle = () => {
  const namePuzz = 'abstract'
  let abBoard = generateBoard()
  let tClue = topClueGen(abBoard)
  let lClue = leftClueGen(abBoard)

  let puzzObj = {
    name: namePuzz,
    solution: abBoard,
    topClue: tClue,
    leftClue: lClue
  }

  return puzzObj
}

const checkPuzzle = () => {
  let checkTotal = 0
  let checkBoard = [...board] //cloning the array so that when I change the -1 value it doesn't mutate the board

  for (let i = 0; i < checkBoard.length; i++) {
    if (checkBoard[i] === -1) {
      checkBoard[i] = 0
    }
  }
  for (let i = 0; i < checkBoard.length; i++) {
    if (PUZZLES[puzzle].solution[i] === checkBoard[i]) {
      checkTotal++
    }
  }
  if (checkTotal === 25) {
    winner = 1
    check = 0
    lastCheckCorrectCells = null
    render()
  } else {
    check++
    lastCheckCorrectCells = checkTotal
    render()
  }
}

const nextPuzzle = () => {
  if (puzzle >= 4) {
    PUZZLES.push(generatePuzzle())
  }
  if (puzzle >= 7) {
    let diceRoll = Math.floor(Math.random() * 7)
    if (diceRoll > 5) {
      diceCheck.style.visibility = 'visible'
    } else {
      diceCheck.style.visibility = 'hidden'
    }
  }
  puzzle++
  board = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]
  render()
  winner = null
  init()
}

const handlePlacement = (evt) => {
  if (winner) return
  const cellIdx = cells.indexOf(evt.target)
  //Guards
  if (board[cellIdx] === 1 || board[cellIdx] === -1) {
    board[cellIdx] = 0
    render()
    return
  }
  board[cellIdx] = clicker
  render()
}

const resetGame = () => {
  board = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]
  render()
}

const markBlank = () => {
  clicker = -1
  filledBtn.style.color = '#0f380f'
  filledBtn.style.backgroundColor = '#9bbc0f'
  blankBtn.style.color = '#9bbc0f'
  blankBtn.style.backgroundColor = '#0f380f'
  updateToggleAria()
}

const markFilled = () => {
  clicker = 1
  filledBtn.style.color = '#9bbc0f'
  filledBtn.style.backgroundColor = '#0f380f'
  blankBtn.style.color = '#0f380f'
  blankBtn.style.backgroundColor = '#9bbc0f'
  updateToggleAria()
}

const updateToggleAria = () => {
  if (filledBtn)
    filledBtn.setAttribute('aria-pressed', clicker === 1 ? 'true' : 'false')
  if (blankBtn)
    blankBtn.setAttribute('aria-pressed', clicker === -1 ? 'true' : 'false')
}

init()

/* ----- event listeners ----- */
document.getElementById('board').addEventListener('click', handlePlacement)
resetBtn.addEventListener('click', resetGame)
checkBtn.addEventListener('click', checkPuzzle)
filledBtn.addEventListener('click', markFilled)
blankBtn.addEventListener('click', markBlank)
newPuzzBtn.addEventListener('click', nextPuzzle)

// Keyboard support for grid interaction
const handleKeyPlacement = (evt) => {
  if (
    (evt.key === 'Enter' || evt.key === ' ') &&
    evt.target.classList.contains('cell')
  ) {
    evt.preventDefault()
    handlePlacement({ target: evt.target })
  }
}
boardAdd.addEventListener('keydown', handleKeyPlacement)

// Right-click to mark blank (context menu)
const handleRightClick = (evt) => {
  if (winner) return
  if (!(evt.target && evt.target.classList.contains('cell'))) return
  evt.preventDefault()
  // If a long-press just occurred, ignore the follow-up contextmenu event (mobile)
  if (Date.now() - lastLongPressAt < 700) return
  const cellIdx = cells.indexOf(evt.target)
  if (cellIdx === -1) return
  // Toggle blank marking with right-click
  board[cellIdx] = board[cellIdx] === -1 ? 0 : -1
  render()
  // Prevent the subsequent synthetic click from undoing the change
  suppressNextClick = true
}
boardAdd.addEventListener('contextmenu', handleRightClick)

// Long-press on touch to mark blank
let longPressTimerId = null
let longPressActive = false
let longPressCellIdx = -1
let suppressNextClick = false
let lastLongPressAt = 0

// Also support touch events explicitly to better control default click behavior
let touchTimerId = null
let touchLongPressActive = false
let touchCellIdx = -1
let touchStartX = 0
let touchStartY = 0
const TOUCH_MOVE_CANCEL_PX = 10

const clearLongPress = () => {
  if (longPressTimerId) {
    clearTimeout(longPressTimerId)
    longPressTimerId = null
  }
}

const handlePointerDown = (evt) => {
  if (winner) return
  if (evt.pointerType !== 'touch') return
  const targetCell =
    evt.target && evt.target.classList && evt.target.classList.contains('cell')
      ? evt.target
      : null
  if (!targetCell) return
  const cellIdx = cells.indexOf(targetCell)
  if (cellIdx === -1) return
  clearLongPress()
  longPressActive = false
  longPressCellIdx = cellIdx
  longPressTimerId = setTimeout(() => {
    longPressActive = true
  }, 500)
}

const handlePointerUpOrCancel = () => {
  if (longPressTimerId) {
    clearLongPress()
  }
  if (longPressActive) {
    if (longPressCellIdx !== -1) {
      board[longPressCellIdx] = board[longPressCellIdx] === -1 ? 0 : -1
      render()
      lastLongPressAt = Date.now()
    }
    suppressNextClick = true
  }
  longPressActive = false
  longPressCellIdx = -1
}

boardAdd.addEventListener('pointerdown', handlePointerDown)
boardAdd.addEventListener('pointerup', handlePointerUpOrCancel)
boardAdd.addEventListener('pointercancel', handlePointerUpOrCancel)
boardAdd.addEventListener('pointerleave', handlePointerUpOrCancel)

// Suppress click after a long-press
const originalHandlePlacement = handlePlacement
const handlePlacementWrapped = (evt) => {
  if (suppressNextClick) {
    suppressNextClick = false
    return
  }
  originalHandlePlacement(evt)
}
document.getElementById('board').removeEventListener('click', handlePlacement)
document
  .getElementById('board')
  .addEventListener('click', handlePlacementWrapped)

// Touch-based long-press (for browsers with limited PointerEvent behavior)
const findCellFromTouch = (touch) => {
  const el = document.elementFromPoint(touch.clientX, touch.clientY)
  if (!el) return -1
  if (el.classList && el.classList.contains('cell')) {
    return cells.indexOf(el)
  }
  return -1
}

const handleTouchStart = (e) => {
  if (winner) return
  if (!e.touches || e.touches.length !== 1) return
  const touch = e.touches[0]
  touchCellIdx = findCellFromTouch(touch)
  if (touchCellIdx === -1) return
  touchStartX = touch.clientX
  touchStartY = touch.clientY
  touchLongPressActive = false
  if (touchTimerId) clearTimeout(touchTimerId)
  touchTimerId = setTimeout(() => {
    touchLongPressActive = true
    // Toggle blank on threshold
    board[touchCellIdx] = board[touchCellIdx] === -1 ? 0 : -1
    render()
    lastLongPressAt = Date.now()
    suppressNextClick = true
  }, 500)
}

const handleTouchMove = (e) => {
  if (touchTimerId && e.touches && e.touches.length === 1) {
    const t = e.touches[0]
    const dx = Math.abs(t.clientX - touchStartX)
    const dy = Math.abs(t.clientY - touchStartY)
    if (dx > TOUCH_MOVE_CANCEL_PX || dy > TOUCH_MOVE_CANCEL_PX) {
      clearTimeout(touchTimerId)
      touchTimerId = null
      touchLongPressActive = false
    }
  }
}

const handleTouchEnd = (e) => {
  if (touchTimerId) {
    clearTimeout(touchTimerId)
    touchTimerId = null
  }
  if (touchLongPressActive) {
    // prevent the synthetic click
    e.preventDefault()
    e.stopPropagation()
    touchLongPressActive = false
    touchCellIdx = -1
  }
}

boardAdd.addEventListener('touchstart', handleTouchStart, { passive: false })
boardAdd.addEventListener('touchmove', handleTouchMove, { passive: false })
boardAdd.addEventListener('touchend', handleTouchEnd, { passive: false })

// Instructions modal: lazy populate and show
const instructionHtml = `
  <p>The numbers adjacent to each row and column tell you how many cells should be filled.</p>
  <p>Click a cell to mark it. Use <strong>MARK FILLED</strong> to fill and <strong>MARK BLANK</strong> to place an X where you’re certain it’s empty. Toggle between these modes as needed.</p>
  <p>When you think you’re done, click <strong>CHECK SOLUTION</strong> to verify.</p>
`

const openInstructions = () => {
  if (!instructionModal) return
  if (instructionText) {
    instructionText.innerHTML = instructionHtml
  }
  instructionModal.hidden = false
  document.body.classList.add('modal-open')
  modalCloseBtn && modalCloseBtn.focus()
}

const closeInstructions = () => {
  if (!instructionModal) return
  instructionModal.hidden = true
  document.body.classList.remove('modal-open')
  instructionBtn && instructionBtn.focus()
}

instructionBtn && instructionBtn.addEventListener('click', openInstructions)
modalCloseBtn && modalCloseBtn.addEventListener('click', closeInstructions)
instructionModal &&
  instructionModal.addEventListener('click', (e) => {
    if (e.target === instructionModal) closeInstructions()
  })
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && instructionModal && !instructionModal.hidden) {
    closeInstructions()
  }
})

// Modal accessibility: trap focus and close on Enter/Space on close button
const isFocusable = (el) => {
  if (!el) return false
  if (el.tabIndex >= 0 && !el.disabled && el.offsetParent !== null) return true
  return false
}

const trapFocus = (e) => {
  if (e.key !== 'Tab') return
  if (!instructionModal || instructionModal.hidden) return
  const focusables = Array.from(
    instructionModal.querySelectorAll(
      'button, [href], [tabindex]:not([tabindex="-1"])'
    )
  ).filter(isFocusable)
  if (focusables.length === 0) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}
instructionModal && instructionModal.addEventListener('keydown', trapFocus)
modalCloseBtn &&
  modalCloseBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      closeInstructions()
    }
  })
