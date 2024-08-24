import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Unauthorized from '../components/Unauthorized';
import styles from '../style';
import Title from '../components/Title';
import { Link } from "react-router-dom";

const UserDashboard = () => {
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isUser, setIsUser] = useState(false);
    const [request, setRequest] = useState([]);
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const token = getCookie('jwt'); // Check if token exists in cookie
        if (token) {
            const decodedToken = jwtDecode(token); // Decode JWT token
            setUserName(decodedToken.email); // Extract user's name from decoded token
            setFirstName(decodedToken.firstName);
            setLastName(decodedToken.lastName);
            setPhoneNumber(decodedToken.phoneNumber);
            setEmail(decodedToken.email);

            if (decodedToken.role === 'user') {
                setIsUser(true);
            }
        }
        else {
            //redirect to login page
            window.location.href = '/log';

        }
    }, []);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    useEffect(() => {
        if (isUser) {
            fetch('https://pharmacy-web-page.vercel.app/get-requests', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('jwt')}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Filter requests to include only those with the user's email
                    const filteredRequests = data.requests.filter(request => request.email === userName);
                    setRequest(filteredRequests);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
        }
    }, [isUser, userName, firstName, lastName, phoneNumber, email]);

    useEffect(() => {
        fetch('https://pharmacy-web-page.vercel.app/announcements', {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Filter requests to include only those with the user's email
                setAnnouncements(data.announcements);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    }, []);



    return (
        <div>
            {isUser ? (
                <div>
                    <div className="bg-slate-200">
                        <h1 className="text-6xl md:text-8xl text-center py-5">User Dashboard</h1>

                    </div>
                    <div className="container mx-auto p-4">
                        <h3 className="text-2xl font-bold mb-4">Welcome to Your User Dashboard!</h3>
                        <p>This dashboard provides you with personalized access to your account details, submitted requests, and announcements from our platform.</p>

                        <h2 className="text-2xl font-bold my-4">Quick Access:</h2>
                        <p className="mb-2">Below are links for online services:</p>
                        <ul className="list-disc list-inside mb-4">
                            <li className="text-lg ">Looking to upload your prescription? Click <Link to="/prescription-submission" className="text-blue font-bold underline">here</Link>
                            </li>
                            <li className="text-lg ">Looking to check availability? Click <Link to="/check-availability" className="text-blue font-bold underline">here</Link>
                            </li>

                        </ul>

                        <h2 className="text-2xl font-bold mb-4">Announcements:</h2>
                        <p className="mb-2">Stay updated with the latest announcements:</p>
                        <ul className="list-disc list-inside mb-4">
                            {announcements.length === 0 && <li className="text-lg">No announcements available</li>}

                            {announcements.map((announcement) => (
                                <li key={announcement.id} className="text-lg text-black">
                                    <span className='font-bold'>{announcement.title} :</span><br />
                                    <span className="ml-10">{announcement.description}</span> <br />
                                    <span className="ml-10 font-bold">Date: {new Date(announcement.date).toLocaleDateString()}</span>
                                </li>
                            ))}
                        </ul>

                        <p>Thank you for being a valued member of our platform. If you have any questions or need assistance, feel free to reach out to our support team.</p>
                    </div>


                    <div className={`${styles.paddingX} ${styles.flexStart} items-center`}>
                        <div className={`${styles.boxWidth}`}>
                            <Title>Your Details</Title>
                            <div className="shadow shadow-sm shadow-primary mt-4 border p-4 overflow-x-auto bg-gray-100">
                                <p className="text-center text-black font-semibold block sm:hidden text-sm mt-2">Scroll horizontally to view more</p>

                                <table className="w-full min-w-max">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-3 text-left">First Name</th>
                                            <th className="p-3 text-left">Last Name</th>
                                            <th className="p-3 text-left">Phone</th>
                                            <th className="p-3 text-left">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700 ">
                                        <tr className="bg-white">
                                            <td className="p-3">{firstName}</td>
                                            <td className="p-3">{lastName}</td>
                                            <td className="p-3">{phoneNumber}</td>
                                            <td className="p-3">{email}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.paddingX} ${styles.flexStart} mt-10 items-center`}>
                        <div className={`${styles.boxWidth}`}>
                            <Title>Requests</Title>
                            <p className="text-lg ">
                                <span className="text-crimson font-semibold text-lg">Note:</span> Here, you can easily keep track of the status of your availability requests. If you've submitted any requests, you'll find them listed below. Simply scroll through the table to view details such as your request's name, email, the request itself, its current status, and whether it's pending or approved.</p>
                            <div className="shadow shadow-sm shadow-primary my-8 border p-4 overflow-x-auto bg-gray-100">
                                <p className="text-center text-black font-semibold block sm:hidden text-sm mt-2">Scroll horizontally to view more</p>
                                <table className="w-full min-w-max">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="py-2 px-4">Name</th>
                                            <th className="py-2 px-4">Email</th>
                                            <th className="py-2 px-4">Request</th>
                                            <th className="py-2 px-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="cursor-pointer text-center">
                                        {request.map((item, index) => (
                                            <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-red-100`}>
                                                <td className="py-2 px-4">{item.name}</td>
                                                <td className="py-2 px-4">{item.email}</td>
                                                <td className="py-2 px-4">
                                                    {item.message.split(' ').length > 10 ? (
                                                        <>
                                                            {item.message.split(' ').slice(0, 10).join(' ')}...
                                                        </>
                                                    ) : (
                                                        item.message
                                                    )}
                                                </td>
                                                <td className="py-2 ">
                                                    <p className={`${item.approved ? 'bg-green' : 'bg-red-500'} text-white font-bold rounded text-center py-2 px-4`}>
                                                        {item.approved ? 'Approved' : 'Pending'}
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                            <div className="flex flex-col items-center justify-center bg-gray-100">
                                {request.length === 0 && (
                                    <p className="text-lg ">
                                        <span className="text-crimson font-semibold text-lg">Note:</span> No requests to display
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Unauthorized />
            )}
        </div>
    );
};

export default UserDashboard;

