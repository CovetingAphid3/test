import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//handle errors 
const handleErrors = (err) => {
    let errors = { email: '', password: '' };

    //incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'that email is not registered';
    }
    //incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'that password is incorrect';
    }

    //duplicate error code
    if (err.code === 11000) {
        errors.email = "that email is already registered";
        return errors; // No need to process further if it's a duplicate error
    }

    //validation errors 
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

//create token 
const createToken = (id, email, role, firstName, lastName, phoneNumber) => {
    const maxAge = 3 * 24 * 60 * 60;
    return jwt.sign({ id, email, role, firstName, lastName, phoneNumber }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

export const signup_get = (req, res) => {
    res.json({ message: "You are already logged in or signed up" });
};

export const login_get = (req, res) => {
    res.json({ message: "You are not logged in" });
};

export const signup_post = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 }); // Added 'secure: true'
        res.status(201).json({ user: user._id });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ "error": "Email already in use" });
        }

        res.status(400).json({ "error": error.message });

    }
};

export const login_post = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);
        const token = createToken(user._id, user.email, user.role, user.firstName, user.lastName, user.phoneNumber); // Pass email and role to createToken function
        res.cookie("jwt", token, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 });
        res.status(200).json({ token }); // Sending token in the response
    } catch (error) {
        console.log(error);
        return res.status(400).json({ "error": error.message });
    }
};

export const logout_get = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
};

export const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });


    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });

    }
}
