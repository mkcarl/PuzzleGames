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

    // solve(shape, verbose = false){
    //     if (shape == "4x4"){
    //         let steps = []; 
    //         if (this.checkSolved()){
    //             return "Done";
    //         } else {
    //             for (let y=0; y<3; y++){
    //                 // for the first 3 rows, 
    //                 let leftCorner = this.board[y][0].state; 
    //                 let rightCorner = this.board[y][3].state;
    //                 const update = (board) => {
    //                     leftCorner = this.board[y][0].state; 
    //                     rightCorner = this.board[y][3].state;
    //                 }
    //                 while (this.board[y][1].state != leftCorner) {
    //                     // if the left corner piece is different from the adjacent piece, 
    //                     // turn the piece until it is the same
    //                     let target = this.board[y+1][2]; 
    //                     this.rotatePiece(target.position[1], target.position[0]);
    //                     update(this.board);
    //                     steps.push(target.position);                       
    //                     }
    //                 while (this.board[y][2].state != rightCorner) {
    //                     let target = this.board[y+1][1];
    //                     this.rotatePiece(target.position[1], target.position[0]);
    //                     update(this.board); 
    //                     steps.push(target.position);                       

    //                 }

    //                 if (leftCorner != 0){
    //                     // realign the numbers
    //                     let diff = 4 - leftCorner;
    //                     for (let i = 0; i < diff; i++) {
    //                         let target = this.board[y+1][0];                      
    //                         this.rotatePiece(target.position[1], target.position[0]);
    //                         update(this.board); 
    //                         steps.push(target.position);                       

    //                     } 
    //                 }
    //                 if (rightCorner != 0){
    //                     let diff = 4 - rightCorner;
    //                     for (let i = 0; i < diff; i++) {   
    //                         let target = this.board[y+1][3];                   
    //                         this.rotatePiece(target.position[1], target.position[0]);
    //                         update(this.board); 
    //                         steps.push(target.position);                       

    //                     } 
    //                 }
                    
                    
                    
    //                 if (verbose){
    //                     let x = this.printBoard(); 
    //                     console.log(x); 
    //                 }
                    
    //             }
                
    //             // left side 
    //             let centerTile = this.board[3][1]; 
    //             let adjacentTile = this.board[3][0];
    //             while (centerTile.state != adjacentTile.state){
    //                 this.rotatePiece(3, 2); 
    //                 steps.push(this.board[3][2].position);   
    //             }
    //             while (this.board[2][2].state != 0){
    //                 this.rotatePiece(1,2); 
    //                 steps.push(this.board[1][2].position);
    //             }
    //             while (this.board[0][2].state != 0){
    //                 this.rotatePiece(0,2); 
    //                 steps.push(this.board[0][2].position); 
    //             }

    //             // right side
    //             centerTile = this.board[3][2]; 
    //             adjacentTile = this.board[3][3];
    //             while (centerTile.state != adjacentTile.state){
    //                 this.rotatePiece(3, 1); 
    //                 steps.push(this.board[3][1].position);   
    //             }
    //             while (this.board[2][1].state != 0){
    //                 this.rotatePiece(1,1); 
    //                 steps.push(this.board[1][1].position);
    //             }
    //             while (this.board[0][1].state != 0){
    //                 this.rotatePiece(0,1); 
    //                 steps.push(this.board[0][1].position); 
    //             }

    //             // change left pair 
    //             while (this.board[3][0].state != 0){
    //                 this.rotatePiece(3, 0); 
    //                 steps.push(this.board[3][0].position);
    //             }
    //             while (this.board[2][0].state != 0){
    //                 this.rotatePiece(1, 0); 
    //                 steps.push(this.board[1][0].position); 
    //             }
    //             while (this.board[0][0].state != 0) {
    //                 this.rotatePiece(0,0); 
    //                 steps.push(this.board[0][0].position);
    //             }

    //             // change right pair 
    //             while (this.board[3][3].state != 0){
    //                 this.rotatePiece(3, 3); 
    //                 steps.push(this.board[3][3].position);
    //             }
    //             while (this.board[2][3].state != 0){
    //                 this.rotatePiece(1, 3); 
    //                 steps.push(this.board[1][3].position); 
    //             }
    //             while (this.board[0][3].state != 0) {
    //                 this.rotatePiece(0,3); 
    //                 steps.push(this.board[0][3].position);
    //             }
    //         }
            
    //         return steps; 
    //     }
    // }
}

