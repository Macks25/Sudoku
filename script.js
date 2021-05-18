var X = "X";

var sodukboard = {
  with: 9,
  height: this.width,

  box: {
    grid: {
      0: [X, X, X, 7, X, X, 2, 1, 8],
      1: [7, 5, 1, X, X, 2, 4, 9, X],
      2: [X, X, X, X, 9, 6, 7, 5, 3],
      3: [X, 1, X, 3, X, 8, X, X, 2],
      4: [X, 6, X, X, X, X, X, 8, 5],
      5: [8, 2, 9, 5, X, X, X, 7, X],
      6: [1, X, X, X, 5, X, X, 4, 9],
      7: [X, 7, 6, X, X, 4, 5, X, X],
      8: [X, X, X, 6, X, 3, 8, X, X],
    },

    row: function (x) {
      if (x >= 0 && x <= 8) {
        return this.grid[x];
      }
      return "";
    },

    columne: function (x) {
      if (x >= 0 && x <= 8) {
        let columneN = [];
        for (let i = 0; i <= 8; i++) {
          columneN[i] = this.grid[i][x];
        }
        return columneN;
      }
      return "";
    },

    box: function (x) {
      if (x >= 1 && x <= 9) {
        let cornerrow, cornercolumne;

        let output = [[], [], []];

        switch (x % 3) {
          case 1:
            cornercolumne = 0;
            break;
          case 2:
            cornercolumne = 3;
            break;
          case 0:
            cornercolumne = 6;
        }

        switch (Math.ceil(x / 3)) {
          case 1:
            cornerrow = 0;
            break;
          case 2:
            cornerrow = 3;
            break;
          case 3:
            cornerrow = 6;
        }

        console.log(`row: ${cornerrow}, columne: ${cornercolumne}`);

        for (let i = 0; i <= 2; i++) {
          for (let y = 0; y <= 2; y++) {
            output[y][i] = this.row(cornerrow + y)[cornercolumne + i];
          }
        }

        return output;
      }
    },
    boxnumber: function (row, colum) {
      let x = Math.floor(colum / 3) + 1;

      let y = Math.floor(row / 3);

      return x + 3 * y;
    },
    postionbox: function (number){

      let row, colum


      switch (number % 3) {
        case 1:
        colum = 0
          break;
        case 2:
          colum = 3
          break;
        case 0:
          colum = 6
          break;
      }

      switch (Math.ceil(number/3)) {
        case 1:
          row = 0
          break;
        case 2:
          row = 3
          break;
        case 3:
          row = 6
          break;
      }

      return [row,colum]
    },
    setnum: function (row, colum, num) {
      this.grid[row][colum] = num;
    },
  },
};

console.log(sodukboard.box.box(8));

function display() {
  var divmainEL = document.querySelectorAll(".divinmain");

  let i = 1;
  divmainEL.forEach((element) => {
    let htmlstring = "";
    sodukboard.box
      .box(i)
      .flat()
      .forEach((el) => {
        let i = document.createElement("p");
        i.innerText = el;

        htmlstring += i.outerHTML;
      });

    element.innerHTML = htmlstring;
    i++;
  });
}

var box = sodukboard.box;

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

function solver() {
  for (let i = 0; i <= 8; i++) {
    for (let j = 0; j <= 8; j++) {
      if (box.grid[i][j] == X) {
        for (let num = 1; num <= 9; num++) {
          if (isvalid(i, j, num)) {
            box.setnum(i, j, num);
            console.log(box.grid);
            if (solver()) {
              return true;
            } else {
              box.setnum(i, j, X);
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}

function ladeneingaben() {
  var divmainEL = document.querySelectorAll(".divineingabe");

  let i = 1;
  divmainEL.forEach((element) => {
    let htmlstring = "";
    sodukboard.box
      .box(i)
      .flat()
      .forEach((el) => {
        let i = document.createElement("input");
        i.setAttribute("type","number")
        i.setAttribute("min","0")
        i.setAttribute("max","9")

        i.setAttribute("value","0")
        i.innerText = el;

        htmlstring += i.outerHTML;
      });

    element.innerHTML = htmlstring;
    i++;
  });
}

function eingabeningrid(){
  var eingaben = document.querySelectorAll(".divineingabe");

  let i = 1;
  eingaben.forEach((element) => {
    let position = sodukboard.box.postionbox(i);
    console.log(`position for ${i}: ${position}`);
    let children = element.children;

    let y = 0;

    for (let k = 0; k <= 2; k++) {
      for (let q = 0; q <= 2; q++) {
        let num = children[y].value;

        try {
          num = parseInt(num)
        } catch (error) {}

        if (num == 0 || isNaN(num) || num<1 || num>9) {
          num = X;
        }
        sodukboard.box.setnum(position[0] + k, position[1] + q, num);
        y++;
      }
    }

    i++;
  });
}







ladeneingaben()
document.getElementById("button1").addEventListener("click", () =>{


  eingabeningrid()
  solver()
  display()
})