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


    box: function (x){

        if (x >= 1 && x <= 9) {

            let cornerrow, cornercolumne

            let output =[[],[],[]]


            

                switch(x%3){
                    case 1:
                        cornercolumne = 0
                        break;
                    case 2:
                        cornercolumne = 3
                        break;
                    case 0:
                        cornercolumne = 6
                }

                switch(Math.ceil(x/3)){
                    case 1:
                        cornerrow = 0
                        break;
                    case 2:
                        cornerrow = 3
                        break;
                    case 3:
                        cornerrow = 6
                }
                
                
                console.log(`row: ${cornerrow}, columne: ${cornercolumne}`);
                
                for(let i=0;i<=2;i++){
                    for(let y=0;y<=2;y++){
                    
                        output[y][i] = this.row(cornerrow+y)[cornercolumne+i]
                }
            }
                    
            return output
    }
  }
}
}



console.log(sodukboard.box.box(8));


var divmainEL = document.querySelectorAll(".divinmain")

let i = 1
divmainEL.forEach(element => {
    
let htmlstring = ""
    sodukboard.box.box(i).flat().forEach(el => {
        let i = document.createElement("p")
        i.innerText = el
        console.log(i.outerHTML)
        htmlstring += i.outerHTML
    });

    element.innerHTML = htmlstring
    i++

});