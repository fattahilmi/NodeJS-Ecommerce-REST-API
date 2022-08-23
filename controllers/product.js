import Product from '../models/Product.js';
import dotenv from 'dotenv';
dotenv.config();

export const addProduct = async (req, res, next) => {
    const newProduct = new Product(req.body);
    
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new: true})
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getProducts = async (req, res, next) => {
    // get 5 latest data, di url tambah query ?new=true, dan bisa by kateogri
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        let products

        if (qNew){
            products = await Product.find().sort({createdAt: -1}).limit(1)
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory]
                }
            })
        } else {
            products = await Product.find()
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
}