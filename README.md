# **_Picross/Nonograms_**

## Original Work
## 4 May 2023 - 12 May 2023

### by Brian Crowe

[Want to play a game?](http://economic-balance.surge.sh)
---
## Update
## 7 September 2025

**_Updated_**
PiColors Easter Egg - Now drags and indicates selected color
Check Solution - Now with hints
User can now right-click to mark blank
Update CSS
Update Accessibility

---

## **_Description_**

I played this game when I was younger on a Gameboy. It's simple enough. You get a grid, generally a square. You're given integer clues on the outside of the grid to determine which spaces on the grid should be filled. You should be able to extrapolate that the other spaces should be blank. Also, from the clues given, say on a row of 5 there are 3 spaces filled in, the middle space is definitely one of the three because counting 3 from either side lands you in the middle. anywhere the number of filled grids intersects is a filled space. There are also sometimes 5/5 filled and 0/5 filled, the latter cutting down on the number of available grid spaces in other rows/columns, making it easier to solve. The grid is presented as blank, the player is allowed to mark a space filled or empty. The puzzle is solved when all filled spaces correspond with the picture given.

---

### **_Behind the Game_**

5x5 Grid: Created as an array with 25 spaces. All initially devoid of color. As clues are interpreted, the player will click in corresponding spaces to mark them filled or empty, via event handlers, listening in the grid as well as the filled or blank (or any other) buttons. The grid is styled using grid, with the rest of the page using grid or flex-box as needed.

5 Handwritten Puzzles: After I got the grid to show and populate, I created 5 pieces of pixel art and interpreted what the clues would be. I populated all puzzles in an array of objects so I could iterate and pull data as necessary.

Infinite-ish (33,554,432 Permutations) Function-written Puzzles: These can range from simplistic to punishingly difficult. All should be solvable given a combination of logic and trial-and-error based logic.

Win Condition: Taking the given puzzle's solution and comparing it to the board's player populated solution allows us to know if we've reached win state. Given the ability to mark spaces as empty, the player's board is cloned and run through to remove the empty spaces before comparing with the solution. This ensures the board remains static until the player acts on it if incorrect.

##### Examples of Grids:

Conceptual:\
i.e. LETTER L (5x5)\
----5--5--1---1---1\
2 →[O][O][--][--][--]\
2 →[O][O][--][--][--]\
2 →[O][O][--][--][--]\
2 →[O][O][--][--][--]\
5 →[O][O][O][O][O]

Practical:\
![Image](/pics/emptyBoard.png)\
![Image](/pics/gameWon.png)

#### Styles:

I chose GameBoy colors because that's where I first played the game. In general, the game uses a monochromatic (on/off) color scheme for the board. Other future iterations may use colors and have clues with corresponding colors

---

## **_States_**

#### Blank -> [ ] | | Filled -> [O] | | Empty -> [X]

Each cell is initially blank. It can be marked as Filled or Empty by the player. The player may also clear the current puzzle board completely by clicking the reset button. On clicking the check solution button, the player is either told their puzzle is incorrect and asked to try again or it is marked as correct and they are given the option of a new puzzle as seen in the image above (gameWon).

---

## **_Tutorial_**

To win, the player needs to determine which cells are filled and which are empty. The player uses clues on the outside of the puzzle board (top/left) to make that determination. The number(s) given tell the player how many spaces in a row must be filled, and maybe more importantly, how many consecutive spaces must be filled.
As this grid is 5x5, it stands to reason that the best option for solving the puzzle is to use the clues that are closest to the number 5 first.\
![Image](/pics/lineLook.png)\
While this clue does not equal 5 to the naked eye, the space between the 2s should be interpreted as 2-1-2. Or more visually reasoned:\
![Image](/pics/whatIKnow.png)\
Here the middle square is marked empty. The filled in cells can then be marked more easily:\
![Image](/pics/filledLine.png)\
The player can then use the knowledge of that row to fill in another row or column based on the given clues:\
![Image](/pics/takeForColumn.png) ->
![Image](/pics/filledColumn.png)\
Given the clue of 3 and the filled in first cell, the player can determin that the next two spaces in the column must be filled to complete the three.\
Ideally, the player should be able to take the board from this:\
![Image](/pics/emptyBoard.png)\
To this:\
![Image](/pics/gameWon.png)

---

## **_Features_**

I created a generatePuzzle function that creates a puzzle starting with a blank array. The function then iterates through the array with a Math.floor(Math.random() \* 2) for each index in the array. Using that array, it then generates an array of arrays for top clues and left clues, using switch cases to check on the topClues and limits to deal with the left clues. 'generatePuzzle()' is invoked when the puzzle iterator >= 4, so as to not interrupt gameplay.

Outside of the main functionality of the game as outlined above, I also included a reset board feature. This blanks the canvas in the event the player finds it too crowded/muddled to continue. There progress among the number of games completed remains the same, but they are able to start fresh with their current puzzle. This became necessary with the computer generated puzzles, as a multitude of "1 1" clues make it difficult to logic through everything.

---

## **_Palette_**

| html Code | Color       |
| --------- | ----------- |
| #0f380f   | dark green  |
| #306230   | moss green  |
| #8bac0f   | olive green |
| #9bbc0f   | vomit green |
| ---       | ---         |
| #b2b4b2   | body gray   |
| #54585a   | d-pad gray  |
| #514689   | a/b buttons |
| #a7a4e0   | x/y buttons |

---

## **_Credits_**

- Built with:
  -- HTML
  -- CSS
  -- Javascript

- Nintendo (Mario's Picross (c)1995)
- Plenty of other apps across the last 15 years that I've used
- [Wikipedia](https://en.wikipedia.org/wiki/Nonogram) (Who said I couldn't cite Wikipedia?)
- [Connect Four](https://github.com/SEI-R-4-24/u1_lesson_connect_four)
- [Tic Tac Toe](https://github.com/SEI-R-4-24/u1_hw_tic_tac_toe)
- [Font](https://fontlibrary.org/en/font/cave-story) 'CaveStoryRegular' by Designer: enigmasmp1824
- [Palette](https://www.color-hex.com/color-palette/26401) GameBoy Colors
- [Palette ](https://www.raphnet.net/design/console_colors/index_en.php) Super Nintendo Colors
- [Music Used with Permission: Puzzle Pieces by Abstraction](https://abstractionmusic.bandcamp.com/track/puzzle-pieces)

---

## **_Easter Egg_**

In addition to the game, I included an opportunity take a break from the stress. It appears after the puzzle variable is greater than or equal to 7 and the diceRoll is greater than 5 (1/6 chance at that point).\
![Image](/pics/needABreak.png)\
When the player clicks the link, they are taken to a new page with a blank 16x16 canvas and a palette of 16 colors. Using similar functions to the game, the player is allowed to click in the palette to choose which color they would like to paint with (akin to marking filled or blank). Cell by cell, the player is able paint in a zen manner. When they're done, they're able to click the link to restart the game, or close the window and return to the game state they had when they started the break. It's a simple pixel editor, but you can have some fun with it. It's akin MarioPaint's stamp maker feature (an old Super Nintendo game).

---

## **_More Screenshots_**

![Image](/pics/useLogic.png)
![Image](/pics/guessWrong.png)
![Image](/pics/guessCorrect.png)
![Image](/pics/blankHelp.png)
![Image](/pics/picolorBoard.png)
![Image](/pics/marchingElf.png)
![Image](/pics/shieldCarry.png)
![Image](/pics/newColorPlumber.png)
![Image](/pics/refactorJumpMan.png)
![Image](/pics/pixelArtSmall.png) They look better shrunk down.
