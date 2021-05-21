import random
from typing import get_type_hints
import copy
from pprint import pprint


class Arrow:
    def __init__(self, x, y, rnd=True, input_=0):
        self.possible_state: dict = {
            0: "Up",
            1: "Right",
            2: "Down",
            3: "Left"
        }
        self.position: tuple[int, int] = (x, y)
        self.state: int = random.randint(0,3) if rnd else input_


    def rotate(self):
        self.state = (self.state + 1) % 4

    def __repr__(self):
        return f"{self.state}"



class ArrowBoard:
    def __init__(self, width, height, custom:list=None):
        self.width = width
        self.height = height
        if custom is None: 
            self.board: list[list[Arrow]] = [[Arrow(x, y) for x in range(self.width)] for y in range(self.height)]
        else: 
            board = []
            for x in range(self.width): 
                row = []
                for y in range(self.height): 
                    row.append(Arrow(y, x, rnd=False, input_=custom[x][y]))
                board.append(row)
            self.board = board
    
    def create_custom(self, game_state: list[list[int]]): 
        board = []
        for x in range(self.width): 
            row = []
            for y in range(self.height): 
                row.append(Arrow(x, y, rnd=False, input_=game_state[y][x]))

    def print_board(self, decorate: bool=True):
        if decorate:
            for row in self.board:
                for arrow in row:
                    print(arrow.possible_state[arrow.state].ljust(5), end="\t")
                print("\n")
        else:
            for row in self.board:
                for arrow in row:
                    print(arrow, end="\t")
                print("\n")
        print("\n")

    def rotate_piece(self, x: int, y: int):
        affected: list[Arrow] = []
        anchor = self.board[x][y]
        for y_offset in range(-1, 2):
            y_new = y + y_offset
            if y_new < 0 or y_new >= self.height:
                continue
            for x_offset in range(-1, 2):
                x_new = x + x_offset
                if x_new < 0 or x_new >= self.width:
                    continue
                else:
                    affected.append(self.board[x_new][y_new])
        for pieces in affected:
            pieces.rotate()

    def check_solved(self) -> bool:
        for row in self.board:
            for arrow in row:
                if arrow.state == 0:
                    continue
                else:
                    return False

        return True
    
class ArrowBoardSolver: 
    def __init__(self, board) :
        self.arrow_board = copy.deepcopy(board)
    
    def solve(self, shape) -> list: 
        if list(shape) == [4, 4]: 
            steps= []
                
            if self.arrow_board.check_solved(): 
                return steps
            else: 
                for rowNum in range(3): 
                    # for the first 3 rows, 
                    left_corner = self.arrow_board.board[rowNum][0].state
                    right_corner = self.arrow_board.board[rowNum][3].state

                    while self.arrow_board.board[rowNum][1].state != left_corner: 
                        target = self.arrow_board.board[rowNum+1][2]
                        self.arrow_board.rotate_piece(target.position[1], target.position[0])
                        left_corner = self.arrow_board.board[rowNum][0].state
                        right_corner = self.arrow_board.board[rowNum][3].state
                        steps.append(target.position)
                    while self.arrow_board.board[rowNum][2].state != right_corner: 
                        target = self.arrow_board.board[rowNum+1][1]
                        self.arrow_board.rotate_piece(target.position[1], target.position[0])
                        left_corner = self.arrow_board.board[rowNum][0].state
                        right_corner = self.arrow_board.board[rowNum][3].state
                        steps.append(target.position)
                    if left_corner != 0: 
                        diff = 4 - left_corner
                        for i in range(diff): 
                            target = self.arrow_board.board[rowNum+1][0]
                            self.arrow_board.rotate_piece(target.position[1], target.position[0])
                            left_corner = self.arrow_board.board[rowNum][0].state
                            right_corner = self.arrow_board.board[rowNum][3].state
                            steps.append(target.position)
                    if right_corner != 0: 
                        diff = 4 - right_corner
                        for i in range(diff): 
                            target = self.arrow_board.board[rowNum+1][3]
                            self.arrow_board.rotate_piece(target.position[1], target.position[0])
                            left_corner = self.arrow_board.board[rowNum][0].state
                            right_corner = self.arrow_board.board[rowNum][3].state  
                            steps.append(target.position)
                    

                # left side 
                center_tile = self.arrow_board.board[3][1]
                adjacent_tile = self.arrow_board.board[3][0]
                while center_tile.state != adjacent_tile.state: 
                    self.arrow_board.rotate_piece(3,2)
                    steps.append(self.arrow_board.board[3][2].position)
                while self.arrow_board.board[2][2].state != 0: 
                    self.arrow_board.rotate_piece(1,2)
                    steps.append(self.arrow_board.board[1][2].position)
                while self.arrow_board.board[0][2].state != 0: 
                    self.arrow_board.rotate_piece(0,2)
                    steps.append(self.arrow_board.board[0][2].position)
                
                # left side 
                center_tile = self.arrow_board.board[3][2]
                adjacent_tile = self.arrow_board.board[3][3]
                while center_tile.state != adjacent_tile.state: 
                    self.arrow_board.rotate_piece(3,1)
                    steps.append(self.arrow_board.board[3][1].position)
                while self.arrow_board.board[2][1].state != 0: 
                    self.arrow_board.rotate_piece(1,1)
                    steps.append(self.arrow_board.board[1][1].position)
                while self.arrow_board.board[0][1].state != 0: 
                    self.arrow_board.rotate_piece(0,1)
                    steps.append(self.arrow_board.board[0][1].position)

                # change left pair 
                while self.arrow_board.board[3][0].state != 0: 
                    self.arrow_board.rotate_piece(3,0)
                    steps.append(self.arrow_board.board[3][0].position)
                while self.arrow_board.board[2][0].state != 0: 
                    self.arrow_board.rotate_piece(1, 0)
                    steps.append(self.arrow_board.board[1][0].position)
                while self.arrow_board.board[0][0].state != 0: 
                    self.arrow_board.rotate_piece(0,0)
                    steps.append(self.arrow_board.board[0][0].position)

                # change left pair 
                while self.arrow_board.board[3][3].state != 0: 
                    self.arrow_board.rotate_piece(3,3)
                    steps.append(self.arrow_board.board[3][3].position)
                while self.arrow_board.board[2][3].state != 0: 
                    self.arrow_board.rotate_piece(1, 3)
                    steps.append(self.arrow_board.board[1][3].position)
                while self.arrow_board.board[0][3].state != 0: 
                    self.arrow_board.rotate_piece(0,3)
                    steps.append(self.arrow_board.board[0][3].position)
            
            return steps


if __name__ == '__main__':
    b = ArrowBoard(4,4, 
        [[1, 0, 1, 2],
        [2, 2, 3, 0],
        [0, 1, 2, 1],
        [3, 1, 1, 2]]
        )
    s = ArrowBoardSolver(b)
    steps = s.solve([4,4])
    pprint(s.arrow_board.board)
    print(steps)
    while True:
    #     b.print_board(False)
    #     if b.check_solved():
    #         print("You won!")
    #         break
        piece = input("Which piece : ").replace(" ", "").split(",")
        pprint(b.board)
        b.rotate_piece(int(piece[0]), int(piece[1]))
