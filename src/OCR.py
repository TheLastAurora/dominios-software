from PIL import Image
from skimage.transform import rotate
from deskew import determine_skew
import pytesseract
import numpy as np
from pathlib import Path
import cv2

pytesseract.pytesseract.tesseract_cmd = "C:\\Program Files\\Tesseract-OCR\\tesseract.exe"


def init(src):
    src = cv2.imread(
        str(Path(__file__).resolve().parent) + '\\respostas\\' + src + '.jpg')
    if (src is None):
        raise cv2.error
    else:
        return OCR(src[:round(1/3*src.shape[0])]), OMR(src[round(1/3*src.shape[0]):round(12/13*src.shape[0])])

### OCR ###


def OCR(src):
    # return header
    bb = set_bb_ocr(src)
    return get_header(src, bb)


def add_mask_ocr(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img = cv2.threshold(
        gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (6, 6))
    img = cv2.dilate(img, kernel, iterations=5)
    return img


def set_bb_ocr(src):
    image = add_mask_ocr(src)
    return cv2.findContours(
        image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[0]


def get_header(src, boxes):
    header = {}
    for bb in boxes:
        x, y, w, h = cv2.boundingRect(bb)
        test = src[y:y+h, x:x+w]
        if (src[y:y+h, x:x+w].size >= 0.06*src.size):
            continue
        text = (pytesseract.image_to_string(
            src[y:y+h, x:x+w], lang='por', config='--psm 6')).splitlines()
        if text:
            match text[0].replace('|', '').strip():
                case "NOME DO CANDIDATO":
                    header['nome_candidato'] = text[1].replace('|', '').strip()
                case "NÚMERO DO CONCURSO":
                    header['numero'] = int(text[1].replace('|', '').strip())
                case "NÚMERO DE INSCRIÇÃO":
                    header['numero_candidato'] = int(
                        text[1].replace('|', '').strip())
                case "LOCAL DA PROVA":
                    header['local_prova'] = text[1].replace('|', '').strip()
                case "VAGA":
                    header['cargo'] = text[1].replace('|', '').strip()
                case "TIPO DE PROVA":
                    marks = src[y:y+h, x:x+w]
                    marks = marks[round(2/6*marks.shape[0]):round(4/6*marks.shape[0]),
                                  round(1/10*marks.shape[1]):round(9/10*marks.shape[1])]
                    marks = cv2.threshold(cv2.cvtColor(
                        marks, cv2.COLOR_BGR2GRAY), 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
                    header['tipo'] = np.array((get_mark(marks, (0, 0, round(1/3*marks.shape[1]), marks.shape[0])), get_mark(
                        marks, (round(1/3*marks.shape[1]), 0, round(1/3*marks.shape[1]), marks.shape[0])), get_mark(marks, (round(2/3*marks.shape[1]), 0, round(1/3*marks.shape[1]), marks.shape[0]))))
                case "SITUAÇÃO":
                    sit = src[y:y+h, x:x+w]
                    sit = cv2.threshold(cv2.cvtColor(
                        sit, cv2.COLOR_BGR2GRAY), 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
                    header['situacao_candidato'] = get_mark(sit, (round(2/5*sit.shape[0]), round(
                        1/2*sit.shape[1]), round(2/6*sit.shape[0]), round(1/4*sit.shape[1])))
                case _:
                    pass
    if (not len(header['tipo'])):
        header['tipo'] = np.array([0])
    return header


### OMR ###


def OMR(src):
    img, boxes = set_bb_omr(src)
    return get_answers(img, boxes)


def add_mask_omr(src):
    gray = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)
    thresh = cv2.threshold(
        gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
    kernal = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 2))
    return cv2.dilate(thresh, kernal, iterations=2)


def set_bb_omr(src):

    img = add_mask_omr(src)
    cnts, hierarchy = cv2.findContours(
        img, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    hierarchy = hierarchy[0]
    outer_countours = [c[0] for c in zip(cnts, hierarchy)]
    return filter_contours(img, outer_countours)


def filter_contours(img, contours):
    boxes = np.array([cv2.boundingRect(c) for c in contours])
    remove = []
    img_area = img.shape[0]*img.shape[1]
    for i in range(len(boxes)):
        bb_y = boxes[i][1]
        bb_area = boxes[i][2]*boxes[i][3]
        if (bb_area < 0.082/100*img_area or bb_area > 0.2/100*img_area):
            remove.append(i)
    boxes = np.delete(boxes, remove, 0)
    return img, boxes


def get_answers(img, bb):
    bb = bb[np.lexsort((bb[:, 1], bb[:, 0]))]
    # Corrects pixel aligment errors
    for i in range(len(bb)-1):
        if (-8 <= bb[i][0]-bb[i+1][0] < 0 and bb[i][1] > bb[i+1][1]):
            bb[i], bb[i+1] = bb[i+1], np.array([bb[i]])
    qnt = 0
    opt = set()
    for i in range(len(bb)-1):
        qnt += 1
        if (bb[i][0]+1.5*bb[i][2] > bb[i+1][0]):
            opt.add(round(bb[i][0]/10))
        else:
            break
    opt = list(opt)
    if (opt[-1] < opt[-2]):
        del opt[-1]
    bb = bb.tolist()
    for i in range(len(bb)):
        bb[i] = get_mark(img, bb[i])
    col = len(opt)
    rows = qnt//col
    # Caso ele tenha apenas uma linha
    if (len(bb)-1 == len(opt)):
        col += 1
        rows = 1
    answers = []
    while (len(bb)):
        for i in range(col):
            if (len(bb) < rows):
                answers.append((bb[:len(bb)//col]))
                bb = np.delete(bb, range(len(bb)//col), axis=0)
            else:
                answers.append(bb[:rows])
                bb = np.delete(bb, range(rows), axis=0)
    aux_col = []
    while (len(answers)):
        aux_col.append(np.column_stack((answers[:col])))
        del answers[:col]
    answers = np.concatenate((aux_col[:]), axis=0)
    return answers


def get_mark(img, bb):
    x, y, w, h = bb
    test = img[y:y+h, x:x+w]
    if (cv2.countNonZero(img[y:y+h, x:x+w])/((w*h)) >= 0.33):
        return 1
    return 0
