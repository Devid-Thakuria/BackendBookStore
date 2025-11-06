import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bookRoutes from './Routes/bookRoutes.js'; 
import authRoutes from './Routes/authRoutes.js'; // Corrected path casing: 'Routes'

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // To allow cross-origin requests

// Routes
app.use('/book', bookRoutes);
app.use('/auth', authRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('this is my backend of bookstore');
});

// Database Connection and Server Start
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        // Start the server only after the database connection is successful
        app.listen(process.env.PORT, () => {
            console.log(`Server is running fine on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        // Log connection error if it occurs
        console.log(`MongoDB connection failed: ${err.message}`);
    });