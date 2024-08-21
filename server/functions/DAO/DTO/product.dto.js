import { formatDate } from '../../utils/utils.js'
export class ProductDTO {
  constructor(product) {
    this.id = product._id
    this.name = product.name
    this.description = product.description
    this.category = product.category
    this.price = product.price
    this.thumbnail = product.thumbnail
    this.code = product.code
    this.provider = product.provider.name
    this.stock = product.stock
    this.dateCreation = formatDate(product.dateCreation)
    this.profitEmployee = product.profitEmployee
    this.profitSaloon = product.profitSaloon
  }
}
