import React, { useState, useEffect } from 'react';
import { socialMedia } from "../constants";
import SearchBar from "./SearchBar";
import styles from "../style";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const TopNav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = getCookie('jwt'); // Check if token exists in cookie
        if (token) {
            setIsLoggedIn(true); // User is logged in if token exists
            const decodedToken = jwtDecode(token); // Decode JWT token
            setUserName(decodedToken.email); // Extract user's name from decoded token
        }
    }, []);

    const handleLogout = () => {
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Remove token cookie
        setIsLoggedIn(false); // Update isLoggedIn state
        setUserName(''); // Clear user's name
        //refresh page and send to home page
        window.location.href = '/';
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };
    return (
        <div className="flex justify-between items-center w-full h-[60px] navbar top-0 z-50">
            <div className={`${styles.paddingX} ${styles.flexCenter} flex justify-between`} >
                <div className="flex flex-row md:mt-0 mt-6 sm:mb-0 mb-6 ml-5 sm:ml-10">
                    {socialMedia.map((social, index) => (
                        <img
                            key={social.id}
                            src={social.icon}
                            alt={social.id}
                            className={`w-[21px] h-[21px] object-contain cursor-pointer ${index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
                                }`}
                            onClick={() => window.open(social.link)}
                        />
                    ))}
                </div>

                <div className='hidden sm:flex items-center '>
                    <SearchBar />
                </div>

                <div>
                    {isLoggedIn ? (
                        <Button onClick={handleLogout} className=" ml-20 text-white font-bold text-md bg-crimson hover:bg-crimson/90">Log Out</Button>
                    ) : (
                        <>
                            <Link to="/log"><Button className=" ml-20 text-white font-bold text-md bg-green hover:bg-green/90">Log In</Button></Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TopNav;

