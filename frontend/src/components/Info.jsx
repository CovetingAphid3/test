import React from 'react';
import { logo } from '../assets';

const Info = () => {
  return (
    <div className="py-5 mt-5">
      <div className="container mx-auto px-4">
        <div className="mx-auto ">
          <div className="mb-12">
            <div className="mb-8 flex flex-wrap justify-center">
              <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0 mt-4 sm:mt-20">
                <img src={logo} alt="About Us" className="w-full h-auto" />
              </div>
              <div className="w-full md:w-1/2 md:pl-4">
                <h3 className="text-2xl font-bold mb-4">Our Story</h3>
                <p className="text-lg mb-6">
                  Welcome to Glaudina Pharmacy, where health meets care and excellence is our standard. At Glaudina Pharmacy, we are dedicated to providing you with the highest quality pharmaceuticals, wellness products, and personalized services to support your well-being journey.
                </p>
                <p className="text-lg">
                  Our commitment extends beyond just offering products; we strive to be your trusted partner in health, empowering you to make informed decisions and live a vibrant life.
                </p>
              </div>
            </div>
          </div>
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4">Our Values and Mission</h3>
            <div className="flex flex-wrap justify-center">
              <div className="w-full md:w-1/2 md:pr-4 mb-4 md:mb-0">
                <ul className="text-left pl-6">
                  <li><strong>Excellence:</strong> We uphold the highest standards of quality and service in everything we do.</li>
                  <li><strong>Innovation:</strong> We continuously explore new ways to improve and innovate to better serve our community.</li>
                  <li><strong>Customer-Centric:</strong> Your health and satisfaction are at the heart of our mission.</li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 md:pl-4 mt-4 sm:mt-20">
                <img src={logo} alt="Values and Mission" className="w-full h-auto" />
              </div>
            </div>
          </div>
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Commitment to Wellness</h2>
            <p className="text-lg mb-6">
              At Glaudina Pharmacy, we go beyond just filling prescriptions; we prioritize your holistic wellness. Explore our range of wellness programs and educational resources designed to empower you to take control of your health and live your best life.
            </p>
          </div>
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Community Engagement</h2>
            <p className="text-lg mb-6">
              Join us in building a healthier community together. Through our community outreach programs and partnerships, we strive to make a positive impact on the lives of those around us. Together, we can create a healthier and happier future for all.
            </p>
            <p className="text-lg mb-6">
              Stay connected with us to learn about upcoming events and opportunities to get involved in making a difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;

