import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: String, // Change type to String
        required: true,
        validate: {
            validator: function(v) {
                // Check if the date string matches the format dd/mm/yy
                return /\d{2}\/\d{2}\/\d{2}/.test(v);
            },
            message: props => `${props.value} is not in the format dd/mm/yy!`
        }
    },
    available: {
        type: Boolean,
        default: false
    },
    comment: {
        type: String
    }
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

export default Prescription;

