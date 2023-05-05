//Use Flex Box

/*---- constants ----*/

//const MARKS = { 0: '' (blank), 1: 'X' (marked), '-1': 'O' (marked empty)}

/*---- state variables ----*/

let board
let winner
//stretch
let winTimer

/*---- cached elements ----*/

//const messageEl = document.querySelector('h1')
//const drawEl = document.querySelector('not sure what's going to go here.')
//const resetBtn = document.querySelector('btn')
//const cells = [...document.querySelectorAll('#board > div')]
//const pictureId = document.querySelector('the id of the picture array')

/*---- functions ----*/

//const init = () => { board = (either single array or array of arrays); winner = null; render()}

//const renderBoard = () => {
//board.forEach((arr, cell) => {const cellId = `cell${cell}`
//const cellEl = document.getElementById(cellId)
//cellEl.innerHTML = MARKS[arr]
//}

//const renderMessage = () => {
//if (winner === 'incorrect') {messageEl.innerText = 'Check your clues. The board is wrong.'} else if (winner) {messageEl.innerHTML = `You win! You found the Time: ${winTimer}`} else {messageEl.innerHTML = 'Keep going. I wonder what it is.'}
//}

//const renderControls = () => {resetBtn.style.visibility = winner ? 'hidden' : 'visible'}

//Going to need a winState function where I feed in a const array and an array generated from the eventListenters(?). I think I'll need to run one check with const array comparing marked squares with the generated one, and then the generated array comparing marked squares with const one to check for extra marked squares

/*---- event listeners ----*/
//document.getElementById('board').addEventListener('click', handlePlacement)
//resetBtn.addEventListener('click', resetGame)
