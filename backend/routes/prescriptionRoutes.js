import express from 'express';
import multer from 'multer';
import { createPrescription, getAllPrescriptions } from '../controllers/prescriptionController.js';

const router = express.Router();

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // specify the directory where files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // use the original file name
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

router.post('/prescription', upload.single('prescription'), createPrescription);
router.get('/prescription', getAllPrescriptions);

export default router;

