import multer from 'multer';
import path from 'path';
import { generateID } from '../helpers/tokens.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/'); // Carpeta donde se guardan las imágenes
    },
    filename: function (req, file, cb) {
        const uniqueFilename = generateID() + path.extname(file.originalname); // Generar ID único para el archivo
        req.fileGeneratedName = uniqueFilename; // Almacenar el nombre generado en `req` para usarlo después
        cb(null, uniqueFilename);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Límite de 2 MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('El archivo debe ser una imagen en formato JPG, JPEG o PNG.'));
    }
});

export default upload;
