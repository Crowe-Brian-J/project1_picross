let abstractBoard = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]

for (let i = 0; i < abstractBoard.length; i++) {
  abstractBoard[i] = Math.floor(Math.random() * 2)
}

console.log(abstractBoard)

//Placeholder so I know what I'm working with
abstractBoard = [
  0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1
]

console.log(abstractBoard)

//build a function(s) that generates clues for abstractBoard
//leftClues should be abstractBoard 0-4, 5-9, 10-14, 15-19, 20-24
//topClues shoudld be abstractBoard [0, 5, 10, 15, 20] to [4, 9, 14, 19, 24]
//PUZZLES[puzzle].name = 'bstract' (minus a because it's already included in renderMessage)
const leftClueGen = () => {
  const simpArray = []
  let simpNum = 0
  for (let i = 0; i < abstractBoard.length; i++) {
    if (abstractBoard[i] === 1) simpNum++
  }
}
