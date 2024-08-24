import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import CTA from './CTA';
import Title from './Title';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://pharmacy-web-page.vercel.app/get-products', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getCookie('jwt')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="loading-container mt-10">
                <div className="loading-spinner"></div>
                <div className="loading-text">Loading...</div>
            </div>
        );
    }
    const windowWidth = window.innerWidth;
    const maxItemsToShow = windowWidth <= 768 ? 2 : windowWidth > 1024 ? 5 : products.length;

    // Group products by category
    const groupedProducts = products.reduce((acc, product) => {
        const category = product.category || 'Uncategorized';
        (acc[category] = acc[category] || []).push(product);
        return acc;
    }, {});

    const categories = Object.keys(groupedProducts);

    return (
        <div id="projects" className="mt-10 flex flex-col items-center justify-center px-4 lg:px-20">
            {categories.map((category, index) => (
                <div key={category} className="mb-8 mt-8 w-full">
                    <Title>{category}</Title>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {groupedProducts[category].slice(0, maxItemsToShow).map((item, idx) => (
                            <ProductItem
                                key={item.id || idx}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                description={item.description}
                            />
                        ))}
                    </div>
                    {index < categories.length - 1 && <CTA key={`cta-${index}`} />} {/* Render separator if not the last category */}
                </div>
            ))}
        </div>
    );
};

export default Product;

