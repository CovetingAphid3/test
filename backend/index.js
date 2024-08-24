import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authrouter from './routes/authRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import productRouter from './routes/productRoutes.js';
import requestRouter from './routes/requestRoutes.js';
import prescriptionRouter from './routes/prescriptionRoutes.js';
import announcementRouter from './routes/announcementsRoutes.js';
import multer from 'multer';
import axios from 'axios';
import { put, list } from '@vercel/blob';

const app = express();
const upload = multer();

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(cors({
    origin: ["https://pharmacy-web-page.vercel.app", "http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Database connection
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Routes
app.use(authrouter);
app.use(messageRouter);
app.use(productRouter);
app.use(requestRouter);
app.use(prescriptionRouter);
app.use(announcementRouter);

// Upload route
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fullName = req.body.fullName;
        const originalFilename = req.file.originalname;
        const filename = `${fullName}-${originalFilename}`;

        const result = await put(filename, req.file.buffer, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
            addRandomSuffix: false,
        });

        console.log({ result });

        res.status(200).json({ message: 'File uploaded successfully', result });
    } catch (err) {
        console.error('Error uploading blob:', err);
        res.status(500).json({ error: 'An error occurred while uploading the file.' });
    }
});

// List all blobs route
app.get('/files', async (req, res) => {
    try {
        const response = await list({
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        res.status(200).json(response.blobs);
    } catch (err) {
        console.error('Error fetching files:', err);
        res.status(500).json({ error: 'An error occurred while fetching the files.' });
    }
});

// Download route
app.get('/download/:filename', async (req, res) => {
    try {
        const filename = req.params.filename;
        const response = await axios.get(`https://api.vercel.com/v2/now/storage/get?key=${filename}`, {
            headers: {
                Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
            },
            responseType: 'arraybuffer'
        });

        if (response.status !== 200) {
            return res.status(response.status).json({ error: response.statusText });
        }

        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        res.setHeader('Content-Type', response.headers['content-type']);
        res.send(response.data);
    } catch (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({ error: 'An error occurred while downloading the file.' });
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

