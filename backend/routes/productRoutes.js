import express from 'express'
const router= express.Router()
import { getProductById, getProducts } from '../controllers/productController.js'


// router.get('/', asyncHandler( async (req,res) => {
//     const products = await Product.find({});
//     res.json(products);
// }))

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

export default router

// router.get('/:id', asyncHandler( async(req,res) => {
//     const product = await Product.findById(req.params.id)
    
//     if(product) {
//         res.json(product)
//     } else {
//         // res.status(404).json({message: 'Product not found' })
//         res.status(404)
//         throw new Error('Product not Found') 
//     }
// }))



