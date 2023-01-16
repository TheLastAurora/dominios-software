from PIL import Image
from skimage.transform import rotate
from deskew import determine_skew
import pytesseract
import numpy as np
from pathlib import Path
import cv2

# TODO: Definir uma função que compara

pytesseract.pytesseract.tesseract_cmd = "C:\\Program Files\\Tesseract-OCR\\tesseract.exe"


class Test:

    # Cartão resposta

    def __init__(self, src):
        self.src = cv2.imread(
            str(Path(__file__).resolve().parent) + '\\' + src)
        if (src is None):
            raise cv2.error
        else:
            # self.src = self.deskew(self.src)
            ocr_img = self.src[:round(1/3*self.src.shape[0])]
            omr_img = self.src[round(1/3*self.src.shape[0]):]
            self.header = OCR(ocr_img).header
            self.answers = OMR(omr_img).answers

    def deskew(self, img):
        img = np.array(img)
        angle = determine_skew(img, cv2.COLOR_BGR2GRAY)
        rotated = (rotate(img, angle, resize=True)*255).astype(np.uint8)
        return rotated


class OCR:
    def __init__(self, src):
        self.src = src
        self.set_bb()
        self.header = self.get_header()

    def add_mask(self, img):
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        img = cv2.threshold(
            gray, 0, 255, cv2.THRESH_BINARY_INV)[1]
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (12, 11))
        img = cv2.dilate(img, kernel, iterations=4)
        return img

    def set_bb(self):
        image = self.add_mask(self.src)
        self.boxes = cv2.findContours(
            image, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)[0]

    def new_method(self, image):
        return image

    def get_header(self):
        header = {}
        for bb in self.boxes:
            x, y, w, h = cv2.boundingRect(bb)
            text = (pytesseract.image_to_string(
                self.src[y:y+h, x:x+w], lang='por', config='--psm 6')).splitlines()
            test = self.src[y:y+h, x:x+w]
            if text:
                match text[0].strip():
                    case "Candidato(a)":
                        header['applicant_name'] = text[1].strip()
                    case "Numero do Concurso":
                        header['number'] = int(text[1].strip())
                    case "Número de Inscrição":
                        header['applicant_number'] = int(text[1].strip())
                    case "Local de Prova":
                        header['location'] = text[1].strip()
                    case "Tipo de Prova":
                        marks = self.src[y:y+h, x:x+w]
                        marks = marks[round(1/2*marks.shape[0]):]
                        header['type'] = OMR(marks).answers.flatten()
                    case "Situação do Candidato":
                        sit = self.src[y:y+h, x:x+w]
                        sit = sit[round(1/2*sit.shape[0]):,
                                  :round(1/5*sit.shape[1])]
                        sit = cv2.threshold(cv2.cvtColor(
                            sit, cv2.COLOR_BGR2GRAY), 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
                        if (cv2.countNonZero(sit) <= 0.12*sit.shape[0]*sit.shape[1]):
                            header['applicant_sit'] = 0
                        else:
                            header['applicant_sit'] = 1
                    case _:
                        pass
        return header


class OMR:
    def __init__(self, src):
        self.src = src
        self.add_mask()
        self.set_bb()
        self.answers = self.get_answers(self.boxes)

    def add_mask(self):
        gray = cv2.cvtColor(self.src, cv2.COLOR_BGR2GRAY)
        thresh = cv2.threshold(
            gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
        kernal = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 1))
        self.src = cv2.dilate(thresh, kernal, iterations=3)

    def set_bb(self):
        cnts, hierarchy = cv2.findContours(
            self.src, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        hierarchy = hierarchy[0]
        outer_countours = [c[0] for c in zip(
            cnts, hierarchy) if (c[1][2] != -1 and c[1][3] == -1)]
        self.boxes = self.filter_contours(self.src, outer_countours)

    def filter_contours(self, img, contours):
        boxes = np.array([cv2.boundingRect(c) for c in contours])
        remove = []
        img_area = img.shape[0]*img.shape[1]
        for i in range(len(boxes)):
            bb_y = boxes[i][1]
            bb_area = boxes[i][2]*boxes[i][3]
            if (bb_area < 0.08/100*img_area):
                remove.append(i)
        boxes = np.delete(boxes, remove, 0)
        return boxes

    def get_answers(self, bb):
        bb = bb[np.lexsort((bb[:, 1], bb[:, 0]))]
        # Corrects pixel aligment errors
        for i in range(len(bb)-1):
            if (-3 <= bb[i][0]-bb[i+1][0] < 0 and bb[i][1] > bb[i+1][1]):
                bb[i], bb[i+1] = bb[i+1], np.array([bb[i]])
        qnt = 0
        opt = set()
        for i in range(len(bb)-1):
            qnt += 1
            if (bb[i][0]+1.5*bb[i][2] > bb[i+1][0]):
                opt.add(round(bb[i][0]/10))
            else:
                break
        bb = bb.tolist()
        for i in range(len(bb)):
            bb[i] = self.get_mark(bb[i])
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

    def get_mark(self, bb):
        x, y, w, h = bb
        if (cv2.countNonZero(self.src[y:y+h, x:x+w])/((w*h)) >= 0.53):
            return 1
        return 0
