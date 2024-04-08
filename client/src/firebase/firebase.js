import { auth } from './firebaseApp'
import { isValidPassword, formattUpdate } from '../utils/utils.js'
import axios from 'axios'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth'
axios.defaults.withCredentials = true

/* SLECTS */
export const getRoles = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/role/')
    const roles = response.data.payload.map((r) => {
      return { name: r.name, id: r._id, permissions: r.permissions }
    })
    return roles
  } catch (error) {
    throw new Error(`Error server getRoles ${error.message}`)
  }
}
export const getCategories = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/products/categories/')
    const options = response.data.payload.map((item, index) => {
      return { id: index.toString(), name: item }
    })
    return options
  } catch (error) {
    throw new Error(`Error server getCategories ${error.message}`)
  }
}
export const getPaymentsMethod = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/tickets/paymentMethods/')
    const options = response.data.payload.map((item, index) => {
      return { id: index.toString(), name: item }
    })
    return options
  } catch (error) {
    throw new Error(`Error server getPaymentsMethod ${error.message}`)
  }
}
export const getProviders = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/provider/')
    return response.data.payload
  } catch (error) {
    throw new Error(`Error server getCategories ${error.message}`)
  }
}
export const getServices = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/service/')
    return response.data.payload
  } catch (error) {
    throw new Error(`Error server getServices ${error.message}`)
  }
}
export const getEmployee = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/employee/')
    return response.data.payload
  } catch (error) {
    throw new Error(`Error server getEmployee ${error.message}`)
  }
}

/* LOGIN */
export const singIn = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)
    if (!response) return false
    await axios.post('http://localhost:3000/api/employee/login', { accessToken: response.user.accessToken })
    return response
  } catch (error) {
    throw new Error(`Error server singIn ${error.message}`)
  }
}
export const logOut = async () => {
  await signOut(auth)
    .then(async () => {
      await axios.post('http://localhost:3000/api/employee/logOut')
      return true
    })
    .catch(() => {
      return false
    })
}
export const passwordRecovery = async (email) => {
  try {
    sendPasswordResetEmail(auth, email)
      .then((e) => {
        console.log('se envio el email de recover', e)
      })
      .catch((error) => {
        console.log('error en el recovery 1', error)
      })
  } catch (error) {
    console.log('error en el recovery', error)
    return error.response.data
  }
}
export const registerEmployeeMongo = async (dataUser) => {
  try {
    const response = await axios.post('http://localhost:3000/api/employee/', dataUser)
    return response.data
  } catch (error) {
    return error.response.data
  }
}
export const registerEmployeeFire = async (email, password, rol) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    await axios.post('http://localhost:3000/api/employee/create', { accessToken: response.user.uid, rol })
    return response.user
  } catch (error) {
    throw new Error(`Error server registerEmployeeFire ${error.message}`)
  }
}

export const uploadFire = async (data, url) => {
  try {
    const storage = getStorage()
    const storageRef = ref(storage, url)
    const snapshot = await uploadBytes(storageRef, data)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return downloadURL
  } catch (error) {
    throw new Error(`Error server uploadFire ${error}`)
  }
}
/* PRODUCTS */
export const registerProduct = async (dataProduct) => {
  try {
    const url = await uploadFire(dataProduct.thumbnail, `products/${dataProduct.code}`)
    dataProduct.thumbnail = url
    const response = await axios.post('http://localhost:3000/api/products', dataProduct)
    return response.status
  } catch (error) {
    throw new Error(`Error server registerProduct ${error}`)
  }
}
export const getProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/products/')
    return response.data.payload
  } catch (error) {
    throw new Error(`Error server getRoles ${error.message}`)
  }
}
export const getProductsByName = async (name) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/products/name/${name}`)
    return response.data.payload
  } catch (error) {
    throw new Error(`Error server getRoles ${error.message}`)
  }
}
export const updateProduct = async (dataProduct) => {
  try {
    if (typeof dataProduct.thumbnail === 'object') {
      const url = await uploadFire(dataProduct.thumbnail, `products/${dataProduct.code}`)
      dataProduct.thumbnail = url
    } else {
      dataProduct.thumbnail = ''
    }
    const productFormatted = formattUpdate(dataProduct)
    const response = await axios.put(`http://localhost:3000/api/products/${dataProduct.id}`, productFormatted)
    return response.status
  } catch (error) {
    throw new Error(`Error server registerProduct ${error}`)
  }
}

/* CLIENTS */
export const getClients = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/users/')
    return response.data.payload
  } catch (error) {
    throw new Error(`Error server getRoles ${error.message}`)
  }
}
export const registerClient = async (dataUser) => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/', dataUser)
    return response.data
  } catch (error) {
    return error.response.data
  }
}
export const getClientsByName = async (name) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/name/${name}`)
    return response.data.payload
  } catch (error) {
    throw new Error(`Error server getRoles ${error.message}`)
  }
}
export const getClientsById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/${id}`)
    return response.data.payload
  } catch (error) {
    throw new Error(`Error server getClientsById ${error.message}`)
  }
}
export const updateClients = async (dataClient) => {
  try {
    if (typeof dataClient.thumbnail === 'object') {
      const url = await uploadFire(dataClient.thumbnail, `clients/${dataClient.dni}`)
      dataClient.thumbnail = url
    } else {
      dataClient.thumbnail = ''
    }
    const userFormatted = formattUpdate(dataClient)
    const response = await axios.put(`http://localhost:3000/api/users/${dataClient.id}`, userFormatted)
    return response.status
  } catch (error) {
    throw new Error(`Error server updateUser ${error}`)
  }
}

/* TICKETS */
export const getTickets = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/tickets/')
    return response.data.payload
  } catch (error) {
    throw new Error(`Error server getTickets ${error.message}`)
  }
}
export const updateTicket = async (ticket, data) => {
  try {
    data.amount = parseInt(data.amount, 10)
    const dataChange = {
      ticketNumber: ticket.ticketNumber,
      partialPayments: data,
    }
    const response = await axios.put(`http://localhost:3000/api/tickets/${ticket.ticketNumber}`, dataChange)
    return response.data.payload
  } catch (error) {
    throw new Error(`Error server updateTicket ${error.message}`)
  }
}

export const verifyUser = async (emailUser, userPassw) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/employee/email/${emailUser}`)
    if (res.code !== 200) return false
    if (!isValidPassword(userPassw, res.payload.password)) return false
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleString()
    await axios.put(`http://localhost:3000/api/employee/${res.payload.id}`, { lastConnection: formattedDate })
    return true
  } catch (error) {
    console.error('Error en la solicitud de registro:', error.message)
  }
}