class ArrowBoardSolver{
    constructor(board){
        this.arrowBoard = board; 
    }
    solve(shape, verbose = false){
        if (shape == "4x4"){
            let steps = []; 
            if (this.arrowBoard.checkSolved()){
                return "Done";
            } else {
                for (let y=0; y<3; y++){
                    // for the first 3 rows, 
                    let leftCorner = this.arrowBoard.board[y][0].state; 
                    let rightCorner = this.arrowBoard.board[y][3].state;
                    const update = (board) => {
                        leftCorner = this.arrowBoard.board[y][0].state; 
                        rightCorner = this.arrowBoard.board[y][3].state;
                    }
                    while (this.arrowBoard.board[y][1].state != leftCorner) {
                        // if the left corner piece is different from the adjacent piece, 
                        // turn the piece until it is the same
                        let target = this.arrowBoard.board[y+1][2]; 
                        this.arrowBoard.rotatePiece(target.position[1], target.position[0]);
                        update(this.arrowBoard.board);
                        steps.push(target.position);                       
                        }
                    while (this.arrowBoard.board[y][2].state != rightCorner) {
                        let target = this.arrowBoard.board[y+1][1];
                        this.arrowBoard.rotatePiece(target.position[1], target.position[0]);
                        update(this.arrowBoard.board); 
                        steps.push(target.position);                       

                    }

                    if (leftCorner != 0){
                        // realign the numbers
                        let diff = 4 - leftCorner;
                        for (let i = 0; i < diff; i++) {
                            let target = this.arrowBoard.board[y+1][0];                      
                            this.arrowBoard.rotatePiece(target.position[1], target.position[0]);
                            update(this.arrowBoard.board); 
                            steps.push(target.position);                       

                        } 
                    }
                    if (rightCorner != 0){
                        let diff = 4 - rightCorner;
                        for (let i = 0; i < diff; i++) {   
                            let target = this.arrowBoard.board[y+1][3];                   
                            this.arrowBoard.rotatePiece(target.position[1], target.position[0]);
                            update(this.arrowBoard.board); 
                            steps.push(target.position);                       

                        } 
                    }
                    
                    
                    
                    if (verbose){
                        let x = this.arrowBoard.printBoard(); 
                        console.log(x); 
                    }
                    
                }
                
                // left side 
                let centerTile = this.arrowBoard.board[3][1]; 
                let adjacentTile = this.arrowBoard.board[3][0];
                while (centerTile.state != adjacentTile.state){
                    this.arrowBoard.rotatePiece(3, 2); 
                    steps.push(this.arrowBoard.board[3][2].position);   
                }
                while (this.arrowBoard.board[2][2].state != 0){
                    this.arrowBoard.rotatePiece(1,2); 
                    steps.push(this.arrowBoard.board[1][2].position);
                }
                while (this.arrowBoard.board[0][2].state != 0){
                    this.arrowBoard.rotatePiece(0,2); 
                    steps.push(this.arrowBoard.board[0][2].position); 
                }

                // right side
                centerTile = this.arrowBoard.board[3][2]; 
                adjacentTile = this.arrowBoard.board[3][3];
                while (centerTile.state != adjacentTile.state){
                    this.arrowBoard.rotatePiece(3, 1); 
                    steps.push(this.arrowBoard.board[3][1].position);   
                }
                while (this.arrowBoard.board[2][1].state != 0){
                    this.arrowBoard.rotatePiece(1,1); 
                    steps.push(this.arrowBoard.board[1][1].position);
                }
                while (this.arrowBoard.board[0][1].state != 0){
                    this.arrowBoard.rotatePiece(0,1); 
                    steps.push(this.arrowBoard.board[0][1].position); 
                }

                // change left pair 
                while (this.arrowBoard.board[3][0].state != 0){
                    this.arrowBoard.rotatePiece(3, 0); 
                    steps.push(this.arrowBoard.board[3][0].position);
                }
                while (this.arrowBoard.board[2][0].state != 0){
                    this.arrowBoard.rotatePiece(1, 0); 
                    steps.push(this.arrowBoard.board[1][0].position); 
                }
                while (this.arrowBoard.board[0][0].state != 0) {
                    this.arrowBoard.rotatePiece(0,0); 
                    steps.push(this.arrowBoard.board[0][0].position);
                }

                // change right pair 
                while (this.arrowBoard.board[3][3].state != 0){
                    this.arrowBoard.rotatePiece(3, 3); 
                    steps.push(this.arrowBoard.board[3][3].position);
                }
                while (this.arrowBoard.board[2][3].state != 0){
                    this.arrowBoard.rotatePiece(1, 3); 
                    steps.push(this.arrowBoard.board[1][3].position); 
                }
                while (this.arrowBoard.board[0][3].state != 0) {
                    this.arrowBoard.rotatePiece(0,3); 
                    steps.push(this.arrowBoard.board[0][3].position);
                }
            }
            
            return steps; 
        }
    }
}

// let b = new ArrowBoard(4,4); 
// let steps = b.solve("4x4", true); 
// console.log(steps); 
// while (true) {
//     console.log(b.printBoard()); 
//     if (b.checkSolved()){
//         console.log("You won!"); 
//         break
//     }
//     let pieces = window.prompt("Which piece : ").replace(" ", "").split(","); 
//     b.rotatePiece(parseInt(pieces[0]), parseInt(pieces[1]));
    
// }
