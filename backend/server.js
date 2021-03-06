import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
// import products from './data/products.js'
import colors from 'colors'
// const express = require ('express'); 
// const dotenv=require('./dotenv')
//const products=require('./data/products')
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import morgan from 'morgan'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
dotenv.config()

connectDB()

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json())

app.use((req, res, next) => {
    // console.log('Hello')
    next()

})

app.get('/', (req, res) => {
    res.send('API is running...');
})
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)

app.use(errorHandler)

// app.get('/api/products',(req,res) => {
//     res.json(products);
// })

// app.get('/api/products/:id',(req,res) => {
//     const product = products.find(p => p._id === req.params.id);
//     res.json(product)
// })

// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server running on port ${process.env.NODE_ENV} mode on ${PORT} dav`.yellow.bold));