import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import styles from '../style';
import Unauthorized from '../components/Unauthorized';
import { Button } from "../components/ui/button";

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const Customers = () => {
    const [isAdminUser, setIsAdminUser] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = getCookie('jwt');
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.role === 'admin') {
                setIsAdminUser(true);
            }
        }
    }, []);

    useEffect(() => {
        if (isAdminUser) {
            fetch('https://pharmacy-web-page.vercel.app/get-users', {
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
                .then(data => setUsers(data))
                .catch(error => console.error('Error fetching users:', error));
        }
    }, [isAdminUser]);

    const handleDelete = (id) => {
        fetch(`https://pharmacy-web-page.vercel.app/delete-user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('jwt')}` // Replace YOUR_ACCESS_TOKEN with your actual token
            }
        })
            .then(response => {
                console.log(response)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Remove the deleted message from the state
                setUsers(users.filter(user => user.id !== id));
                window.location.reload();
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });

    };

    const renderUsersTable = (users, role) => (
        <div className={` ${styles.paddingX} ${styles.flexStart} mt-10 items-center`}>
            <div className={`${styles.boxWidth}`}>
                <div className="shadow shadow-sm shadow-primary my-8 border p-4 overflow-x-auto bg-gray-100">
                    <p className="text-center text-black font-semibold block sm:hidden text-sm mt-2">
                        Scroll horizontally to view more
                    </p>
                    <table className="w-full min-w-max">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4">Name</th>
                                <th className="py-2 px-4">Email</th>
                                <th className="py-2 px-4">Number</th>
                                {role === 'user' && <th className="py-2 px-4">Actions</th>}
                            </tr>
                        </thead>
                        <tbody className="cursor-pointer">
                            {users
                                .filter(user => user.role === role)
                                .map((user, index) => (
                                    <tr
                                        key={user._id}
                                        className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} text-center hover:bg-red-100`}
                                    >
                                        <td className="py-2 px-4">{`${user.firstName} ${user.lastName}`}</td>
                                        <td className="py-2 px-4">{user.email}</td>
                                        <td className="py-2 px-4">{user.phoneNumber}</td>
                                        {role === 'user' && (
                                            <td className="py-2 px-4">
                                                <Button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="bg-blue hover:bg-red-700 text-white font-bold text-md py-2 px-4"
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {isAdminUser ? (
                <div>
                    <div className="bg-slate-200">
                        <h1 className="text-6xl md:text-8xl text-center py-5">Manage Users</h1>
                    </div>
                    <div className="container mx-auto p-4">
                        <h3 className="text-2xl font-bold mb-4">Welcome to the User Management Dashboard!</h3>
                        <p>This dashboard serves as a central hub for overseeing and managing user accounts within our system. Here, you have the ability to view all users who have signed up, along with their associated details. This includes non-personal information such as contact details.</p>

                        <h2 className="text-2xl font-bold my-4">Features:</h2>
                        <ul className="list-disc list-inside mb-4">
                            <li><strong>View Users:</strong> You can browse through a list of users who have registered with our platform. This allows you to see important information such as their names, emails, and phone numbers.</li>
                            <li><strong>Delete User Accounts:</strong> While using this dashboard, you have the capability to delete user accounts if necessary. However, it's important to note that this action should only be taken when absolutely required.</li>
                        </ul>

                        <h2 className="text-2xl font-bold mb-4 text-crimson">Important Note:</h2>
                        <p>Admin accounts are integral to the functioning of our system and cannot be deleted through this dashboard. Admins play a crucial role in managing the platform, and their accounts are safeguarded against deletion.</p>

                        <h2 className="text-2xl font-bold my-4">Usage Guidelines:</h2>
                        <ul className="list-disc list-inside mb-4">
                            <li><strong>Use with Caution:</strong> Deleting user accounts should be approached with caution and only performed when warranted.</li>
                            <li><strong>Respect User Privacy:</strong> While viewing user details, it's essential to respect user privacy and confidentiality.</li>
                            <li><strong>Admin Account Safety:</strong> Please ensure the safety and security of admin accounts, as they hold significant authority within our system.</li>
                        </ul>

                        {users.length === 0 ? (
                            <p className="text-lg my-4">
                                <span className="text-crimson font-semibold text-lg">Note:</span> No users to display
                            </p>
                        ) : (
                            <>
                                {renderUsersTable(users, 'user')}
                                <h1 className="text-3xl md:text-5xl font-semibold">Admin Users</h1>
                                {renderUsersTable(users, 'admin')}
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <Unauthorized />
            )}
        </div>
    );
};

export default Customers;

