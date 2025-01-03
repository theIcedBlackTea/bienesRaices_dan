import multer from 'multer'
import path from 'path'
import { generateID } from '../helpers/tokens.js'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/profile_images/')
    },
    filename: function (req, file, cb) {
        cb(null, generateID() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

export default upload