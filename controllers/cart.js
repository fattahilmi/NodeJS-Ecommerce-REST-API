import Cart from '../models/Cart.js';
import dotenv from 'dotenv';
dotenv.config();

export const addCart = async (req, res, next) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updateCart = async (req, res, next) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new: true})
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteCart = async (req, res, next) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted from cart");
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUserCart = async (req, res, next) => {
    try {
        // user has only 1 cart
        const cart = await Cart.findOne({userId: req.params.userId})
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getCart = async (req, res, next) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
    }
}