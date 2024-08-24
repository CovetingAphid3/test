import Prescription from '../models/prescription.js';

export const createPrescription = async (req, res) => {
    try {
        const { fullName, email, date, comment } = req.body;
        const newPrescription = new Prescription({
            fullName,
            email,
            date,
            comment
        });

        // Save the new Prescription object to the database
        const savedPrescription = await newPrescription.save();

        // Send the saved Prescription object in the response
        res.status(201).json(savedPrescription);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(400).json({ message: error.message });
    }
}; export const getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find();
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
