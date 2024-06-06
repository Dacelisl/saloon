import express from 'express'
import { productController } from '../controllers/product.controller.js'
import { adminAccess, registeredUser } from '../middleware/auth.js'

export const ProductRoutes = express.Router()

ProductRoutes.get('/', registeredUser, productController.getAllProducts)
ProductRoutes.get('/categories/', registeredUser, productController.getCategories)
ProductRoutes.get('/filter/', registeredUser, productController.getProductsFilter)
ProductRoutes.get('/:pid', registeredUser, productController.getProductId)
ProductRoutes.get('/code/:code', registeredUser, productController.getProductCode)
ProductRoutes.get('/name/:name', registeredUser, productController.getProductsByName)
ProductRoutes.post('/', adminAccess, productController.createProduct)
ProductRoutes.put('/:pid', adminAccess, productController.updateProduct)
ProductRoutes.delete('/:pid', adminAccess, productController.deleteProduct)
