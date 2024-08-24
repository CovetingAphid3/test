import Request from '../models/request.js';

// Controller function to handle form submission
export const submitRequest = async (req, res) => {
    try {
        // Extract form data from the request body
        const { name, email, message } = req.body;

        // Create a new Request object
        const newRequest = new Request({
            name,
            email,
            message,
        });

        // Save the Request to the database
        await newRequest.save();

        // Send a success response
        res.status(201).json({ message: 'Request submitted successfully' });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json({ requests });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve requests' });
    }
};

export const getRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await Request.findById(id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json({ request });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve request' });
    }
}

export const deleteAllRequests = async (req, res) => {
    try {
        await Request.deleteMany()
        res.status(200).json({ message: 'All requests deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete requests' });
    }
}

export const deleteRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await Request.findByIdAndDelete(id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete request' });
    }
}

// Controller function to approve or reject a request
export const approveRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const { approved } = req.body;

        // Find the request by ID and update the approved field
        const request = await Request.findByIdAndUpdate(id, { approved }, { new: true });

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.status(200).json({ message: 'Request updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update request' });
    }
};

// Controller function to deny a request
export const denyRequest = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the request by ID and delete it
        const request = await Request.findByIdAndDelete(id);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.status(200).json({ message: 'Request denied and deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to deny request' });
    }
};

