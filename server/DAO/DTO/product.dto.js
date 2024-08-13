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
      : 'https://firebasestorage.googleapis.com/v0/b/project-fabiosalon.appspot.com/o/product_default.jpeg?alt=media&token=2759e34e-9ba5-48da-8c0f-1810828c740b'
    this.code = product.code
    this.provider = product.provider
    this.stock = product.stock
    this.dateCreation = formatDate(product.dateCreation)
    this.profitEmployee = product.profitEmployee
    this.profitSaloon = product.profitSaloon
  }
}
