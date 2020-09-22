# -*- coding: utf-8 -*-

import os
import numpy as np

f = open("putput.svg","w")

def Test(name, x, y):
    print("\t<text x=\"{}\" y=\"{}\" font-size=\"9\" stroke=\"black\" stroke-width=\"1\" font-family=\"arial, sans-serif\">"
          .format(x,y), file=f)
    print("\t\t{}".format(name), file=f)
    print("\t</text>", file=f)

def Timming(x, y, step, h, pat):
    print("\t<polyline points=\"", file=f)
    for i, num in enumerate(pat):
        if num == 0:
            print("\t\t{} {} {} {}".format(x + step * i, y+h, x + step*(i+1), y+h), file=f)
        elif num == 1:
            print("\t\t{} {} {} {}".format(x + step * i, y-h, x + step*(i+1), y-h), file=f)
        else:
            print("", file=f)                   
    print("\t\" stroke=\"black\" fill=\"none\"></polyline>", file=f)
    
def Abb(x, y, h, w):
    print("\t<path d=\"M {} {} Q {} {} {} {} Q {} {} {} {}\" fill=\"none\" stroke=\"black\"></path>"
          .format(x, y-h*2, x-w, y-h, x, y, x+w, y+h, x, y+h*2), file=f)

print("<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xl=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"{}\" height=\"{}\">"
      .format(200,200), file=f)


Test("A TG", 0, 20)
Timming(100, 20, 3, 10, [0, 0, 0, 1, 0, 0, 1, 0, 0])
Abb(100 + 9*3, 20, 8, 5)
Abb(100 + 9*3 + 3, 20, 8, 5)

Test("B TG", 0, 60)
Timming(100, 60, 3, 10, [0, 0, 1, 0, 0, 1, 1, 1, 0])

print("</svg>", file=f)


f.close()