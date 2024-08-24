import React from 'react';
import ad from '../data/ad'; // Assuming you have the mock data in a file named ad.js
import SmallAdItem from './SmallAdItem';

const SmallAd = () => {
  return (
    <div className="lg:bg-white lg:shadow-sm lg:mt-4 ">
      <div className="mx-5 flex flex-col md:flex-row justify-around ">
        {ad.map(item => (
          <SmallAdItem
            key={item.id}
            imgUrl={item.imgUrl}
            name={item.name}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default SmallAd;

