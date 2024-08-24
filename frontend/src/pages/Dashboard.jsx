import React, { useState, useEffect } from 'react';
import styles from '../style';
import Unauthorized from '../components/Unauthorized';
import Announcements from '../pages/Announcements';
import { jwtDecode } from 'jwt-decode';


const Dashboard = () => {
    const [isAdminUser, setIsAdminUser] = useState(false);
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


    return (
        <div>
            {isAdminUser ? (

                <div className="min-h-screen">
                    <div className="bg-slate-200">
                        <h1 className="text-4xl md:text-8xl text-center py-5">Admin Dashboard</h1>
                    </div>
                    <div className={` ${styles.paddingX} ${styles.flexStart}`}>
                        <div className={`${styles.boxWidth}`}>

                            <div className="container mx-auto p-4">
                                <h3 className="text-2xl font-bold mb-4 mt-10">Welcome to the Admin Dashboard!</h3>
                                <p className="text-lg">This dashboard enables administrators to manage various aspects of the pharmacy system efficiently. Here, you can view and handle patient prescriptions, manage product details, review user accounts, and address messages submitted via the contact form.</p>

                                <h2 className="text-2xl font-bold my-4">Features:</h2>
                                <ul className="list-disc list-inside mb-4">
                                    <li className="text-md"><strong>View Prescriptions:</strong> Browse through a list of prescriptions submitted by patients. This includes details such as patient information and submission timestamps.</li>
                                    <li className="text-md"><strong>Manage Product Details:</strong> Add, delete, and update product details to display on the landing page. Ensure that product information is accurate and up-to-date.</li>
                                    <li className="text-md"><strong>View User Accounts:</strong> Access and manage user accounts. This includes reviewing user details and ensuring that only authorized users have access to sensitive information.</li>
                                    <li className="text-md"><strong>Handle Messages:</strong> View and respond to messages uploaded via the contact form. Address any queries or concerns from users promptly.</li>
                                </ul>

                                <h2 className="text-2xl font-bold mb-4 text-crimson">Important Note:</h2>
                                <p className="text-lg">Ensure that all data handled through the admin dashboard is managed with the highest level of security and confidentiality. Adhere to legal and ethical standards to maintain the integrity and trust of the pharmacy system.</p>

                                <h2 className="text-2xl font-bold my-4">Usage Guidelines:</h2>
                                <ul className="list-disc list-inside">
                                    <li><strong>Maintain Accurate Records:</strong> Ensure all prescription and product details are accurate and up-to-date.</li>
                                    <li><strong>Secure User Information:</strong> Protect user data and maintain confidentiality at all times.</li>
                                    <li><strong>Respond Promptly to Queries:</strong> Address any messages or requests from users in a timely and efficient manner.</li>
                                    <li><strong>Adhere to Compliance:</strong> Follow all legal and regulatory requirements when managing prescriptions and user information.</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <Announcements />
                </div>
            ) : (
                <Unauthorized />
            )}
        </div>
    );
};

export default Dashboard;

