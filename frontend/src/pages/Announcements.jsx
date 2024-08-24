import React, { useState, useEffect } from 'react'
import styles from '../style';
import { Button } from "../components/ui/button";

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };


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

    const handleDelete = (id) => {
        fetch(`https://pharmacy-web-page.vercel.app/announcements/${id}`, {
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
                setAnnouncements(announcements.filter(announcement => announcement.id !== id));
                //reload page 
                window.location.reload();
            })
            .catch(error => {
                console.error('Error deleting message:', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            title: formData.get('title'),
            description: formData.get('description'),
        };

        fetch('https://pharmacy-web-page.vercel.app/announcements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                // Handle successful response
                console.log('Success:', responseData);
                // Optionally, reset the form
                event.target.reset();
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
    };


    const handleItemClick = (announcement) => {
        setSelectedMessage(announcement);
    };


    return (
        <div>

            <h1 className={`${styles.heading2} text-center text-ring font-bold`}>Post Announcements</h1>
            <form
                method="POST"
                onSubmit={handleSubmit}
                className={`${styles.paddingX} md:w-1/2 mx-auto mt-10`}
            >
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title :</label>
                    <input type="text" id="title" name="title" required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea id="description" name="description" rows="4" cols="50" className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
                </div>
                <Button type="submit">
                    Submit
                </Button>
            </form>
            <div className={` ${styles.paddingX} ${styles.flexStart} mt-10 items-center`}>


                <div className={`${styles.boxWidth}`}>
                    {/* Render messages in table format */}
                    <div className="shadow shadow-sm shadow-primary my-8 border p-4 rounded-sm overflow-x-auto bg-gray-100">
                        {/* Prompt for users to scroll on small devices */}
                        <p className="text-center text-black font-semibold block sm:hidden text-sm mt-2">Scroll horizontally to view more</p>
                        <p className="text-center text-black text-lg text-start font-semibold text-sm mt-2">Number of announcements: {announcements.length}</p>
                        <p className="text-center text-black text-lg text-start font-semibold text-sm mt-2">Click on an announcement to expand</p>

                        <table className="w-full min-w-max">
                            <thead>
                                {/* Table header */}
                                <tr className="bg-gray-200"><th className="py-2 px-4">Name</th><th className="py-2 px-4">Description</th><th className="py-2 px-4">Date</th><th className="py-2 px-4">Actions</th></tr>

                            </thead>
                            {/* Table body */}
                            <tbody className="cursor-pointer">
                                {announcements.map((announcement, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-red-100`} >
                                        <td className="py-2 px-4">{announcement.title}</td>
                                        <td className="py-2 px-4">{announcement.description}</td>
                                        <td className="py-2 px-4">{announcement.date}</td>
                                        <td className="py-2 px-4">
                                            <Button onClick={() => handleDelete(announcement._id)}
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
    )
}

export default Announcements
