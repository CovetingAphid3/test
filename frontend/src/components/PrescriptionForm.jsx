import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import {jwtDecode} from 'jwt-decode';

const PrescriptionForm = () => {
    const [file, setFile] = useState(null);
    const [isUser, setIsUser] = useState(false);
    const [isAdminUser, setIsAdminUser] = useState(false);
    useEffect(() => {
        const token = getCookie('jwt'); // Check if token exists in cookie
        if (token) {
            const decodedToken = jwtDecode(token); // Decode JWT token
            if (decodedToken.role === 'admin') {
                setIsAdminUser(true);
            }
            if (decodedToken.role === 'user') {
                setIsUser(true);
            }

        }
    }, []);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            console.error('No file selected for upload');
            return;
        }

        try {
            // Extract the form data
            const prescriptionFormData = new FormData(event.target);
            const fullName = prescriptionFormData.get('fullName');

            // Upload the file with the full name
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fullName', fullName);

            const fileUploadResponse = await fetch('https://pharmacy-web-page.vercel.app/upload', {
                method: 'POST',
                body: formData,
            });

            if (!fileUploadResponse.ok) {
                throw new Error('Failed to upload file');
            }

            console.log('File uploaded successfully');

            // Prepare the rest of the form data
            const body = {
                fullName: fullName,
                email: prescriptionFormData.get('email'),
                date: prescriptionFormData.get('date'),
                comment: prescriptionFormData.get('comment'),
            };

            // Submit the prescription form
            const prescriptionFormResponse = await fetch('https://pharmacy-web-page.vercel.app/prescription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!prescriptionFormResponse.ok) {
                throw new Error('Failed to submit prescription form');
            }

            console.log('Prescription form submitted successfully');
            // Optionally, reset the form
            event.target.reset();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form
            id="prescriptionForm"
            method="POST"
            onSubmit={handleSubmit}
            className="mb-10 p-4 bg-gray-100 rounded-lg shadow-md">
            {!isUser && !isAdminUser ?
                <div className="mb-4 text-lg text-crimson">
                    Note: You are not loggd in. Please Login to submit a prescription
                </div> :

                null
            }

            <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name:</label>
                <input type="text" id="fullName" name="fullName" required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                <input type="email" id="email" name="email" required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
                <input type="text" id="date" name="date" required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div className="mb-4">
                <input type="file" name="file" accept=".pdf" onChange={handleFileChange} />
            </div>
            <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment:</label>
                <textarea id="comment" name="comment" rows="4" cols="50" className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
            </div>
            {!isUser && !isAdminUser ?
                <div className="mb-4 text-lg text-crimson">
                    Please Login to submit a prescription
                </div> :

                <Button type="submit" className="bg-blue text-white font-bold text-md px-4 py-2 rounded-md hover:bg-blue/90 focus:outline-none focus:bg-blue/90">
                    Submit
                </Button>
            }
        </form>
    );
};

export default PrescriptionForm;

