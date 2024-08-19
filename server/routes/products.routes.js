import express from 'express'
import { productController } from '../controllers/product.controller.js'
import { authorize } from '../middleware/auth.js'

export const ProductRoutes = express.Router()

ProductRoutes.get('/', authorize, productController.getAllProducts)
ProductRoutes.get('/categories/', authorize, productController.getCategories)
ProductRoutes.get('/filter/', authorize, productController.getProductsFilter)
ProductRoutes.get('/:pid', authorize, productController.getProductId)
ProductRoutes.get('/code/:code', authorize, productController.getProductCode)
ProductRoutes.get('/name/:name', authorize, productController.getProductsByName)
ProductRoutes.post('/', authorize, productController.createProduct)
ProductRoutes.put('/:pid', authorize, productController.updateProduct)
ProductRoutes.delete('/:pid', authorize, productController.deleteProduct)
