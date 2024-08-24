import React from 'react';
import bigAds from '../data/bigAds'; // Direct import without curly braces
import styles from '../style';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import {payments} from '../assets';

const BigAdItem = ({ imageSrc, altText, title, subtitle }) => {
    return (
        <div className="rounded-sm shadow-lg shadow-black relative flex items-center justify-center min-w-[170px] h-[400px] md:h-[400px] cursor-pointer">
            <img src={imageSrc} alt={altText} className="w-full h-full object-cover rounded-sm" />
            <div className=" rounded-sm absolute bottom-0 p-8 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.5)]">
                <p className="font-normal text-[16px] leading-[20.16px] text-white uppercase">{title}</p>
                <h2 className="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white">{subtitle}</h2>
            </div>
        </div>
    );
};

const BigAd = () => {
    return (
        <div>
            <div className=" mt-10 mb-10 flex flex-col md:flex-row items-center justify-center  px-4 lg:px-20">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                    {bigAds.map((image, index) => (
                        <BigAdItem key={index} {...image} />
                    ))}
                </div>
            </div>


        </div>
    );
};

export default BigAd;

