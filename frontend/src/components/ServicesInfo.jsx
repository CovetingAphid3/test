import React from 'react';
import { prescription, pharmacy1, pharmacy3 } from '../assets';
import { Button } from "./ui/button"

const ServicesInfo = () => {
    return (
        <div className="py-5 mt-5">
            <div className="container mx-auto px-4">
                <div className="mx-auto ">
                    <div className="mb-12">
                        <div className="mb-8 flex flex-wrap justify-center">
                            <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0 mt-4 ">
                                <img src={prescription} alt="Our Services" className="w-full h-auto" />
                            </div>
                            <div className="w-full md:w-1/2 md:pl-4">
                                <h3 className="text-2xl font-bold mb-4">Prescription Services</h3>
                                <p className="text-lg mb-6">
                                    Easily refill your prescriptions with our convenient services. Choose from home delivery, in-store pickup, or simply walk in and let us take care of the rest.
                                </p>
                                <a href="/prescription-submission" className="text-blue underline font-bold text-xl">Read More</a>
                            </div>
                        </div>
                    </div>
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold mb-4">Accepted Medical Plans</h3>
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0">
                                <p className="text-lg mb-6">
                                    We prioritize your well-being by accepting various medical plans. Whether you require prescription medications, over-the-counter remedies, or health and wellness products, rely on us to seamlessly cater to your needs.
                                </p>
                            </div>
                            <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0 ">
                                <img src={pharmacy1} alt="Accepted Medical Plans" className="w-full h-auto" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-12">
                        <div className="mb-8 flex flex-wrap justify-center">
                            <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0 mt-4 ">
                                <img src={pharmacy3} alt="Our Services" className="w-full h-auto" />
                            </div>
                            <div className="w-full md:w-1/2 md:pl-4">
                                <h3 className="text-2xl font-bold mb-4">Specialized Care</h3>
                                <p className="text-lg mb-6">
                                    Experience tailored care with our specialized services. Our team is dedicated to providing comprehensive healthcare solutions tailored to your unique needs.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold mb-6">Explore Our Products</h2>
                        <p className="text-lg mb-6">
                            Discover a wide array of health and wellness products in our well-stocked front shop. From vitamins and supplements to skincare essentials, find everything you need in one convenient location.
                        </p>
                        <a href="/front-shop" className="text-blue underline font-bold text-xl">Explore Now</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesInfo;

