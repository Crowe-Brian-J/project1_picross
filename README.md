# **_Picross/Nonograms_**

## 4 May 2023

### by Brian Crowe

---

## **_Description_**

I played this game when I was younger on a Gameboy. It's simple enough. You get a grid, generally a square. You're given integer clues on the outside of the grid to determine which spaces on the grid should be filled. You should be able to extrapolate that the other spaces should be blank. Also, from the clues given, say on a row of 5 there are 3 spaces filled in, the middle space is definitely one of the three because counting 3 from either side lands you in the middle. anywhere the number of filled grids intersects is a filled space. There are also sometimes 5/5 filled and 0/5 filled, the latter cutting down on the number of available grid spaces in other rows/columns, making it easier to solve. The grid is presented as blank, the player is allowed to mark a space filled or empty. The puzzle is solved when all filled spaces correspond with the picture given.

---

## **_How to Get Started_**

- [ ] Build a blank grid based on the array.
- [ ] Choose cursor/pen/pickaxe state (Fill/Empty) (Toggle Switch)
- [ ] Markers for left and top of grid (Numbers and Arrows) (Gray out as row/column filled as in Connect Four)
- [ ] Error detection at end. (Stretch -> Incorrect Fill) (If box is incorrectly clicked by player, how do they erase?) (Highlight - red row/column hints as wrong?)

---

## **_Credits_**

- Nintendo (Mario's Picross)
- Plenty of other apps across the last 15 years that I've used
- [Wikipedia](https://en.wikipedia.org/wiki/Nonogram) (Who said I couldn't cite Wikipedia?)

- [Font](https://fontlibrary.org/en/font/cave-story) Designer: enigmasmp1824

---

### **_Grid_**

5x5 => 8x8
Can I tactically acquire pixel art from other games? -> not steal, but repurpose for academic setting (i.e. Mario's Picross (c)1995 Nintendo). I would populate arrays on my own, but get inspiration from those places as I have no idea how to take those pictures and make them code

number of total puzzles? -> randomly chosen, but actual pixel art(?). stored array of arrays

win condition proper filled squares in grid

(insert picture later)
i.e. LETTER L (5x5)
----5--5--1---1---1ß
2 →[O][O][--][--][--]
2 →[O][O][--][--][--]
2 →[O][O][--][--][--]
2 →[O][O][--][--][--]
5 →[O][O][O][O][O]

---

## **_States_**

### Filled -> [O] | | Blank -> [ ] | | Empty -> [X]

empty for player to keep track

All squares empty on init()
Reveal Title on Completion - Solved in xx:xx!

---

## **_Features_**

reset button
toggle difficulty 5x5 -> 8x8
timer -> leaderboard for timed completion? may need databases for that. Out of Scope

integer clues top and left grid border
'markers' from connect 4 to indicate if moves available on row/column
toggle fill or empty to mark progress because Macs don't have right mouse buttons

stretch goals --> larger pictures --> user error detection

---

## **_Palette_**

0f380f -> dark green
306230 -> green
8bac0f -> olive green
9bbc0f -> vomit green
aaaaaa -> grey
