import { formatDate } from '../../utils/utils.js'
export class ProductDTO {
  constructor(product) {
    this.id = product._id
    this.name = product.name
    this.description = product.description
    this.category = product.category
    this.price = product.price
    this.thumbnail = product.thumbnail
      ? product.thumbnail
      : 'https://firebasestorage.googleapis.com/v0/b/project-fabiosalon.appspot.com/o/product_default.jpeg?alt=media&token=b2f73ec4-ca7e-40af-906b-4304d965f37a'
    this.code = product.code
    this.provider = product.provider
    this.stock = product.stock
    this.dateCreation = formatDate(product.dateCreation)
    this.profitEmployee = product.profitEmployee
    this.profitSaloon = product.profitSaloon
  }
}
