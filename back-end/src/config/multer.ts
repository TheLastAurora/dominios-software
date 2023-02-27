import multer from 'multer';
import path from 'path';

export const config = multer.diskStorage({
    destination: path.resolve('./../eval-app'),
    filename(request, file, callback) {
        const fileName = file.originalname;
        callback(null, fileName);
    }
})