import { productService } from '../services/product.services.js'
import { sendErrorResponse, sendSuccessResponse } from '../utils/utils.js'

class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts()
      return sendSuccessResponse(res, products)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async getCategories(req, res) {
    try {
      const categories = await productService.getCategories()
      return sendSuccessResponse(res, categories)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async getProductsFilter(req, res) {
    const { limit, page, sort, query } = req.query
    const opcionesConsulta = {
      limit: parseInt(limit),
      page,
      sort,
      query,
      baseUrl: req.baseUrl,
      isUpdating: !!req.query.isUpdating,
    }
    try {
      const dataProduct = await productService.getProductsFilter(opcionesConsulta)
      if (dataProduct.status === 'Success') {
        return res.json(dataProduct)
      } else {
        req.logger.error('something went wrong ')
        return res.status(500).json({
          status: 'error',
          payload: {},
          message: 'something went wrong :(',
        })
      }
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async getProductId(req, res) {
    const productId = req.params.pid
    try {
      const productFound = await productService.getProductByID(productId)
      return sendSuccessResponse(res, productFound)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async getProductCode(req, res) {
    const productCode = req.params.code
    try {
      const productFound = await productService.getProductByCode(productCode)
      return sendSuccessResponse(res, productFound)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async getProductsByName(req, res) {
    const productName = req.params.name
    try {
      const productFound = await productService.getProductsByName(productName)
      return sendSuccessResponse(res, productFound)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async createProduct(req, res) {
    try {
      const { name, description, category, price, thumbnail, code, provider, stock, profitEmployee, profitSaloon } = req.body
      const newProduct = { name, description, category, price, thumbnail, code, provider, stock, profitEmployee, profitSaloon }
      const response = await productService.createProduct(newProduct)
      return sendSuccessResponse(res, response)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async updateProduct(req, res) {
    try {
      const data = req.body
      const resUpdate = await productService.updateProduct(data)
      return sendSuccessResponse(res, resUpdate)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
  async deleteProduct(req, res) {
    const productId = req.params.pid
    try {
      const resDelete = await productService.deleteProduct(productId)
      return sendSuccessResponse(res, resDelete)
    } catch (error) {
      req.logger.error(error)
      return sendErrorResponse(res, error)
    }
  }
}
export const productController = new ProductController()
