import React, { useState, useEffect } from 'react';
import Contact from '../components/Contact';
import styles from '../style';
import { Button } from "../components/ui/button";
import CTA from '../components/CTA';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import Notification from '../components/Notification';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const Availability = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
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


    const windowWidth = window.innerWidth;
    const isSmallOrMediumDevice = windowWidth <= 768;
    const isLargeDevice = windowWidth > 1024;

    let maxItemsToShow;
    if (isSmallOrMediumDevice) {
        maxItemsToShow = 10;
    } else if (isLargeDevice) {
        maxItemsToShow = 10;
    } else {
        maxItemsToShow = products.length;
    }

    // Group products by category
    const groupedProducts = products.reduce((acc, product) => {
        const category = product.category || 'Uncategorized';
        (acc[category] = acc[category] || []).push(product);
        return acc;
    }, {});

    const categories = Object.keys(groupedProducts);

    const handleNameChange = (event) => setName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleMessageChange = (event) => setMessage(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        fetch('https://pharmacy-web-page.vercel.app/submit-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                // Handle successful response
                console.log('Success:', responseData);
                // Optionally, reset the form
                setName('');
                setEmail('');
                setMessage('');
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <div className="bg-slate-200">
                <h1 className="text-6xl md:text-8xl text-center py-5">Browse</h1>
            </div>

            <div className={`${styles.paddingX} ${styles.flexStart} mt-10`}>
                <div className={`${styles.boxWidth}`}>
                    <h1 className={`${styles.heading2}`}>Check Medicine Availability</h1>
                    <p className="text-gray-700 mb-4">
                        To check the availability of a medicine, please upload the prescription document using the form below.
                        Our team will review the prescription and provide you with information regarding the availability
                        of the prescribed medicine. Alternatively, you can enter the specific medicine you are looking for below.
                    </p>
                    <form className="mb-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">Name:</label>
                            <input type="text" id="name" name="name" value={name} onChange={handleNameChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Email:</label>
                            <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700">Enter Specific Medicine:</label>
                            <input type="text" id="message" name="message" value={message} onChange={handleMessageChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                        </div>
                        <Button type="submit" className="mt-4 bg-blue text-white font-bold text-md px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</Button>
                    </form>
                    {loading ? (
                        <div className="loading-container mt-10 mb-10">
                            <div className="loading-spinner"></div>
                            <div className="loading-text">Loading...</div>
                        </div>
                    )
                        : (
                            <div>
                                <div id="projects" className="mt-10 flex flex-col md:flex-col items-center justify-center px-4 lg:px-20">
                                    {categories.map((category, index) => (
                                        <React.Fragment key={category}>
                                            <div className="mb-8 mt-8">
                                                <Title>{category}</Title>
                                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-2">
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
                                            </div>
                                            {index < categories.length - 1 && <CTA key={`cta-${index}`} />} {/* Render separator if not the last category */}
                                        </React.Fragment>
                                    ))}
                                </div>

                            </div>


                        )
                    }
                </div>
            </div>
            <Contact />
            <Notification />
        </div>
    );
};

export default Availability;

