import React from 'react';

const ProductItem = ({ name, image, price, description }) => {
    return (
        <div className='shadow-md rounded-md text-black bg-white p-4 overflow-hidden mt-5'>
            <img src={image} alt="product" className="w-full h-36 md:h-48 object-cover cursor-pointer shadow-sm" />
            <div className='w-full p-4'>
                <h3 className="text-lg md:text-xl mb-2 md:mb-3 font-semibold">{name}</h3>
                <p className="text-sm md:text-base">${price}</p>
                {/* Check if description is an array before mapping */}
                {Array.isArray(description) ? (
                    <p className='flex flex-wrap gap-2 flex-row items-center justify-start text-xs md:text-sm'>
                        {description.map((item, index) => (
                            <span key={index} className='bg-white inline-block px-2 py-1 font-semibold border border-solid border-black-200 rounded-md'>
                                {item}
                            </span>
                        ))}
                    </p>
                ) : (
                    <p className="text-xs md:text-sm">{description}</p>
                )}
            </div>
        </div>
    );
};

export default ProductItem;

