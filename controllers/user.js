import User from '../models/User.js';
import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';
dotenv.config();

export const updateUser = async (req, res, next) => {
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true});
        res.status(200),json(updatedUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getUsers = async (req, res, next) => {
    // get 5 latest data, di url tambah query ?new=true
    const query = req.query.new
    try {
        const users = query ? await User.find.sort({ _id: -1 }).limit(1) : await User.find()
        // const { password, ...others } = user
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getUserStats = async (req, res, next) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        // using mongoose aggregate
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    // id ini nantinya represenet bulan, misal sept adl 9
                    _id: "month",
                    total: { $sum: 1 }
                }
            }
        ])
        res.status(200).json(data)

    } catch (error) {
        res.status(500).json(error)
    }
}