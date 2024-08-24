import express from 'express';
import { getAllAnnouncements, createAnnouncement, deleteAnnouncement } from '../controllers/announcementController.js';

const router = express.Router();

router.get('/announcements', getAllAnnouncements);
router.post('/announcements', createAnnouncement);
router.delete('/announcements/:id', deleteAnnouncement);

export default router
