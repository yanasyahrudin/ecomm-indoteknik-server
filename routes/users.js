const express = require('express')
const UserController = require('../controllers/userController')
const { authentication, authenticationUser, authenticationAdminSeller, authorization } = require('../middlewares/auth')
const bodyParser = require('body-parser'); 
const router = express.Router()
const multer = require('multer');
const path = require('path')
const fileStorage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, 'images')
        },
        filename: (req, file, cb) => {
            cb(null, new Date().getTime() + '-' + file.originalname)
        }
    }
); // Tentukan folder tujuan untuk menyimpan file yang diunggah

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const maxSize = 3 * 1024 * 1024 // 3 MB, sesuaikan dengan batas yang Anda inginkan

router.use(bodyParser.json());
router.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: maxSize // Batas ukuran berkas
    }
}).single('imageProfile'))

router.use((error, req, res, next) => {
    console.log(error);
    if (error instanceof multer.MulterError) {
        // Kesalahan dari multer (misalnya, ukuran berkas terlalu besar)
        res.status(400).json({ error: 'File size is too large' });
    } else {
        // Kesalahan lain
        res.status(500).json({ error: 'An error occurred while uploading the file' });
    }
});

router.get('/', authenticationUser, UserController.getAllUsers)
router.get('/me', authenticationUser, UserController.getMeById)
router.put('/me', authenticationUser, UserController.editUser)
router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.get('/cost', authenticationUser, UserController.getCost)
router.get('/province', authenticationUser, UserController.getProvince)
router.get('/city/:id', authenticationUser, UserController.getCity)
router.get('/subdistrict/:id', authenticationUser, UserController.getSubdistrict)
router.delete('/:id', authentication, authorization, UserController.deleteUser)
router.get('/:id', authenticationUser, UserController.detailsUser)
router.put('/incrementPurchasePoints/:id', authenticationUser, UserController.incrementPurchasePoints)

module.exports = router