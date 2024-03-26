import { userModel } from '../models/user.model.js'
import { UserDTO } from '../../DTO/user.dto.js'
import { UserTicketDTO } from '../../DTO/userTicket.dto.js'
import { Types } from 'mongoose'

class UserDAO {
  async getAllUsers() {
    try {
      const users = await userModel
        .find()
        .populate('serviceHistory.employeeId', 'firstName lastName')
        .populate('serviceHistory.service', 'name description')
        .populate('shopping.employeeId', 'firstName lastName')
        .populate('shopping.products.product', 'name price')

      const formattedUsers = users.map((user) => (user ? new UserDTO(user) : null))

      return formattedUsers
    } catch (error) {
      throw new Error(`function DAO getAllUsers: ${error}`)
    }
  }
  async getUserById(id) {
    try {
      const user = await userModel
        .findById(id)
        .populate('serviceHistory.employeeId', 'firstName lastName')
        .populate('serviceHistory.service', 'name description')
        .populate('shopping.employeeId', 'firstName lastName')
        .populate('shopping.products.product', 'name price')
        .lean()

      return user ? new UserDTO(user) : null
    } catch (error) {
      throw new Error(`function DAO getUserById: ${error}`)
    }
  }
  async getUserByEmail(email) {
    try {
      const user = await userModel
        .findOne({ email })
        .populate('serviceHistory.employeeId')
        .populate('serviceHistory.service')
        .populate('shopping.employeeId')
        .populate('shopping.products.product')
        .lean()
      return user ? new UserDTO(user) : null
    } catch (error) {
      throw new Error(`function DAO getUserByEmail: ${error}`)
    }
  }
  async getClientsByName(search) {
    try {
      const users = await userModel
        .find({
          $or: [
            {
              firstName: {
                $regex: new RegExp(search, 'si'),
              },
            },
            {
              lastName: {
                $regex: new RegExp(search, 'si'),
              },
            },
          ],
        })
        .populate('serviceHistory.employeeId')
        .populate('serviceHistory.service')
        .populate('shopping.employeeId')
        .populate('shopping.products.product')
        .lean()
      const formattedUsers = users.map((user) => (user ? new UserDTO(user) : null))
      return formattedUsers
    } catch (error) {
      throw new Error(`function DAO getUsersByName: ${error}`)
    }
  }
  async saveUser(userData) {
    try {
      const result = await userModel.create(userData)
      return result
    } catch (error) {
      throw new Error(`function DAO saveUser: ${error}`)
    }
  }
  async deleteUser(email) {
    try {
      const result = await userModel.deleteOne({ email: email })
      return result
    } catch (error) {
      throw new Error(`function DAO deleteUser: ${error}`)
    }
  }
  async updateUser(updatedData) {
    try {
      const user = await userModel.updateOne(
        { email: updatedData.email },
        {
          $set: {
            firstName: updatedData.firstName,
            lastName: updatedData.lastName,
            dni: updatedData.dni,
            phone: updatedData.phone,
            address: updatedData.address,
            dateBirthday: updatedData.dateBirthday,
            thumbnail: updatedData.thumbnail,
          },
          $push: {
            serviceHistory: { $each: updatedData.serviceHistory || [] },
            shopping: { $each: updatedData.shopping || [] },
          },
        }
      )
      return user
    } catch (error) {
      throw new Error(`function DAO updateUser: ${error}`)
    }
  }
  async updateHistorysUser(ticket) {
    try {
      const employee = new Types.ObjectId(ticket.employeeId)
      const user = await userModel.findById(ticket.customerId)
      const ticketDTO = new UserTicketDTO(ticket)
      user.serviceHistory.push(
        ...ticketDTO.services.map((service) => ({
          employeeId: employee,
          service: service.serviceId,
          price: service.price,
        }))
      )
      user.shopping.push({
        products: ticketDTO.products.map((product) => ({
          product: product.productId,
          quantity: product.quantity,
        })),
        employeeId: employee,
      })
      await user.save()
      return true
    } catch (error) {
      throw new Error(`function DAO updateHistorysUser: ${error}`)
    }
  }
}
export const userDAO = new UserDAO()
