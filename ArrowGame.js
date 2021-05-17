class Arrow{
    constructor(x, y){
        this._position = [x, y]
        this._state = Math.floor(Math.random()*4)
    }

    get position(){
        return this._position;
    }
    
    get state(){
        return this._state
    }
    

    rotate(){
        this._state = (this.state + 1) % 4; 
    }
}

class ArrowBoard{
    constructor(width, height){
        this._width = width; 
        this._height = height; 
        this.board = []; 
        for (let i = 0; i < this.height; i++) {
            let row = []; 
            for (let j = 0; j < this.width; j++) {
                row.push(new Arrow(j, i));
            }
            this.board.push(row);
        }

    }
    get width(){
        return this._width; 
    }

    get height(){
        return this._height;
    }

    printBoard(){
        let output = ""; 
        for (const row of this.board) {
            for (const arr of row) {
                output += `${arr.state} `; 
            }
            output += "\n"
        }
        return output; 
    }

    rotatePiece(x, y){
        let affected = []; 
        let anchor = this.board[x][y]; 
        for (let y_offset = -1; y_offset < 2; y_offset++) {
            let y_new = y + y_offset; 
            if (y_new < 0 || y_new >= this.height){
                continue;
            }
            for (let x_offset = -1; x_offset < 2; x_offset++) {
                let x_new = x + x_offset; 
                if (x_new < 0 || x_new >= this.width){
                    continue; 
                }else {
                    affected.push(this.board[x_new][y_new])
                }
            }
        }
        for (const arrow  of affected) {
            arrow.rotate();
        }
    }

    checkSolved(){
        for (const row of this.board) {
            for (const arrow of row) {
                if (arrow.state == 0){
                    continue; 
                } else {
                    return false; 
                }
            }
        }
        return true; 
    }

}




// b = new ArrowBoard(3, 3, 4); 

// while (true) {
//     console.log(b.printBoard()); 
//     if (b.checkSolved()){
//         console.log("You won!"); 
//         break
//     }
//     let pieces = window.prompt("Which piece : ").replace(" ", "").split(","); 
//     b.rotatePiece(parseInt(pieces[0]), parseInt(pieces[1]));
    
// }
