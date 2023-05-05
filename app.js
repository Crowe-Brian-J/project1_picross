/* ----- constants ----- */
const MARKS = {
  0: '#9bbc0f', //blank
  1: '#0f380f', //marked
  '-1': 'O' //marked empty (possibly remove?)
}

/* ----- state variables ----- */
let board
let winner

/* ----- cached elements ----- */
const messageEl = document.querySelector('h1')
//const drawEl = document.querySelector('not sure what's going here yet')
const resetBtn = document.querySelector('button')
const cells = [...document.querySelectorAll('#board > div')]
//const pictureId = document.querySelector('the id of the picture array')
//const markerEl = document.querySelector('topmarker')

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
  })
}

const renderMessage = () => {
  if (winner) {
    messageEl.innerHTML = `You won! It's a picture!` //left in backticks for template literal. Need to announce what the picture is
  } else {
    messageEl.innerHTML = "What's it supposed to be?"
  }
}

const renderControls = () => {
  resetBtn.style.visibility = winner ? 'hidden' : 'visible'
}

const render = () => {
  renderBoard()
  renderMessage()
  renderControls()
}

const getWinner = () => {}

/* ----- This broke hover. Check later ----- */
handlePlacement = (evt) => {
  if (winner) return
  const cellIdx = cells.indexOf(evt.target)
  //Guards
  if (board[cellIdx] === 1) {
    board[cellIdx] = 0
    render()
    return
  } //Need to change this because if they === 1, board[cellIdx = 0]
  board[cellIdx] = 1
  winner = getWinner(cellIdx)
  render()
}

init()

/* ----- event listeners ----- */
document.getElementById('board').addEventListener('click', handlePlacement)
resetBtn.addEventListener('click', init) //See if I need to change reset button as I implement more puzzles
