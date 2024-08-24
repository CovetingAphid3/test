import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import styles from '../style';
import Unauthorized from '../components/Unauthorized';
import { Button } from "../components/ui/button";

const Messages = () => {
    const [isAdminUser, setIsAdminUser] = useState(false);
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        const token = getCookie('jwt'); // Check if token exists in cookie
        if (token) {
            const decodedToken = jwtDecode(token); // Decode JWT token
            if (decodedToken.role === 'admin') {
                setIsAdminUser(true);
            }
        }
    }, []);

    useEffect(() => {
        if (isAdminUser) {
            fetch('https://pharmacy-web-page.vercel.app/get-messages', {
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
                    setMessages(data.messages);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
        }
    }, [isAdminUser]);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const handleDelete = (id) => {
        fetch(`https://pharmacy-web-page.vercel.app/delete-message/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('jwt')}` // Replace YOUR_ACCESS_TOKEN with your actual token
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Remove the deleted message from the state
                setMessages(messages.filter(message => message.id !== id));
            })
            .catch(error => {
                console.error('Error deleting message:', error);
            });
    };

    const handleItemClick = (message) => {
        setSelectedMessage(message);
    };

    return (
        <div>
            {isAdminUser ? (
                <div>
                    <div className="bg-slate-200">
                        <h1 className="text-6xl md:text-8xl text-center py-5">Manage Messages</h1>
                    </div>
                    <div className="container mx-auto p-4">
                        <h3 className="text-2xl font-bold mb-4">Welcome to the Messages Management Dashboard!</h3>
                        <p>This dashboard allows you to oversee messages submitted by users through the contact form on our website. Here, you can view all messages, as well as delete them if necessary.</p>

                        <h2 className="text-2xl font-bold my-4">Features:</h2>
                        <ul className="list-disc list-inside mb-4">
                            <li><strong>View Messages:</strong> You can browse through a list of messages submitted by users through the contact form. This includes details such as the sender's name, email, message content, and submission timestamp.</li>
                            <li><strong>Delete Messages:</strong> Using this dashboard, you have the capability to delete messages when necessary. Be cautious when deleting messages, ensuring it's required and won't impact communication with users.</li>
                        </ul>

                        <h2 className="text-2xl font-bold mb-4 text-crimson">Important Note:</h2>
                        <p>Messages submitted through the contact form are vital for communication with users. Exercise caution when handling messages to ensure that important inquiries or feedback are not overlooked or deleted unintentionally.</p>

                        <h2 className="text-2xl font-bold my-4">Usage Guidelines:</h2>
                        <ul className="list-disc list-inside ">
                            <li><strong>Review Messages Regularly:</strong> Check the messages dashboard regularly to stay updated on incoming messages and respond promptly to user inquiries or feedback.</li>
                            <li><strong>Handle Messages with Care:</strong> When deleting messages, ensure it's necessary and won't result in the loss of important communication. Consider archiving messages if there's a need to retain them for future reference.</li>
                        </ul>

                    </div>


                    <div className="flex flex-col items-center justify-center bg-gray-100">
                        {messages.length < 0 && (
                            <p className="text-lg my-4">
                                <span className="text-crimson font-semibold text-lg">Note:</span> No messages to display
                            </p>
                        )}
                    </div>
                    <div className={` ${styles.paddingX} ${styles.flexStart} mt-10 items-center`}>


                        <div className={`${styles.boxWidth}`}>
                            {/* Render messages in table format */}
                            <div className="shadow shadow-lg shadow-primary my-8 border p-4 rounded-lg overflow-x-auto bg-gray-100">
                                {/* Prompt for users to scroll on small devices */}
                                <p className="text-center text-black font-semibold block sm:hidden text-sm mt-2">Scroll horizontally to view more</p>
                                <p className="text-center text-black text-lg text-start font-semibold text-sm mt-2">Number of messages: {messages.length}</p>
                                <p className="text-center text-black text-lg text-start font-semibold text-sm mt-2">Click on a message to expand</p>
                                <table className="w-full min-w-max">
                                    <thead>
                                        {/* Table header */}
                                        <tr className="bg-gray-200"><th className="py-2 px-4">Name</th><th className="py-2 px-4">Email</th><th className="py-2 px-4">Date</th><th className="py-2 px-4">Message</th><th className="py-2 px-4">Actions</th></tr>

                                    </thead>
                                    {/* Table body */}
                                    <tbody className="cursor-pointer">
                                        {messages.map((message, index) => (
                                            <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-red-100`} onClick={() => handleItemClick(message)}>
                                                <td className="py-2 px-4">{message.name}</td>
                                                <td className="py-2 px-4">{message.email}</td>
                                                <td className="py-2 px-4">{message.date}</td>
                                                <td className="py-2 px-4">
                                                    {message.message.split(' ').length > 10 ? (
                                                        <>
                                                            {message.message.split(' ').slice(0, 10).join(' ')}...
                                                        </>
                                                    ) : (
                                                        message.message
                                                    )}
                                                </td>
                                                <td className="py-2 px-4">
                                                    <Button onClick={() => handleDelete(message._id)}
                                                        className="bg-blue hover:bg-red-700 text-white font-bold text-md py-2 px-4">Delete</Button>
                                                </td>
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
            {selectedMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-md">
                        <h1 className="text-3xl font-bold mb-4 text-center">Message</h1>
                        <p className="text-gray-700 text-center">{selectedMessage.message}</p>
                        <button onClick={() => setSelectedMessage(null)} className="mt-4 bg-blue hover:bg-gray-400 text-white hover:text-800 font-bold py-2 px-4 rounded inline-flex items-center">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Messages;

