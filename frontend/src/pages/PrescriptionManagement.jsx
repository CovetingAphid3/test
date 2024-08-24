import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import styles from '../style';
import Unauthorized from '../components/Unauthorized';

const PrescriptionManagement = () => {
    const [isAdminUser, setIsAdminUser] = useState(false);
    const [prescriptions, setPrescriptions] = useState([]);
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch('https://pharmacy-web-page.vercel.app/files');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFiles(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchFiles();
    }, []);

    useEffect(() => {
        const token = getCookie('jwt'); // Check if token exists in cookie
        if (token) {
            const decodedToken = jwtDecode(token); // Decode JWT token
            if (decodedToken.role === 'admin') {
                setIsAdminUser(true);
            }
        }
    }, []);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };
    useEffect(() => {
        if (isAdminUser) {
            fetch('https://pharmacy-web-page.vercel.app/prescription', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('jwt')}` // Replace YOUR_ACCESS_TOKEN with your actual token
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setPrescriptions(data);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
        }
    }, [isAdminUser]);


    return (
        <div>
            {isAdminUser ?
                <div>
                    <div className="bg-slate-200">
                        <h1 className="text-4xl md:text-8xl text-center py-5">Prescription Management</h1>
                    </div>

                    <div className="container mx-auto p-4">
                        <h3 className="text-2xl font-bold mb-4">Welcome to the Prescription Management Dashboard!</h3>
                        <p>This dashboard enables pharmacists to attend to prescriptions submitted by patients. Here, you can view all submitted prescriptions and take appropriate actions to fulfill them.</p>

                        <h2 className="text-2xl font-bold my-4">Features:</h2>
                        <ul className="list-disc list-inside mb-4">
                            <li><strong>View Prescriptions:</strong> You can browse through a list of prescriptions submitted by patients. This includes details such as patient information and submission timestamp.</li>
                            <p className="text-lg"><span className="text-crimson text-bold text-lg">Note : </span> Prescriptions are stored securely and can only be accessed by authorized users. <br/> Prescriptions can be downloaded from the list at the bottom of the page. They will be listed by the patients name</p>
                            <li><strong>Fulfill Prescriptions:</strong> Using this dashboard, you have the capability to fulfill prescriptions by dispensing the prescribed medications. Ensure accuracy and adherence to medical guidelines when fulfilling prescriptions.</li>
                        </ul>

                        <h2 className="text-2xl font-bold mb-4 text-crimson">Important Note:</h2>
                        <p>Prescriptions submitted by patients are critical for providing them with the necessary medications and healthcare services. Exercise diligence and care when handling prescriptions to ensure patient safety and well-being.</p>

                        <h2 className="text-2xl font-bold my-4">Usage Guidelines:</h2>
                        <ul className="list-disc list-inside ">
                            <li><strong>Review Prescriptions Carefully:</strong> Thoroughly review each prescription to understand the patient's medical needs and ensure appropriate medications are dispensed.</li>
                            <li><strong>Dispense Medications Accurately:</strong> When fulfilling prescriptions, ensure accuracy in dispensing medications and provide clear instructions to patients regarding dosage and usage.</li>
                            <li><strong>Adhere to Legal and Ethical Standards:</strong> Ensure compliance with legal and ethical standards when handling prescriptions, maintaining patient confidentiality and privacy at all times.</li>
                        </ul>

                    </div>
                    <div className="flex flex-col items-center justify-center bg-gray-100">
                        {prescriptions.length < 0 && (
                            <p className="text-lg my-4">
                                <span className="text-crimson font-semibold text-lg">Note:</span> No prescriptions to display
                            </p>
                        )}
                    </div>

                    <div className={` ${styles.paddingX} ${styles.flexStart} mt-10 items-center`}>

                        <div className={`${styles.boxWidth}`}>
                            {/* Render messages in table format */}
                            <div className="shadow shadow-sm shadow-black my-8 border p-4 overflow-x-auto bg-gray-100">
                                {/* Prompt for users to scroll on small devices */}
                                <p className="text-center text-black font-semibold block sm:hidden text-sm mt-2">Scroll horizontally to view more</p>
                                <p className="text-center text-black text-lg text-start font-semibold text-sm mt-2">Number of prescriptions: {prescriptions.length}</p>

                                <table className="w-full max-w-full">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="py-2 px-4">Full Name</th>
                                            <th className="py-2 px-4">Email</th>
                                            <th className="py-2 px-4">Date</th>
                                            <th className="py-2 px-4">Comment</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 cursor-pointer text-center">
                                        {prescriptions.map((prescription, index) => (
                                            <tr key={index}>
                                                <td className="py-2 px-4">{prescription.fullName}</td>
                                                <td className="py-2 px-4">{prescription.email}</td>
                                                <td className="py-2 px-4">{prescription.date}</td>
                                                <td>{prescription.comment}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>

                    </div>

                    <div className={` ${styles.paddingX} ${styles.flexStart} mt-10 items-center`}>
                        <div className={`${styles.boxWidth}`}>
                            <div className="my-8 border p-4 overflow-x-auto bg-gray-100">
                                <h1 className="text-2xl font-bold text-center mb-3">Files</h1>

                                <p className="text-center text-crimson font-semibold block text-sm mb-2">Click on a file to download</p>
                                {error && <p className="text-red-500 text-center mb-4">Error: {error}</p>}
                                <ul className="mx-auto bg-white shadow-lg rounded-lg p-4">
                                    {files.length == 0 ? <p className="text-center">No files to display</p> : null}
                                    {files.map((file) => (
                                        <li key={file.pathname} className="border-b last:border-none">
                                            <a
                                                href={file.downloadUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block p-4 hover:bg-gray-100 transition-colors text-center"
                                            >
                                                {file.pathname}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
                : <Unauthorized />
            }
        </div>
    )
}

export default PrescriptionManagement
