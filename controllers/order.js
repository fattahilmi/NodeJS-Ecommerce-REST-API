import Order from '../models/Order.js';
import dotenv from 'dotenv';
dotenv.config();

export const addOrder = async (req, res, next) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updateOrder = async (req, res, next) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new: true})
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteOrder = async (req, res, next) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUserOrder = async (req, res, next) => {
    try {
        const orders = await Order.findOne({userId: req.params.userId})
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getIncome = async (req, res, next) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth()-1))

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            { 
                $project:{
                    month:{ $month: "$createdAt" },
                    sales: "$amount"
                },            
                $group:{
                    _id:"$month",
                    total:{$sum: "$sales"}
                }
            }
        ])
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json(error)
    }
}