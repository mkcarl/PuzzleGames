const WIDTH = 800; 
const HEIGHT = 800; 
const MARGIN = 50
const DIM = [4,4]; 
let boardSize = [WIDTH-2*MARGIN, HEIGHT-2*MARGIN]; 
let board = new ArrowBoard(DIM[0], DIM[1]);

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(100);
  drawBoard();
}

function draw() {

}

function mouseClicked(){
  if (mouseX > MARGIN && mouseX < boardSize[0]+MARGIN && mouseY > MARGIN && mouseY < boardSize[1]+MARGIN && !board.checkSolved()){
    // console.log(`${Math.floor(mouseX/(boardSize[0]/DIM[0]))}`)
    let x = Math.floor((mouseX-MARGIN)/(boardSize[0]/DIM[0])); 
    let y = Math.floor((mouseY-MARGIN)/(boardSize[1]/DIM[1])); 
    console.log(x, y)
    console.log(`[${mouseX},${mouseY}]`)
    board.rotatePiece(y, x)
    drawBoard();
    
  }
  else {
    console.log("out"); 
  }
}

function drawBoard(){
  console.log(board.printBoard()); 
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
    for (let y = 1; y <= DIM[1]; y++) {
      for (let x = 1; x <= DIM[0]; x++) {
        text(`${board.board[y-1][x-1].state}`, 
        x * boardSize[0]/DIM[0]+MARGIN - boardSize[0]/DIM[0]/2, 
        y * boardSize[1]/DIM[1]+MARGIN - boardSize[1]/DIM[1]/2)
      }
    }
}