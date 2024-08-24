import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name.'],
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name.'],
    },
    phoneNumber: {
        type: String,
        minlength: [8, 'Please enter a valid phone number.'],
        required: [true, 'Please enter your phone number.'],
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email.'],
        unique: true,
        lowercase: true,
        validate: [
            email => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
            'Please enter a valid email.'
        ],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
        minlength: [10, 'Minimum password length is 10 characters.'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Define possible roles
        default: 'user' // Default role is user
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw new Error('Incorrect password');
    }
    throw new Error('Incorrect email');
};

const User = mongoose.model('user', userSchema);

export default User;

