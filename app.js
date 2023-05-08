/* ----- constants ----- */
const MARKS = {
  0: '#9bbc0f', //blank
  1: '#0f380f', //marked
  '-1': '#306230' //marked empty
}
//solutions and clues for puzzles
const PUZZLES = [
  {
    name: 'heart',
    solution: [
      1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0
    ],
    topClue: [3, 4, 4, 4, 3],
    leftClue: [[2, 2], 5, 5, 3, 1]
  },
  {
    name: 'skull',
    solution: [
      0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0
    ],
    topClue: [2, [2, 2], 4, [2, 2], 2],
    leftClue: [3, 5, [1, 1, 1], 3, [1, 1]]
  },
  {
    name: 'boat',
    solution: [
      0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0
    ],
    topClue: [1, 2, 5, [2, 2], [1, 1]],
    leftClue: [2, 3, 1, 5, 3]
  },
  {
    name: 'letter a',
    solution: [
      0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1
    ],
    topClue: [3, [1, 1], [1, 1], [1, 1], 3],
    leftClue: [1, [1, 1], [1, 1], 5, [1, 1]]
  },
  {
    name: 'letter z',
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
  },
  { name: 'question mark', solution: [], topClue: [], leftClue: [] }
]

/* ----- state variables ----- */
let board
let winner
let check = 0

//Change puzzle back to 0

let puzzle = 4 // Iterator for which puzzle user is playing.
let clicker = 1 //set to 1 initially, -1 if marking blank

/* ----- cached elements ----- */
const messageEl = document.querySelector('h1')
const resetBtn = document.querySelector('#reset')
const checkBtn = document.querySelector('#check')
const newPuzzBtn = document.querySelector('#newPuzzle')
const filledBtn = document.querySelector('#toggleFilled')
const blankBtn = document.querySelector('#toggleBlank')
const boardAdd = document.querySelector('#board')
const cells = [...document.querySelectorAll('#board > div')]

/* ----- functions ----- */
const init = () => {
  board = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]
  winner = null
  render()
}

const renderBoard = () => {
  board.forEach((arr, cell) => {
    const cellId = `cell${cell}`
    const cellEl = document.getElementById(cellId)
    cellEl.style.backgroundColor = MARKS[arr]
    if (MARKS[arr] === '#306230') {
      cellEl.innerText = 'X'
    }
    if (MARKS[arr] !== '#306230') {
      //clears X
      cellEl.innerText = ''
    }
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
      longClue = `<div>${clue}</div`
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
    messageEl.innerHTML = `You won! It's a ${PUZZLES[puzzle].name}!`
  } else if (check) {
    messageEl.innerHTML = "Nope, that's not it, try again"
  } else {
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

const checkPuzzle = () => {
  let checkTotal = 0
  let checkBoard = board
  for (let i = 0; i < checkBoard.length; i++) {
    //remove -1s from checkBoard without removing from actual board
    if (checkBoard[i] === -1) {
      checkBoard[i] === 0
    }
  }
  for (let i = 0; i < board.length; i++) {
    if (board[i] === checkBoard[i]) {
      checkTotal++
    }
  }
  if (checkTotal === 25) {
    winner = 1
    check = 0
    render()
  } else {
    check++
    render()
  }
}

const nextPuzzle = () => {
  //add logic for puzzle = 5 that congratulates the winner and ends the game/populates new board
  puzzle++
  if (puzzle > 4) {
    puzzle = 0
    console.log(cells)
    //Append new cells w/ cell#
    //Organize new cells in style.css
  }
  board = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]
  render()
  winner = null
  init()
}

handlePlacement = (evt) => {
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

resetGame = () => {
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
}

const markFilled = () => {
  clicker = 1
  filledBtn.style.color = '#9bbc0f'
  filledBtn.style.backgroundColor = '#0f380f'
  blankBtn.style.color = '#0f380f'
  blankBtn.style.backgroundColor = '#9bbc0f'
}

init()

/* ----- event listeners ----- */
document.getElementById('board').addEventListener('click', handlePlacement)
resetBtn.addEventListener('click', resetGame) //See if I need to change reset button as I implement more puzzles
checkBtn.addEventListener('click', checkPuzzle)
filledBtn.addEventListener('click', markFilled)
blankBtn.addEventListener('click', markBlank)
newPuzzBtn.addEventListener('click', nextPuzzle)
