import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Unauthorized from '../components/Unauthorized';

const ProductManagement = () => {
    const [isAdminUser, setIsAdminUser] = useState(false);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited
    const [updatedProduct, setUpdatedProduct] = useState({}); // Track the updated product information


    useEffect(() => {
        const token = getCookie('jwt'); // Check if token exists in cookie
        if (token) {
            const decodedToken = jwtDecode(token); // Decode JWT token
            if (decodedToken.role === 'admin') {
                setIsAdminUser(true);
            }
        }
    }, []);

    useEffect(() => {
        if (isAdminUser) {
            fetch('https://pharmacy-web-page.vercel.app/get-products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('jwt')}` // Replace YOUR_ACCESS_TOKEN with your actual token
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setProducts(data.products);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
        }
    }, [isAdminUser]);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const handleAddProduct = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newProduct = {
            name: formData.get('name'),
            price: formData.get('price'),
            description: formData.get('description'),
            image: formData.get('image'),
            category: formData.get('category')
        };

        // Send POST request to create new product
        fetch('https://pharmacy-web-page.vercel.app/create-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add product');
                }
                return response.json();
            })
            .then(data => {
                console.log('Product added successfully:', data);
                event.target.reset();
                //refresh page 
                window.location.reload();

            })
            .catch(error => {
                console.error('Error adding product:', error);
            });
    };

    const handleDeleteProduct = (id) => {
        fetch(`https://pharmacy-web-page.vercel.app/delete-product/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('jwt')}` // Replace YOUR_ACCESS_TOKEN with your actual token
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Remove the deleted message from the state
                setProducts(products.filter(message => message.id !== id));
                //refresh page 
                window.location.reload();
            })
            .catch(error => {
                console.error('Error deleting message:', error);
            });
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
        setCategory(product.category);
    };

    const handleUpdateProduct = (event) => {
        event.preventDefault();
        const updatedProductData = {
            name,
            price,
            description,
            image,
            category
        };

        fetch(`https://pharmacy-web-page.vercel.app/update-product/${editingProduct._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('jwt')}` // Replace YOUR_ACCESS_TOKEN with your actual token
            },
            body: JSON.stringify(updatedProductData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update product');
                }
                return response.json();
            })
            .then(data => {
                console.log('Product updated successfully:', data);
                // Refresh the product list
                window.location.reload();
            })
            .catch(error => {
                console.error('Error updating product:', error);
            });
    };

    // Function to group products by category
    const groupProductsByCategory = () => {
        const groupedProducts = {};
        products.forEach(product => {
            if (!groupedProducts[product.category]) {
                groupedProducts[product.category] = [];
            }
            groupedProducts[product.category].push(product);
        });
        return groupedProducts;
    };

    // Render product list grouped by category
    const renderProductListByCategory = () => {
        const groupedProducts = groupProductsByCategory();

        if (Object.keys(groupedProducts).length === 0) {
            return <div className="text-center">
                <h1 className="text-xl font-semibold mb-2 text-crimson">
                    No products to display
                </h1>
                <p className="text-red-700">Please add some products. <br /> You can add new products from the "Add Product" section.<br /> Try avoid having no products to avoid unexpected behavior</p>
            </div>;
        }

        return Object.keys(groupedProducts).map(category => (
            <div key={category} className="mb-8">
                <h2 className="text-xl font-semibold mb-2">{category}</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupedProducts[category].map((product, index) => (
                        <li key={index} className="border border-gray-300 rounded-md p-4 mb-4 bg-white">
                            <div className="font-semibold">Name: {product.name}</div>
                            <div>Price: ${product.price}</div>
                            <div>{product.description}</div>
                            <div>
                                <img src={product.image} alt={product.name} className="w-[100px] h-auto" />
                            </div>
                            <div>Category: {product.category}</div>
                            <div className="mt-2 flex justify-end">
                                <button className="mr-2 bg-crimson text-white px-3 py-1 rounded-md" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                <button className="bg-blue text-white px-3 py-1 rounded-md" onClick={() => handleEditProduct(product)}>Edit</button>
                            </div>
                            {/* Update form */}
                            {editingProduct && editingProduct._id === product._id && (
                                <div className="container mx-auto p-4">
                                    <h2 className="text-xl font-semibold mb-4">Update Product</h2>
                                    <form onSubmit={handleUpdateProduct} className="mb-8">
                                        <label className="block mb-2">Name:</label>
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full/2 border border-gray-300 rounded-md p-2" />
                                        <label className="block mb-2">Price:</label>
                                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full/2 border border-gray-300 rounded-md p-2" />
                                        <label className="block mb-2">Description:</label>
                                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full/2 border border-gray-300 rounded-md p-2" />
                                        <label className="block mb-2">Image:</label>
                                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required className="w-full/2 border border-gray-300 rounded-md p-2" />
                                        <label className="block mb-2">Category:</label>
                                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full/2 border border-gray-300 rounded-md p-2" />
                                        <button type="submit" className="mt-4 bg-green text-white font-bold px-4 py-2 rounded-md">Update</button>
                                    </form>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        ));
    };
    return (
        <div>
            {isAdminUser ? (

                <div>
                    <div className="bg-slate-200">
                        <h1 className="text-4xl md:text-8xl text-center py-5">Product<br className="md:hidden"/> Management</h1>
                    </div>
                    <div className="container mx-auto p-4">
                        <h3 className="text-2xl font-bold mb-4">Welcome to the Product Management Dashboard!</h3>
                        <p>This dashboard provides you with the tools to manage the items displayed on our landing page. You have the ability to add new products, delete existing ones, and edit their details as needed.</p>

                        <h2 className="text-2xl font-bold my-4">Features:</h2>
                        <ul className="list-disc list-inside mb-4">
                            <li><strong>Add Products:</strong> You can add new products to our inventory directly from this dashboard. This includes specifying details such as product name, description, price, and images.</li>
                            <li><strong>Delete Products:</strong> Using this dashboard, you have the capability to remove products from our inventory. Be cautious when deleting products, ensuring it's necessary and won't impact user experience negatively.</li>
                            <li><strong>Edit Product Details:</strong> This dashboard allows you to modify the details of existing products. You can update information like product name, description, price, and images to keep them accurate and up-to-date.</li>
                        </ul>

                        <h2 className="text-2xl font-bold mb-4 text-crimson">Important Note:</h2>
                        <p>It's crucial to exercise caution when making changes to the product inventory. Ensure that any modifications made align with our brand image and user expectations. Additionally, be mindful of the impact on existing customers and potential sales.</p>

                        <h2 className="text-2xl font-bold my-4">Usage Guidelines:</h2>
                        <ul className="list-disc list-inside mb-4">
                            <li><strong>Use with Caution:</strong> When adding, deleting, or editing products, consider the potential consequences and review changes carefully before applying them.</li>
                            <li><strong>Maintain Consistency:</strong> Ensure that product information remains consistent across all platforms and marketing channels to avoid confusion among customers.</li>
                            <li><strong>Regular Updates:</strong> Keep the product inventory updated with the latest offerings and remove any outdated or discontinued items promptly.</li>
                        </ul>

                    </div>

                    <div className="container mx-auto p-4">

                        {products.length < 3 && (
                            <p className="text-lg my-4">
                                <span className="text-crimson font-semibold text-lg">Note:</span> Number of products is getting low. Avoid having no products in the database to avoid unexpected behavior
                            </p>
                        )}

                        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                        <form onSubmit={handleAddProduct} className="mb-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-2">Name:</label>
                                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                                <div>
                                    <label className="block mb-2">Price:</label>
                                    <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                                <div>
                                    <label className="block mb-2">Description:</label>
                                    <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                                <div>
                                    <label className="block mb-2">Image URL:</label>
                                    <input type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)} required className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                                <div>
                                    <label className="block mb-2">Category:</label>
                                    <input type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full border border-gray-300 rounded-md p-2" />
                                </div>
                            </div>
                            <button type="submit" className="mt-4 bg-blue text-white font-bold px-4 py-2 rounded-md">Add Product</button>
                        </form>

                        <h2 className="text-3xl font-semibold mb-4">Product List</h2>
                        {renderProductListByCategory()}
                    </div>
                </div>
            ) : (
                <Unauthorized />
            )}

        </div>
    );
};

export default ProductManagement;

