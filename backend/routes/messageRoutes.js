import express from "express";

import { submitMessage, getAllMessages, deleteMessage ,deleteAllMessages} from "../controllers/contactController.js";
import {requireAuth ,checkUser, requireRole} from "../middleware/authMiddleware.js";
import { ROLES } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/submit-message", submitMessage);
router.get("/get-messages",  getAllMessages);
router.delete("/delete-message/:id", deleteMessage);
router.delete("/delete-all-messages", deleteAllMessages);

export default router
