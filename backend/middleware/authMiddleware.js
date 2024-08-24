import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from 'dotenv';

dotenv.config();

export const ROLES = {
    User: 'user',
    Admin: 'admin',
};

// Middleware to require authentication
export const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    // check json web token exists and is verified
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/login");
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
};

// Middleware to check if user exists and attach user data to res.locals
export const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                console.log(res.locals.user);
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

// Middleware to require a specific role
export const requireRole = (role) => {
    return (req, res, next) => {
        if (res.locals.user && res.locals.user.role === role) {
            next();
        } else {
            res.status(403).json({ error: 'Forbidden' }); // Or redirect to an error page
        }
    };
};
export const sendUserData = async (req, res, next) => {
    res.json({ user: res.locals.user }); // Sending user data in JSON format
};
