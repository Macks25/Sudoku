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
  },
};



console.log(sodukboard.box.columne(0));
