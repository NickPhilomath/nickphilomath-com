import requests
import math
import random
import time
from os.path import exists

x = 0
y = 0
zoom = 6

squares = 4 ** zoom
squares_root = int(math.sqrt(squares))
print("total squares: ", squares)
print("squares each: ", squares_root)

while (True): # x < squares_root and y < squares_root
    #make random
    x = random.randint(0, squares_root-1)
    y = random.randint(0, squares_root-1)


    link = f"https://khms0.googleapis.com/kh?v=944&hl=en-US&x={x}&y={y}&z={zoom}"
    file = f'mapData/z{zoom}/map-{x}-{y}-{zoom}.jpg'
    # check if file downloaded before
    if not exists(file):
        print(f"downloading image: {x} {y}")

        img_data = requests.get(link).content
        with open(file, 'wb') as handler:
            handler.write(img_data)

        time.sleep(1 + random.randint(1, 3))
    else:
        print("found ", file)

    # # update
    # x=x+1
    # if x==squares_root:
    #     x = 0
    #     y=y+1