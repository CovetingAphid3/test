import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    }
});

const Request = mongoose.model('request', requestSchema);

export default Request;
