import { auth } from './firebaseApp'
import { formattUpdate } from '../utils/utils.js'
import axios from 'axios'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth'


const instance = axios.create({
  withCredentials: true,
})

async function makeRequest(method, url, data = null, headers = {}) {
  try {
    const response = await instance({
      method: method,
      url: `https://us-central1-project-fabiosalon.cloudfunctions.net/api${url}`,
      data: data,
      headers: headers,
    })
    return response
  } catch (error) {
    throw new Error('Error en la solicitud: makeRequest', error)
  }
}

/* SLECTS */
export const getRoles = async () => {
  try {
    const response = await makeRequest('GET', '/api/role')
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
    const response = await makeRequest('GET', '/api/products/categories/')
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
    const response = await makeRequest('GET', '/api/tickets/paymentMethods')
    const options = response.data.payload.map((item, index) => {
      return { id: index.toString(), name: item }
    })
    return options
  } catch (error) {
    throw new Error(`Error server getPaymentsMethod ${error.message}`)
  }
}
export const getServices = async () => {
  try {
    const response = await makeRequest('GET', '/api/service')
    return response.data.payload
  } catch (error) {
    throw new Error(`Error server getServices ${error.message}`)
  }
}

/* EMPLOYEES */
export const getEmployee = async () => {
  try {
    const response = await makeRequest('GET', '/api/employee')
    return response.data.payload
  } catch (error) {
    throw new Error(`Error server getEmployee ${error.message}`)
  }
}
export const updateEmployee = async (dataUser) => {
  try {
    if (typeof dataUser.thumbnail === 'object') {
      const url = await uploadFire(dataUser.thumbnail, `clients/${dataUser.dni}`)
      dataUser.thumbnail = url
    } else {
      dataUser.thumbnail = ''
    }
    const userFormatted = formattUpdate(dataUser)
    const response = await makeRequest('PUT', `/api/employee/${dataUser.id}`, userFormatted, { 'Content-Type': 'application/json' })
    return response.status
  } catch (error) {
    throw new Error(`Error server updateEmployee ${error}`)
  }
}
export const getEarningsEmployees = async () => {
  try {
    const response = await makeRequest('GET', '/api/performance')
    return response.data.payload
  } catch (error) {
    throw new Error(`Error server getEmployee ${error.message}`)
  }
}
export const getEarningsEmployeeById = async (id) => {
  try {
    const response = await makeRequest('GET', `/api/performance/employee/${id}`)
    return response.data.payload
  } catch (error) {
    throw new Error(`Error server getEmployee ${error.message}`)
  }
}
export const getEmployeeByEmail = async (mail) => {
  try {
    const response = await makeRequest('GET', `/api/employee/email/${mail}`)
    return response.data
  } catch (error) {
    throw new Error(`Error server getEmployee ${error.message}`)
  }
}

/* LOGIN */
export const singIn = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)
    if (!response) return response
    await makeRequest('POST', '/api/employee/login', null, { Authorization: `Bearer ${response.user.accessToken}` })
    return response
  } catch (error) {
    throw new Error(`Error server singIn ${error.message}`)
  }
}

export const logOut = async () => {
  const res = await signOut(auth)
    .then(async () => {
      await makeRequest('DELETE', '/api/employee/logOut')
      localStorage.removeItem('sessionData')
      return true
    })
    .catch(() => {
      return false
    })
  return res
}

export const passwordRecovery = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    throw new Error(`Error server passwordRecovery ${error}`)
  }
}
export const registerEmployeeMongo = async (dataUser) => {
  try {
    const url = await uploadFire(dataUser.thumbnail, `employee/${dataUser.dni}`)
    dataUser.thumbnail = url
    const response = await makeRequest('POST', '/api/employee', dataUser)
    return response.data
  } catch (error) {
    return error.response.data
  }
}
export const registerEmployeeFire = async (email, password, rol) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    await makeRequest('POST', '/api/employee/create', { accessToken: response.user.uid, rol })
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
    const response = await makeRequest('POST', '/api/products', dataProduct)
    return response.data
  } catch (error) {
    throw new Error(`Error server registerProduct ${error}`)
  }
}
export const getProducts = async () => {
  try {
    const response = await makeRequest('GET', '/api/products')
    return response.data.payload
  } catch (error) {
    throw new Error(`Error server getRoles ${error.message}`)
  }
}
export const getProductsByName = async (name) => {
  try {
    const response = await makeRequest('GET', `/api/products/name/${name}`)
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
    const response = await makeRequest('PUT', `/api/products/${dataProduct.id}`, productFormatted)
    return response.data
  } catch (error) {
    throw new Error(`Error server registerProduct ${error}`)
  }
}

/* CLIENTS */
export const getClients = async () => {
  try {
    const response = await makeRequest('GET', `/api/users`)
    return response.data.payload
  } catch (error) {
    throw new Error(`Error server getClients ${error.message}`)
  }
}
export const registerClient = async (dataUser) => {
  try {
    const url = await uploadFire(dataUser.thumbnail, `client/${dataUser.dni}`)
    dataUser.thumbnail = url
    const response = await makeRequest('POST', '/api/users', dataUser)
    return response.data
  } catch (error) {
    return error.response.data
  }
}
export const getClientsByName = async (name) => {
  try {
    const response = await makeRequest('GET', `/api/users/name/${name}`)
    return response.data.payload
  } catch (error) {
    throw new Error(`Error server getRoles ${error.message}`)
  }
}
export const getClientsById = async (id) => {
  try {
    const response = await makeRequest('GET', `/api/users/${id}`)
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
    const response = await makeRequest('PUT', `/api/users/${dataClient.id}`, userFormatted)
    return response.data
  } catch (error) {
    throw new Error(`Error server updateUser ${error}`)
  }
}
/* PROVIDERS */
export const getProviders = async () => {
  try {
    const response = await makeRequest('GET', `/api/provider`)
    return response.data.payload
  } catch (error) {
    throw new Error(`Error server getProviders ${error.message}`)
  }
}
export const registerProvider = async (dataUser) => {
  try {
    const url = await uploadFire(dataUser.contact.thumbnail, `provider/${dataUser.contact.dni}`)
    dataUser.contact.thumbnail = url
    const response = await makeRequest('POST', '/api/provider', dataUser)
    return response.data
  } catch (error) {
    return error.response.data
  }
}
export const updateProvider = async (data) => {
  try {
    if (typeof data.contact.thumbnail === 'object') {
      const url = await uploadFire(data.contact.thumbnail, `clients/${data.contact.dni}`)
      data.contact.thumbnail = url
    }
    const contactFormatted = formattUpdate(data.contact)
    data.contact = contactFormatted

    const response = await makeRequest('PUT', `/api/provider/${data.id}`, data)
    return response.data
  } catch (error) {
    throw new Error(`Error server updateProvider ${error}`)
  }
}

/* TICKETS */
export const getTickets = async () => {
  try {
    const response = await makeRequest('GET', `/api/tickets`)
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
    const response = await makeRequest('PUT', `/api/tickets/${ticket.ticketNumber}`, dataChange)
    return response.data
  } catch (error) {
    throw new Error(`Error server updateTicket ${error.message}`)
  }
}
export const createTicket = async (dataTicket) => {
  try {
    const response = await makeRequest('POST', '/api/tickets', dataTicket)
    return response.data
  } catch (error) {
    return error.response.data
  }
}
