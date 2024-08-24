import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button'; // Assuming Button component is defined
import {  logo ,hospital} from '../assets';
import Spinner from './Spinner'; // Import the Spinner component

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true); // Set loading state to true when login request starts

        try {
            console.log('Submitting login request...');
            const response = await fetch('https://pharmacy-web-page.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();


            if (response.ok && data.token) {
                document.cookie = `jwt=${data.token}; path=/; max-age=${24 * 60 * 60}; samesite=strict; secure`;
                window.location.href = '/';
            } else {
                setError(data.error );
            }
        } catch (error) {
            setError('An error occurred while logging in');
        } finally {
            setLoading(false); // Set loading state to false when login request ends
        }
    };

    return (
        <div className="flex justify-center items-center h-screen" style={{ backgroundImage: `url(${hospital})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <form onSubmit={handleSubmit} autoComplete="on" className="bg-white shadow-lg border lg:w-1/4 p-8 rounded px-8 pt-6 pb-8 mb-4">
                <img src={logo} alt="logo" className="w-[200px] md:w-1/2 mx-auto mb-4" />
                <div className="flex flex-row items-center justify-around">
                    <h1 className="text-4xl mb-4 text-center font-bold">Login</h1>
                    <p className="text-md md:text-xl">New User? <br /><Link to="/signup" className="text-blue underline">Sign Up</Link></p>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" name="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="user@example.com"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" name="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    {loading ? (
                        <Spinner /> // Render the spinner if loading is true
                    ) : (
                        <Button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</Button>
                    )}
                </div>
                {error && <p className="text-crimson text-lg italic mt-4">{error}</p>}
            </form>
        </div>
    );
};

export default Login;

