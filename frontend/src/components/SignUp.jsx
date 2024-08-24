import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {  logo ,hospital} from '../assets';
import Spinner from './Spinner'; // Import the Spinner component

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState(''); // Add state for first name
    const [lastName, setLastName] = useState(''); // Add state for last name
    const [error, setError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate first name and last name fields
        if (!firstName.trim() || !lastName.trim()) {
            setError('Please provide your first name and last name');
            return;
        }

        setLoading(true); // Set loading state to true when signup request starts

        try {
            const response = await fetch('https://pharmacy-web-page.vercel.app/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, firstName, lastName, phoneNumber }), // Include first name and last name in request body
            });

            if (response.ok) {
                // Redirect or handle successful signup
                window.location.href = '/log';
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (error) {
            setError('An error occurred while signing up');
        } finally {
            setLoading(false); // Set loading state to false when signup request ends
        }
    };

    return (
        <div className="flex justify-center items-center h-screen" style={{ backgroundImage: `url(${hospital})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <form onSubmit={handleSubmit} autoComplete="off" className="bg-white shadow-lg border lg:w-1/4 p-8 rounded px-8 pt-2 pb-2 mb-4">
                <img src={logo} alt="logo" className="w-[200px] md:w-1/2 mx-auto mb-4" />
                <div className="flex flex-row items-center justify-around">
                    <h1 className="text-2xl sm:text-4xl mb-4 text-center font-bold">Register</h1>
                        <p className="text-md md:text-xl">Already A<br className="block md:hidden"/> Member? <br /><Link to="/log" className="text-blue underline">Login</Link></p>
                </div>


                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                    <input
                        id="phoneNumber"
                        type="tel"
                        value={phoneNumber}
                        placeholder="Phone Number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    {loading ? (
                        <Spinner /> // Render the spinner if loading is true
                    ) : (
                        <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</button>
                    )}
                </div>

                {error && <p className="text-crimson text-lg italic mt-4 max-w-[200px] md:max-w-none">{error}</p>}
            </form>
        </div>
    );
};

export default Signup;

