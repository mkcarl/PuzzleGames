const WIDTH = 600; 
const HEIGHT = 600; 
const MARGIN = 50
const DIM = [3,3]; 
let boardSize = [WIDTH-2*MARGIN, HEIGHT-2*MARGIN]; 
let board = new ArrowBoard(3,3);

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(100);
  drawBoard();
}

function draw() {

}

function mouseClicked(){
  // console.log(`[${mouseX},${mouseY}]`)
  if (mouseX > MARGIN && mouseX < boardSize[0]+MARGIN && mouseY > MARGIN && mouseY < boardSize[1]+MARGIN && !board.checkSolved()){
    // console.log(`${Math.floor(mouseX/(boardSize[0]/DIM[0]))}`)
    let x = Math.floor(mouseX/(boardSize[0]/DIM[0]+MARGIN)); 
    let y = Math.floor(mouseY/(boardSize[1]/DIM[1]+MARGIN)); 
    console.log(x, y)
    board.rotatePiece(x, y)
    drawBoard();
    
  }
  else {
    console.log("out"); 
  }
}

function drawBoard(){
  rect(MARGIN, MARGIN, boardSize[0], boardSize[1]);
  
  // drawing the grid
    for (let x = 1; x < DIM[0]; x++) {
        for (let y = 1; y < DIM[1]; y++) {
            stroke(0); 
            strokeWeight(1); 
            line(x * boardSize[0]/DIM[0]+MARGIN, MARGIN, x * boardSize[0]/DIM[0]+MARGIN, boardSize[0]+MARGIN)
            line(MARGIN, y * boardSize[1]/DIM[1]+MARGIN, boardSize[1]+MARGIN, y * boardSize[1]/DIM[1]+MARGIN)            
        }        
    }
    textSize((boardSize[0]/DIM[0] + boardSize[1]/DIM[1])/4);
    textAlign("center", "center") 
    for (let x = 1; x <= DIM[0]; x++) {
      for (let y = 1; y <= DIM[1]; y++) {
        text(`${board.board[x-1][y-1].state}`, 
        x * boardSize[0]/DIM[0]+MARGIN - boardSize[0]/DIM[0]/2, 
        y * boardSize[1]/DIM[1]+MARGIN - boardSize[1]/DIM[1]/2)
      }
    }
}