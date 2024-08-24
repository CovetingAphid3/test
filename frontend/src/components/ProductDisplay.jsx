import React from 'react'
import Product from './Product'
import { Button } from './ui/button'
import styles from '../style';
import BigAd from './BigAd';
import { Link } from 'react-router-dom';

const ProductDisplay = () => {
    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div>
            <div className="text-center">
                <Product />
                <Link to="/check-availability" onClick={handleLinkClick}><Button className="mt-5 bg-blue text-white text-md font-bold hover:bg-blue/90">View More</Button></Link>
            </div>
            <div className={` ${styles.paddingX} sm:${styles.paddingX} md:${styles.paddingX} lg:${styles.paddingX} xl:${styles.paddingX}`}>
                <BigAd />
            </div>

        </div>
    )
}

export default ProductDisplay
