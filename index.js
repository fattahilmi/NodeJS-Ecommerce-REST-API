import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import usersRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
} catch (error) {
    console.log(error);
}

// atau bisa begini
// mongoose
//     .connect(process.env.MONGODB_URI)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(error => console.log(error));

app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

app.get('/api/test', (req, res) => {
    res.send("Welcome!")
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});