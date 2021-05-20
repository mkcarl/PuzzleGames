#! .\venv\scripts\python.exe
import pyautogui as pag
import mouse
import time
import pytesseract
import cv2
from PIL import Image, ImageGrab
import numpy as np
pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'


def main(): 
    screen = ImageGrab.grab(all_screens=True)
    (startX, startY), (endX, endY) = get_board_position()
    grids = get_grids_position(startX, startY, endX, endY)
    board_state = board_to_array(screen, grids)
    print(board_state)


def get_board_position() -> list[tuple[int, int]]:
    print("Please select the start position of the grid in: ")
    for i in reversed(range(0, 4)): 
        print(i)
        time.sleep(0.5)
    start = None
    end = None
    pos = None
    while not mouse.is_pressed("left"): 
        pos = mouse.get_position()
    start = pos
    print(f"Starting position is ${start}")

    print("Please select the end position of the grid in: ")
    for i in reversed(range(0, 4)): 
        print(i)
        time.sleep(1)
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
    for num in numbers: 
        num_str = pytesseract.image_to_string(num, lang='eng',config='--psm 10 --oem 3 -c tessedit_char_whitelist=1234')
        num_list.append(int(num_str[0])-1) # make sure the board works with the current program which is 1-4

    num_arr = np.array(num_list).reshape(4,4)

    return num_arr


if __name__ == "__main__": 
    main()