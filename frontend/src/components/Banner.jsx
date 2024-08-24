import React from 'react';
import {logo, line} from '../assets';
import styles from '../style';

const Banner = () => {
    return (
        <section
            id="home"
            className={`flex md:flex-row flex-col sm:pb-0 bg-primary mb-4` }
        >
            <div
                className={`flex-1 ${styles.flexStart} flex-col ml-5 lg:ml-40 xl:px-0 sm:px-16 `}
            >
                <div className="ml-0 lg:ml-40">

                    <div className="flex flex-row justify-between items-center w-[50%] mt-0  sm:ml-0">

                        <h1 className="my-2  flex-1 text-[72px] ss:text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
                            Discover
                            <br/ >
                            <span className="text-white">Vitality</span>
                        </h1>

                    </div>

                </div>
            </div>

            <div
                className={`flex-1 md:flex hidden flex ${styles.flexCenter} md:my-0 relative flex-col`}
            >
                <img src={logo} alt="pharmacy" className="w-[30vh] h-[10vh] object-contain" />
            </div>
        </section>
    );
};

export default Banner;

