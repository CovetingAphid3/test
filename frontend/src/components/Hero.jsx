import React from 'react';
import styles from '../style'; // Assuming your styles are imported correctly
import { hospital } from '../assets';
const Hero = () => {
    return (
        <section id="home" className={`flex md:flex-row flex-col`} style={{ position: "relative" }}>
            <div className={`hidden sm:block flex flex-1 ${styles.flexCenter} md:my-0 relative flex-col`} style={{ position: "relative" }}>
                <img src={hospital} alt="hero" className="w-full h-[20vh] object-cover object-center " />        {/* Overlaying text */}
                <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                    <p className="text-4xl font-bold font-rubik" style={{ textShadow: '0 0 5px #000' }}>Care Beyond Prescription</p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
