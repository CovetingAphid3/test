import express from "express";
import { signup_get, signup_post, login_get, login_post ,logout_get, getAllUsers,deleteUser} from "../controllers/authController.js";
import {requireAuth ,checkUser, requireRole, sendUserData} from "../middleware/authMiddleware.js";
import { ROLES } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/signup", signup_get)
router.post("/signup",signup_post)
router.get("/login",login_get)
router.post("/login",login_post)
router.get("/logout",logout_get) 
router.get('/api/auth/check',requireAuth)
router.get('/checkUser',checkUser)
router.get('/isAdmin',  requireRole(ROLES.Admin))
router.get('/api/auth/sendUserData',sendUserData)
router.get('/get-users', getAllUsers)
router.delete('/delete-user/:id', deleteUser)
    

export default router
