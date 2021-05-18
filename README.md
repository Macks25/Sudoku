# Sudoku
Sudoku Solving JS 
simple backtracking algorithm to solve a standard 9x9 Sudoku
## HTML

Two grids
* one to put in the given numbers (red)
* second one to show the result (blue)

button `Solve` to start the algorithm and display the result

## CSS
* in landscape mode grids next to each other with button in between
*  in portrait mode grids oriented vertically with button in between

fonts and elements sizes are linked to the device’s sizes

## JS

### Storing the Soduko

* the numbers are stored in a two-dimensional array 

    ```javascript
    grid: {0:[] ,1:[] ,2:[] ,3:[] ,4:[] ,5:[] ,6:[] ,7:[] ,8:[]},
     ```
 * three functions for getting back values of a row (`row(x)`), a column (`collumne(x)`) and a box (`box(x)`)
 * the data received in a row(left to right) and column(top to bottom) is an array with the length 8,<br> in box it is a two-dimensional array structured like row and column, representing one of the nine squared boxes


### Ruels for the algortim
The Algorithm works by recursively trying all solutions and choosing the first ones, that succeed. To check which solutions work, the algorithm is given three rules:
1. All Numbers 1 to 9 have to be in a row, column and box
2. The numbers cant be more then once in a row, column or box
3. Every field has to be filled with a number, the only one of it type in its belonging row, column and box

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

The recursive and main function `solver()` searches for a solution:<br>
first, it searches for the first blank spot in the sodoku. When it finds one, it sets the first valid number 1 to 10 it finds with `isvalid()` and calls itself. By this, the function will then go to the second free space and set a number as well. This goes as long as there are no more empty spaces (the sodoku is solved) or all the solutions for the space are not valid according to `isvalid()`. In this case, the recursive function goes up one layer and increases the number it had set before to the next valid number in that spot. If there isn't another valid number it makes the spot blank and goes up as well until there is a number that is valid to increase. If there is a valid number, it sets it and goes to the next empty previous invalid spaces and tries the numbers with the `isvalid()` function. <br> This function is brute forcing all numbers in the spots until it finds a solution. 
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