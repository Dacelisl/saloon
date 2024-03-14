import { connect } from 'mongoose'
import dataConfig from '../config/process.config.js'
import { logger } from './logger.js'
import { ProductModel } from '../DAO/mongo/models/product.model.js'
import { faker } from '@faker-js/faker'

let mongoConnectionInstance = null

export const connectMongo = async () => {
  if (!mongoConnectionInstance) {
    try {
      const dbConnection = await connect(`${dataConfig.url_mongo}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      logger.info('Connected to MongoDB!')
      mongoConnectionInstance = dbConnection
      await dbConnection.syncIndexes()

      /*  const getRandomCategory = () => {
        const categoryEnum = ['cleaning', 'sale', 'inUse', 'inventory']
        const randomIndex = Math.floor(Math.random() * categoryEnum.length)
        return categoryEnum[randomIndex]
      }
       const getRandomProvider = () => {
        const categoryEnum = ['Tec Italy', 'Alfapharf', 'Wella', 'Alter Ego', 'Igora']
        const randomIndex = Math.floor(Math.random() * categoryEnum.length)
        return categoryEnum[randomIndex]
      }
     async function poblar() {
        const products = []
        for (let i = 0; i < 300; i++) {
          products.push({
            name: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            category: getRandomCategory(),
            price: faker.commerce.price(),
            thumbnail: faker.system.fileName(),
            code: faker.string.alphanumeric(10),
            provider: getRandomProvider(),
            stock: faker.number.int(100),
            dateCreation: faker.date.anytime(),
            profitSaloon: faker.number.int({ min: 10, max: 60 }),
            profitEmployee: faker.number.int({ min: 10, max: 60 }),
          })
        }
        try {
          await ProductModel.insertMany(products)
          logger.info('Inserted', products.length, 'products')
        } catch (error) {
          console.log('error en mongo', error)
          throw new Error('Error en insert many:', error)
        }
      }
      poblar() */
    } catch (e) {
      throw new Error('Can not connect to MongoDB', e)
    }
  }
  return mongoConnectionInstance
}
