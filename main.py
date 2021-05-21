#! .\venv\scripts\python.exe
from ctypes.wintypes import tagRECT
from numpy.core.numeric import outer
import pyautogui as pag
import mouse
import keyboard
import time
import pytesseract
import cv2
from PIL import Image, ImageGrab
import numpy as np
import ArrowGame
import random
import matplotlib.pyplot as plt
pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'
pag.FAILSAFE = True
# pag.PAUSE = 1


def main(): 
    (startX, startY), (endX, endY) = get_board_position()
    grids = get_grids_position(startX, startY, endX, endY)
    claim = get_claim_position()
    print("Program will start in")
    for i in reversed(range(1, 4)):
        print(i) 
        time.sleep(0.8)

    TOTAL_GAMES = 5
    for i in range(TOTAL_GAMES):
        print(f"Game {i+1} of {TOTAL_GAMES}")
        screen = ImageGrab.grab(all_screens=True)
        board_state = board_to_array(screen, grids)
        steps = solution_of(board_state)
        # print(board_state)
        # print(steps)
        execute_clicker(steps, grids)
        claim_reward(claim)
        # time.sleep(1)

def get_board_position() -> list[tuple[int, int]]:
    print("Please select the start position of the grid : ")
    # for i in reversed(range(0, 4)): 
    #     print(i)
    #     time.sleep(0.3)
    start = None
    end = None
    pos = None
    while not mouse.is_pressed("left"): 
        pos = mouse.get_position()
    start = pos
    print(f"Starting position is ${start}")
    time.sleep(1)
    print("Please select the end position of the grid : ")
    # for i in reversed(range(0, 4)): 
    #     print(i)
    #     time.sleep(0.3)
    pos = None
    while not mouse.is_pressed("left"): 
        pos = mouse.get_position()
    end = pos
    print(f"Ending position is ${end}")

    return [start, end]

def get_grids_position(startX: int, startY: int, endX: int, endY: int): 
    x_offset = startX
    y_offset = startY

    board_width = endX - startX
    board_height = endY - startY

    grid_width = board_width/4
    grid_height = board_height/4

    grids_start_end = []
    for j in range(4): 
        for i in range(4): 
            grids_start_end.append(
                [(i*grid_width+x_offset, j*grid_height+y_offset), 
                ((i+1)*grid_width+x_offset, (j+1)*grid_height+y_offset)]
            )
    return grids_start_end

def board_to_array(full_screenshot ,grid_positions): 
    numbers = []
    for start, end in grid_positions: 
        width = end[0] - start[0]
        height = end[1] - start[1]
        offset = full_screenshot.size[0]/2
        margin_w = width * .25
        margin_h = height * .25
        cropped = full_screenshot.crop((start[0]+offset+margin_w, start[1]+margin_h, end[0]+offset-margin_w, end[1]-margin_h))
        gray = cv2.cvtColor(np.array(cropped), cv2.COLOR_RGB2GRAY)

        _, bin_img = cv2.threshold(gray, 0, 255, cv2.THRESH_OTSU)

        count_white = np.sum(bin_img>0)
        count_black = np.sum(bin_img==0)
        if count_black > count_white: 
            bin_img = 255 - bin_img
        numbers.append(bin_img)
    
    num_list = []
    count = 0 
    for num in numbers: 
        num_str = pytesseract.image_to_string(num, lang='eng',config='--psm 10 --oem 3 -c tessedit_char_whitelist=1234')
        count += 1 
        try: 
            num_list.append(int(num_str[0])-1) # make sure the board works with the current program which is 1-4
        except ValueError: 
            # in case tesseract does not read the digits properly 
            rnd = random.randrange(1,5,1)
            num_list.append(rnd)
            print(f"Inserted random number : ({rnd}) at position {count}")
            # plt.imshow(num)
            # plt.show()
        

    num_arr = np.array(num_list).reshape(4,4)

    return num_arr

def solution_of(custom_board_state): 
    game = ArrowGame.ArrowBoard(4,4, custom=custom_board_state)
    solver = ArrowGame.ArrowBoardSolver(game)
    output = solver.solve([4,4])
    return output

def execute_clicker(steps, grid_position): 
    # grid_centers = [((end[0]+start[0])/2, (end[1]+start[1])/2) for start, end in grid_position]
    grid_centers = []
    for start, end in grid_position: 
        grid_centers.append([ (end[0]+start[0])/2, (end[1]+start[1])/2 ])
    # grid_centers = grid_centers[::-1]
    grid_centers = [grid_centers[i:i+4] for i in range(0, len(grid_centers), 4)]
    grid_centers = list(zip(*grid_centers))

    # for y in range(4): 
    #     for x in range(4): 
    #         target = grid_centers[x][y]
    #         pag.click(target[0], target[1])
    #         time.sleep(0.5)

    for step in steps: 
        x = step[0]
        y = step[1]
        target = grid_centers[x][y]
        mouse.move(target[0], target[1], duration=0.045)
        mouse.click()
        # time.sleep(3)
        # pag.click(target[0], target[1], clicks=1, interval=1)

def get_claim_position(): 
    time.sleep(1)
    print("Please select the position of claim button : ")
    pos = None
    while not mouse.is_pressed("left"): 
        pos = mouse.get_position()
    
    return pos

def claim_reward(claim_button_position): 
    time.sleep(0.05)
    mouse.move(claim_button_position[0], claim_button_position[1], duration=0.05)
    mouse.click()
    keyboard.press_and_release("esc") # in case the game is not ended, it will back off of the retur screen 

if __name__ == "__main__": 
    main()