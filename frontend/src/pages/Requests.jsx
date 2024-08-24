import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import styles from '../style';
import Unauthorized from '../components/Unauthorized';
import { Button } from "../components/ui/button";

const Requests = () => {
    const [isAdminUser, setIsAdminUser] = useState(false);
    const [requests, setRequests] = useState([]);
    const [selectedRequests, setSelectedRequests] = useState(null);

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

    const handleItemClick = (request) => {
        setSelectedRequests(request);
    };

    useEffect(() => {
        if (isAdminUser) {
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
                    setRequests(data.requests);
                })
                .catch(error => {
                    console.error('Error fetching requests:', error);
                });
        }
    }, [isAdminUser]);

    const handleDelete = (id) => {
        fetch(`https://pharmacy-web-page.vercel.app/delete-request/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('jwt')}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Remove the deleted request from the state
                setRequests(requests.filter(request => request._id !== id));
            })
            .catch(error => {
                console.error('Error deleting request:', error);
            });
    };

    const handleApprove = (id) => {
        fetch(`https://pharmacy-web-page.vercel.app/approve-request/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('jwt')}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Update the request in the state to mark it as approved
                setRequests(requests.map(request => {
                    if (request._id === id) {
                        return { ...request, approved: true };
                    }
                    return request;
                }));
            })
            .catch(error => {
                console.error('Error approving request:', error);
            });
    };

    const handleDeny = (id) => {
        fetch(`https://pharmacy-web-page.vercel.app/deny-request/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('jwt')}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Remove the denied request from the state
                setRequests(requests.filter(request => request._id !== id));
            })
            .catch(error => {
                console.error('Error denying request:', error);
            });
    };

    return (
        <div>
            {isAdminUser ? (
                <div>
                    <div className="bg-slate-200">
                        <h1 className="text-4xl md:text-8xl text-center py-5">Requests <br className="sm:hidden" /> Management</h1>
                    </div>

                    <div className="container mx-auto p-4">
                        <h3 className="text-2xl font-bold mb-4">Welcome to the Requests Management Dashboard!</h3>
                        <p>This dashboard serves as a platform to manage requests made by customers regarding the availability of specific medicines. Here, you can review all requests, approve or deny requests based on the availability of the medicines, and delete requests when necessary.</p>

                        <h2 className="text-2xl font-bold my-4">Features:</h2>
                        <ul className="list-disc list-inside mb-4">
                            <li><strong>View Requests:</strong> You can browse through a list of requests made by customers regarding the availability of medicines. This allows you to see details such as the requested medicine, customer information, and request status.</li>
                            <li><strong>Approve or Deny Requests:</strong> Using this dashboard, you have the capability to approve or deny requests based on the availability of the requested medicines. This action communicates to the customer whether the requested medicines are available.</li>
                            <li><strong>Delete Requests:</strong> You can delete requests from the dashboard. However, exercise caution when deleting requests, ensuring it's necessary and won't affect the customer's experience negatively.</li>
                        </ul>

                        <h2 className="text-2xl font-bold mb-4 text-crimson">Important Note:</h2>
                        <p>When managing requests, it's important to consider the impact on customer satisfaction and experience. Ensure that requests are handled promptly and accurately to maintain trust and reliability with customers.</p>

                        <h2 className="text-2xl font-bold my-4">Usage Guidelines:</h2>
                        <ul className="list-disc list-inside">
                            <li><strong>Handle Requests Timely:</strong> Process requests in a timely manner to provide customers with prompt responses regarding the availability of requested medicines.</li>
                            <li><strong>Communicate Clearly:</strong> When approving or denying requests, provide clear and concise explanations to customers regarding the availability status of requested medicines.</li>
                            <li><strong>Exercise Caution when Deleting Requests:</strong> Before deleting requests, ensure it's necessary and won't cause inconvenience to the customer. Consider alternative solutions if possible.</li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center justify-center bg-gray-100">
                        {requests.length === 0 && (
                            <p className="text-lg my-4">
                                <span className="text-crimson font-semibold text-lg">Note:</span> No requests to display
                            </p>
                        )}
                    </div>
                    <div className={` ${styles.paddingX} ${styles.flexStart} mt-10 items-center`}>
                        <div className={`${styles.boxWidth}`}>
                            {/* Render messages in table format */}
                            <div className="shadow shadow-sm shadow-primary my-8 border p-4 overflow-x-auto bg-gray-100">
                                {/* Prompt for users to scroll on small devices */}
                                <p className="text-center text-black font-semibold block sm:hidden text-sm mt-2">Scroll horizontally to view more</p>
                                <p className="text-center text-black text-lg text-start font-semibold text-sm mt-2">Number of requests: {requests.length}</p>
                                <p className="text-center text-black text-lg text-start font-semibold text-sm mt-2">Click on a request to expand</p>
                                <table className="w-full min-w-max">
                                    <thead>
                                        {/* Table header */}
                                        <tr className="bg-gray-200">
                                            <th className="py-2 px-4">Name</th>
                                            <th className="py-2 px-4">Email</th>
                                            <th className="py-2 px-4">Date</th>
                                            <th className="py-2 px-4">Request</th>
                                            <th className="py-2 px-4">Delete</th>
                                            <th className="py-2 px-4">Approve</th>
                                            <th className="py-2 px-4">Deny</th>
                                            <th className="py-2 px-4">Status</th>
                                        </tr>
                                    </thead>
                                    {/* Table body */}
                                    <tbody className="cursor-pointer text-center">
                                        {requests.map((request, index) => (
                                            <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-red-100`} onClick={() => handleItemClick(request)}>
                                                <td className="py-2 px-4">{request.name}</td>
                                                <td className="py-2 px-4">{request.email}</td>
                                                <td className="py-2 px-4">{request.date}</td>
                                                <td className="py-2 px-4">
                                                    {request.message.split(' ').length > 10 ? (
                                                        <>
                                                            {request.message.split(' ').slice(0, 10).join(' ')}...
                                                        </>
                                                    ) : (
                                                        request.message
                                                    )}
                                                </td>
                                                <td className="py-2 px-4">
                                                    <Button onClick={() => handleDelete(request._id)}
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold text-md py-2 px-4">Delete</Button>
                                                </td>
                                                <td className="py-2 px-4">
                                                    <Button onClick={() => handleApprove(request._id)}
                                                        className="bg-green hover:bg-green-700 text-white font-bold text-md py-2 px-4">Approve</Button>
                                                </td>
                                                <td className="py-2 px-4">
                                                    <Button onClick={() => handleDeny(request._id)}
                                                        className="bg-crimson hover:bg-red-700 text-white font-bold text-md py-2 px-4">Deny</Button>
                                                </td>
                                                <td className="py-2 px-4">{request.approved ? 'Approved' : 'Pending/Denied'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Unauthorized />
            )}
            {selectedRequests && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-md">
                        <h1 className="text-3xl font-bold mb-4 text-center">Medicine</h1>
                        <p className="text-gray-700 text-center">{selectedRequests.message}</p>
                        <button onClick={() => setSelectedRequests(null)} className="mt-4 bg-blue hover:bg-gray-400 text-white hover:text-800 font-bold py-2 px-4 rounded inline-flex items-center">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Requests;

