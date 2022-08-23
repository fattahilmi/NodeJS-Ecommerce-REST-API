import User from '../models/User.js';
// import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
dotenv.config();

export const register = async (req, res, next) => {
    // to hash a password
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(req.body.password, salt);
    
    const newUser12 = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString()
    })
        // to check a password
        // bcrypt.compareSync(req.body.password, hash);
        
        // promise, need time to save, update or delete to DB, takes time makanya kite pake async await
    try {
        const savedUser = await newUser12.save();
        res.status(200).send(savedUser);
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if (!user) return res.status(404).send("User not found")
        
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password, 
            process.env.PASS_SEC
        )
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
        OriginalPassword !== req.body.password &&
            res.status(401).json("Wrong credential")

        // const isPassCorrect = await bcrypt.compare(req.body.password, user.password)
        // if (!isPassCorrect) return res.status(401).send("Password is incorrect")
        // 
        const accessToken = jwt.sign({ 
            id: user._id, 
            isAdmin: user.isAdmin 
        }, process.env.JWT, {expiresIn:"3d"})

        const { password, ...others } = user._doc
        // res.cookie("access_token", token, { 
        //     httpOnly: true
        // }).status(200).json({...others})
        res.status(200).json({...others, accessToken})
    } catch (error) {
        next(error);
    }
}
