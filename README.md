# Sudoku
Sudoku Solving JS 
simple backtracking algorithm to solve a standard 9x9 Sudoku
## HTML

two grids
* one to put in the given numbers (red)
* second one to show the result (blue)

button `Solve` to start the algorithm and display the result

## CSS
* in landscape mode grids next to eachother with button in between
*  in portrait mode grids oriented verticaly with button in between

fonts and elements sizes are linked to the device’s sizes

## JS

### storing the soduko

* the numbers are stored in a two-dimensional array 

    ```javascript
    grid: {0:[] ,1:[] ,2:[] ,3:[] ,4:[] ,5:[] ,6:[] ,7:[] ,8:[]},
     ```
 * three functions for getting back values of a row (`row(x)`), a columne (`collumne(x)`) and a box (`box(x)`)
 * the data received in row(left to right) and columne(top to bottom) is a array with the lenght 8,<br> in box it is a two dimensional array structured like row and columne, representing one of the nine squared boxes


## theorie and ruels for the algortim
The Algorithm works by recursivly trieing all solotuiens and chosing the first ones, that succeds. To check wich solutions work, the algorithm is givven three rules:
1. All Numbers 1 to 9 have to be in a row, column and box
2. The numbers cant be more the once in a row, column or box
3. Every field has to be filled with a number, the only one of it type in its beloning row, collumn and box

To check and validdate if a number can fit in a specific spot in the array, the function `isvalid()` is used. It checks if the `number` can fit in the spot, if so it returns true, otherwise false.
```javascript
function isvalid(row, colum, number) {
  if (box.columne(colum).includes(number)) {
    return false;
  }

  if (box.row(row).includes(number)) {
    return false;
  }

  let boxnum = box.boxnumber(row, colum);

  if (box.box(boxnum).flat().includes(number)) {
    return false;
  }

  console.log(`${number} Valid in row: ${row}, colum: ${colum}`);
  return true;
}
```
### Solving the Sodoku

The rekursiv and main function `solver()` searches for a soloution:
first it searches for the first blank spot in the sodoku. When it finds on, it sets the first valid number 1 to 10 it finds with `isvalid()` and calls itslef. By this the function will then go to the second free space and set a number aswell. This goes aslong as there are no more free spaces, he sodoku is solved, or there isnt a solution for a free space. In this case the rekursiv function goes one layer up and increases the number it had set before to the next valid number in that spot. If ther isnt another valid number it makes the spot blank and goes up aswell until there is a number that is valid to increase. This function is brutforcing all numbers in the spots, until it findas a solution. 
```javascript
function solver() {
  for (let rownum = 0; rownum <= 8; rownum++) {
    for (let columnum = 0; columnum <= 8; columnum++) {
      if (box.grid[rownum][columnum] == X) {
        for (let num = 1; num <= 9; num++) {
          if (isvalid(rownum, columnum, num)) {
            box.setnum(rownum, columnum, num);
            console.log(box.grid);
            if (solver()) {
              return true;
            } else {
              box.setnum(rownum, columnum, X);
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}
```