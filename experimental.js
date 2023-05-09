const generateBoard = () => {
  let abstractBoard = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]

  for (let i = 0; i < abstractBoard.length; i++) {
    abstractBoard[i] = Math.floor(Math.random() * 2)
  }
  return abstractBoard
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
      if (simpArray.length === 0) {
        simpArray.push(simpNum)
      }
      compArray.push(simpArray)
      simpArray = []
      simpNum = 0
    }
  }
  return compArray
}

//switch gymnastics
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
        console.log('There should not be anything that fits here.')
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

const generatePuzzle = () => {
  const namePuzz = 'abstract' //messageEl as the 'a' as an article for other names. I did this in the hard code so I didn't have to generate one. Added the previous
  let abBoard = generateBoard()
  let tClue = topClueGen(abBoard)
  let lClue = leftClueGen(abBoard)

  console.log(namePuzz)
  console.log(abBoard)
  console.log(tClue)
  console.log(lClue)
  let puzzObj = {
    name: namePuzz,
    solution: abBoard,
    topClue: tClue,
    leftClue: lClue
  }

  return puzzObj
}

console.log(generatePuzzle()) //Just so you can see before I try to plug it into my code
//Would be called PUZZLES.push(generatePuzzle()) in nextPuzzle() inside of (puzzle >= 4) block

//example puzzle from PUZZLES array:
/*
 {
    name: 'a heart',
    solution: [
      1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0
    ],
    topClue: [3, 4, 4, 4, 3],
    leftClue: [[2, 2], 5, 5, 3, 1]
  },
*/

//Error checking doesn't like blanks
//leftClueGen not working correctly
