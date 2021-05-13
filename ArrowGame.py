import random


class Arrow:
    def __init__(self, x, y):
        self.possible_state: dict = {
            0: "Up",
            1: "Right",
            2: "Down",
            3: "Left"
        }
        self.position: tuple[int, int] = (x, y)
        self.state: int = random.randint(0,3)

    def rotate(self):
        self.state = (self.state + 1) % 4

    def __repr__(self):
        return f"{self.state}"



class ArrowBoard:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.board: list[list[Arrow]] = [[Arrow(x, y) for x in range(self.width)] for y in range(self.height)]

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

    def rotate_piece(self, x, y):
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

    def _rotate_piece(self, x: int, y: int):
        pass

if __name__ == '__main__':
    b = ArrowBoard(3,3)
    while True:
        b.print_board(False)
        if b.check_solved():
            print("You won!")
            break
        piece = input("Which piece : ").replace(" ", "").split(",")
        b.rotate_piece(int(piece[0]), int(piece[1]))
