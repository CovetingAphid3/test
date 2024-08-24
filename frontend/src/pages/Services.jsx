import React from 'react';
import Contact from '../components/Contact';
import ServicesInfo from '../components/ServicesInfo';
import CTA from '../components/CTA';

const Services = () => {
    return (
        <div>
            <div className="bg-slate-200">
            <h1 className="text-6xl md:text-8xl text-center py-5">Services</h1>
            </div>
            <div className="flex flex-col items-center justify-center">
                <ServicesInfo />
                <div className="flex  flex-col lg:flex-row-reverse items-center justify-center w-full lg:mt-10">
                    <div className="flex flex-col  items-center justify-center bg-white text-black py-10 px-5 shadow-sm ">
                        <h1 className="text-3xl md:text-5xl font-semibold">Details </h1>
                        <div className="ml-5  text-start my-5">
                            <p className="text-lg md:text-xl my-2"><strong>Email Address : </strong><a href="mailto:2H9pG@example.com" className="text-blue underline">2H9pG@example.com</a></p>
                            <p className="text-lg md:text-xl my-2"><strong>Contact Us : </strong> <a href="tel:1234567890" className="text-blue underline">(123) 456-7890</a></p>

                            <p className="text-lg md:text-xl my-2"><strong>Address : </strong> <a href="https://www.google.com/maps/place/123+Main+Street,+Cityville,+State+ZIP" className="text-blue underline">123 Main Street, Cityville, State, ZIP</a> </p>
                            <p className="text-lg md:text-xl my-2"><strong>Operating Hours : </strong> Monday to Friday, 9:00 AM - 6:00 PM</p>
                        </div>

                    </div>
                    <div className="w-full lg:w-1/2">
                        <Contact />
                    </div>
                </div>


            </div>
            <CTA />
        </div>
    );
};

export default Services;

