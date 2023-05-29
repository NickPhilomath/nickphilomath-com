import requests
import math
import random
import time
from os.path import exists
from os import remove

x = 0
y = 0
zoom = 6

squares = 4 ** zoom
squares_root = int(math.sqrt(squares))

while (x < squares_root and y < squares_root):
    path = f'mapData/z{zoom}/map-{x}-{y}-{zoom}.jpg'
    delete = False

    if exists(path):
        with open(path, 'r') as handler:
            try:
                data = handler.read()
                if '<html>' in data:
                    print(path)
                    delete = True
                    # remove(path)
            except UnicodeDecodeError:
                print('valid')
    
    if delete:
        remove(path)
    
    # time.sleep(1)

    # update
    x=x+1
    if x==squares_root:
        x = 0
        y=y+1