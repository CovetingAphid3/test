import Product from "../models/product.js";
//import Redis from 'ioredis';

// Initialize Redis client
//const redisClient = new Redis({
//    host: process.env.REDIS_HOST,
//    port: process.env.REDIS_PORT,
//    password: process.env.REDIS_PASSWORD, // Replace this with your actual password
//});

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { name: '', price: '', description: '', image: '', category: '' };

    //incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'that email is not registered';
    }
    //validation errors 
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ product: product._id });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        //      const chachedData = await redisClient.get('get-products');
        //    if (chachedData) {
        //         return res.status(200).json(JSON.parse(chachedData));
        //    }
        const products = await Product.find();
        //        await redisClient.set('get-products', JSON.stringify(products), 'EX', 3600);
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve product' });
    }
};

export const deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany();
        res.status(200).json({ message: 'All products deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete products' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};
