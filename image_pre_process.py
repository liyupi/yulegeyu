import os
from tkinter import W
from turtle import width
import cv2
import numpy as np

def padding_resize(img):
    height, width, _ = img.shape
    if height == width:
        return img
    
    if height > width:
        blank_img = np.zeros((height,height,3), np.uint8)
        x0 = int((height-width)/2)
        y0 = 0
        x1 = x0+width
        y1 = height
    else:
        blank_img = np.zeros((width,width,3), np.uint8)
        x0 = 0
        y0 = int((width-height)/2)
        x1 = width
        y1 = y0+height
    blank_img[y0:y1,x0:x1] = img
    return blank_img

if __name__ == '__main__':
    target_dir = 'src/public/images/'
    all_imgs = os.listdir(target_dir)
    for image in all_imgs:
        print(image)
        img_path = os.path.join(target_dir,image)
        img = cv2.imread(img_path)
        img_out = padding_resize(img)
        img_out_path = img_path.replace('.tif','.jpg')
        cv2.imwrite(img_out_path, img_out)
