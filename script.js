var X = "X";

var sodukboard = {
  with: 9,
  height: this.width,

  box: {
    grid: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
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