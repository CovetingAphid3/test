import React, { useState, useEffect } from 'react';
import { profile,account, logo, close, menu } from "../assets";
import { navLinks, dashLinks } from "../constants"; // Import navLinks and dashLinks from constants
import { Link, useLocation } from "react-router-dom"; // Import useLocation hook
import styles from '../style';
import SearchBar from "./SearchBar"; // Assuming SearchBar is defined elsewhere
import { jwtDecode } from 'jwt-decode';


const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const location = useLocation();
    const [isAdminUser, setIsAdminUser] = useState(false);
    const [userName, setUserName] = useState('');
    const [isUser, setIsUser] = useState(false);


    useEffect(() => {
        const token = getCookie('jwt'); // Check if token exists in cookie
        if (token) {
            const decodedToken = jwtDecode(token); // Decode JWT token
            setUserName(decodedToken.email); // Extract user's name from decoded token
            if (decodedToken.role === 'admin') {
                setIsAdminUser(true);
            }
            if (decodedToken.role === 'user') {
                setIsUser(true);
            }

        }
    }, []);

    const handleLinkClick = () => {
        if (toggle) {
            setToggle(false);
        }
        window.scrollTo(0, 0);
    };



    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };


    // Check if the current pathname contains '/admin/dashboard'
    const isAdminDashboard = location.pathname.includes('/admin/dashboard');

    // Use isAdminDashboard to render appropriate links
    const linksToRender = isAdminDashboard ? dashLinks : navLinks;

    const link = isAdminUser ? '/admin/dashboard' : isUser ? '/user/dashboard' : '/log';
    return (
        <nav className="w-full flex py-6 justify-between items-center h-[60px] navbar sticky top-0 z-50">
            <div className={`${styles.paddingX} ${styles.flexCenter} flex justify-between`}>
                <Link to="/"><img src={logo} alt="logo" className="w-[224px] md:w-[224px] h-full ml-0 md:ml-10" /></Link>
            </div>
            <ul className='list-none sm:flex hidden justify-end items-center flex-1'>

                <li className="mr-2">
                    <Link to={link}><img src={profile} alt="account" className="w-[28px] h-[28px] ml-0 md:ml-10" /></Link>
                </li>
                <li className="mr-20">

                    {isAdminUser ? (
                        <Link to="/admin/dashboard" className="font-rubik font-bold cursor-pointer hover:text-orange text-lg">Admin Dashboard</Link>
                    ) : (
                        null
                    )}
                </li>
                <li className="mr-20">

                    {isUser ? (
                        <Link to="/user/dashboard" className="font-rubik font-bold cursor-pointer hover:text-orange text-lg">Your Dashboard</Link>
                    ) : (
                        null
                    )}
                </li>
                {linksToRender.map((nav, index) => (
                    <li key={nav.id}
                        className={`font-roboto font-semibold cursor-pointer hover:text-orange text-lg ${index === linksToRender.length - 1 ? 'mr-10' : 'mr-10'}`}
                    >
                        <Link to={nav.path}>{nav.title}</Link>
                    </li>
                ))}
            </ul>
            <div className='sm:hidden flex flex-1 justify-end items-center relative'>
                    <Link to={link}><img src={profile} alt="account" className="w-[28px] h-[28px] ml-0 md:ml-10 mr-10" /></Link>

                <img
                    src={toggle ? close : menu}
                    alt="menu"
                    className="w-[28px] h-[28px] object-contain"
                    onClick={() => setToggle((prev) => !prev)}
                />
                <div
                    className={`transition-all duration-100 ${toggle ? 'opacity-100 visible' : 'opacity-0 invisible'} absolute top-20 right-0 mx-4 my-2 w-[75vw] min-w-[140px] rounded-sm sidebar bg-secondary shadow shadow-black shadow-lg text-black`}
                >
                    <ul className='list-none flex flex-col justify-start items-start flex-1 p-6'>
                        <SearchBar />

                        {isAdminUser && (
                            <li className=" mb-6 mt-3">
                                <Link to="/admin/dashboard" onClick={handleLinkClick} className="font-rubik font-bold cursor-pointer hover:text-orange text-lg">Admin Dashboard</Link>
                            </li>
                        )}

                        {isUser && (
                            <li className=" mb-6 mt-3">
                                <Link to="/user/dashboard" onClick={handleLinkClick} className="font-rubik  font-bold cursor-pointer hover:text-orange text-lg">Your Dashboard</Link>
                            </li>
                        )}

                        {linksToRender.map((nav, index) => (
                            <li key={nav.id} className={`font-roboto font-bold cursor-pointer text-[16px] ${index === linksToRender.length - 1 ? 'mr-0' : 'mb-4'} mr-10`}>
                                <Link to={nav.path} onClick={handleLinkClick}>{nav.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;

