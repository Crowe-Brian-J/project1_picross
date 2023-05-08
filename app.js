/* ----- constants ----- */
const MARKS = {
  0: '#9bbc0f', //blank
  1: '#0f380f', //marked
  '-1': 'O' //marked empty (possibly remove?)
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
  }
]

/* ----- state variables ----- */
let board
let winner
let check = 0
let puzzle = 0 // Iterator for which puzzle user is playing.
let topMarkers

/* ----- cached elements ----- */
const messageEl = document.querySelector('h1')
//const drawEl = document.querySelector('not sure what's going here yet')
const resetBtn = document.querySelector('#reset')
const checkBtn = document.querySelector('#check')
const newPuzzBtn = document.querySelector('#newPuzzle')
const cells = [...document.querySelectorAll('#board > div')]
//const markerEl = document.querySelector('topmarker')

/* ----- functions ----- */
const init = () => {
  board = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]
  topMarkers = [[], [], [], [], []]
  winner = null
  render()
}

const renderBoard = () => {
  board.forEach((arr, cell) => {
    const cellId = `cell${cell}`
    const cellEl = document.getElementById(cellId)
    cellEl.style.backgroundColor = MARKS[arr]
  })

  PUZZLES[puzzle].topClue.forEach((clue, idx) => {
    const clueId = `col${idx + 1}`
    const clueEl = document.getElementById(clueId)
    let longClue = ''
    if (clue.length > 1) {
      console.log('Longer Clue')
      clue.forEach((cl, idx2) => {
        console.log(idx2)
        console.log(cl)
        console.log('Long Clue: ' + longClue)
        longClue += `<div>${cl}</div>`
        console.log('Long Clue: ' + longClue)
      })
    } else {
      longClue = `<div>${clue}</div>`
    }
    console.log('Long Clue after if/else ' + longClue)
    clueEl.innerHTML = longClue
  })
}

const renderMessage = () => {
  if (winner) {
    messageEl.innerHTML = `You won! It's a ${PUZZLES[puzzle].name}!` //left in backticks for template literal. Need to announce what the picture is
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
  for (let i = 0; i < board.length; i++) {
    if (board[i] === PUZZLES[puzzle].solution[i]) {
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
  //add logic for puzzle = 5 that congratulates the winner and ends the game
  puzzle++
  if (puzzle > 4) {
    puzzle = 0
  }
  //possibly invoke resetgame
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
  if (board[cellIdx] === 1) {
    board[cellIdx] = 0
    render()
    return
  }
  board[cellIdx] = 1
  render()
}

resetGame = () => {
  board = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]
  render()
}

init()

/* ----- event listeners ----- */
document.getElementById('board').addEventListener('click', handlePlacement)
resetBtn.addEventListener('click', resetGame) //See if I need to change reset button as I implement more puzzles
checkBtn.addEventListener('click', checkPuzzle)
newPuzzBtn.addEventListener('click', nextPuzzle)
