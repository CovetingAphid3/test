import Contact from "../models/message.js"; 

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { name: '', email: '', message: '' };

    //incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'that email is not registered';
    }
    //validation errors 
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

export const submitMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const contact = await Contact.create({ name, email, message });
        res.status(201).json({ contact: contact._id });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};

export const getAllMessages = async (req, res) => {
    try {
        const messages = await Contact.find();
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve messages' });
    }
};

export const deleteAllMessages = async (req, res) => {
    try {
        await Contact.deleteMany();
        res.status(200).json({ message: 'All messages deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete messages' });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Contact.findByIdAndDelete(id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete message' });
    }
};

