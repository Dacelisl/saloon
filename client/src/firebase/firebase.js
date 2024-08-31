import { auth } from './firebaseApp'
import { formattUpdate, formatDate } from '../utils/utils.js'
import axios from 'axios'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth'

const date = new Date()
const dateNow = formatDate(date)
const photo_default = 'https://firebasestorage.googleapis.com/v0/b/project-fabiosalon.appspot.com/o/photo_default.jpeg?alt=media&token=9e28057e-52a2-4a5d-87d0-509fc7be2eac'

const instance = axios.create()
instance.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAccessToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      } else {
        throw new Error('Not authenticated')
      }
    } catch (error) {
      throw new Error('Error getting token', error)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
async function getAccessToken() {
  return new Promise((resolve, reject) => {
    auth.currentUser
      .getIdToken()
      .then((accessToken) => {
        resolve(accessToken)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

async function makeRequest(method, url, data = null, headers = {}) {
  try {
    const response = await instance({
      method: method,
      /* url: `https://us-central1-project-fabiosalon.cloudfunctions.net/back/api${url}`, */
      url: `http://localhost:3000/api${url}`,
      data: data,
      headers: headers,
    })
    return response.data
  } catch (error) {
    if (error.response && error.response.status === 401 && error.response.data.message === 'invalid-argument') {
      await signOut(auth)
    } else {
      return error.response.data
    }
  }
}

/* SLECTS */
export const getRoles = async () => {
  try {
    const response = await makeRequest('GET', '/role')
    return response
  } catch (error) {
    return error
  }
}
export const getCategories = async () => {
  try {
    const response = await makeRequest('GET', '/products/categories/')
    return response
  } catch (error) {
    return error
  }
}
export const getPaymentsMethod = async () => {
  try {
    const response = await makeRequest('GET', '/tickets/paymentMethods')
    return response
  } catch (error) {
    return error
  }
}
export const getServices = async () => {
  try {
    const response = await makeRequest('GET', '/service')
    return response
  } catch (error) {
    return error
  }
}
export const updateServices = async (data) => {
  try {
    const response = await makeRequest('PUT', `/service/${data.id}`, data)
    return response
  } catch (error) {
    return error
  }
}
export const createServices = async (data) => {
  try {
    const response = await makeRequest('POST', `/service`, data)
    return response
  } catch (error) {
    return error
  }
}

/* EMPLOYEES */
export const getEmployee = async () => {
  try {
    const response = await makeRequest('GET', '/employee')
    return response
  } catch (error) {
    return error
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
    const response = await makeRequest('PUT', `/employee/${dataUser.id}`, userFormatted, { 'Content-Type': 'application/json' })
    return response
  } catch (error) {
    return error
  }
}
export const getEarningsEmployees = async () => {
  try {
    const response = await makeRequest('GET', '/performance')
    return response
  } catch (error) {
    return error
  }
}
export const getEarningsEmployeeById = async (id) => {
  try {
    const response = await makeRequest('GET', `/performance/employee/${id}`)
    return response
  } catch (error) {
    return error
  }
}
export const getEmployeeByEmail = async (mail) => {
  try {
    const response = await makeRequest('GET', `/employee/email/${mail}`)
    return response
  } catch (error) {
    return error
  }
}

/* LOGIN */
export const singIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    /* await makeRequest('POST', '/employee/login', null, { Authorization: `Bearer ${response.user.accessToken}` }) */
  } catch (error) {
    return error
  }
}
export const logOut = async () => {
  const res = await signOut(auth)
    .then(async () => {
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
    return error
  }
}
export const registerEmployeeMongo = async (dataUser) => {
  try {
    if (typeof dataUser.thumbnail === 'object') {
      const url = await uploadFire(dataUser.thumbnail, `employee/${dataUser.dni}`)
      dataUser.thumbnail = url
    } else {
      dataUser.thumbnail = photo_default
    }
    const response = await makeRequest('POST', '/employee', dataUser)
    return response
  } catch (error) {
    return error
  }
}
export const registerEmployeeFire = async (email, password, rol) => {
  try {
    const response = await makeRequest('POST', '/employee/create', { email, password, rol })
    return response
  } catch (error) {
    return error
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
    return error
  }
}
/* PRODUCTS */
export const registerProduct = async (dataProduct) => {
  try {
    if (typeof dataProduct.thumbnail === 'object') {
      const url = await uploadFire(dataProduct.thumbnail, `products/${dataProduct.code}`)
      dataProduct.thumbnail = url
    }
    const response = await makeRequest('POST', '/products', dataProduct)
    return response
  } catch (error) {
    return error
  }
}
export const getProducts = async () => {
  try {
    const response = await makeRequest('GET', '/products')
    return response
  } catch (error) {
    return error
  }
}
export const getProductsByName = async (name) => {
  try {
    const response = await makeRequest('GET', `/products/name/${name}`)
    return response
  } catch (error) {
    return error
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
    const response = await makeRequest('PUT', `/products/${dataProduct.id}`, productFormatted)
    return response
  } catch (error) {
    return error
  }
}

/* CLIENTS */
export const getClients = async () => {
  try {
    const response = await makeRequest('GET', `/users`)
    return response
  } catch (error) {
    return error
  }
}
export const registerClient = async (dataUser) => {
  try {
    if (typeof dataUser.thumbnail === 'object') {
      const url = await uploadFire(dataUser.thumbnail, `client/${dataUser.dni}`)
      dataUser.thumbnail = url
    } else {
      dataUser.thumbnail = photo_default
    }
    const response = await makeRequest('POST', '/users', dataUser)
    return response
  } catch (error) {
    return error
  }
}
export const getClientsByName = async (name) => {
  try {
    const response = await makeRequest('GET', `/users/name/${name}`)
    return response
  } catch (error) {
    return error
  }
}
export const getClientsById = async (id) => {
  try {
    const response = await makeRequest('GET', `/users/${id}`)
    return response
  } catch (error) {
    return error
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
    const response = await makeRequest('PUT', `/users/${dataClient.id}`, userFormatted)
    return response
  } catch (error) {
    return error
  }
}
/* PROVIDERS */
export const getProviders = async () => {
  try {
    const response = await makeRequest('GET', `/provider`)
    return response
  } catch (error) {
    return error
  }
}
export const registerProvider = async (dataUser) => {
  try {
    if (typeof dataUser.thumbnail === 'object') {
      const url = await uploadFire(dataUser.contact.thumbnail, `provider/${dataUser.contact.dni}`)
      dataUser.contact.thumbnail = url
    } else {
      dataUser.thumbnail = photo_default
    }
    const response = await makeRequest('POST', '/provider', dataUser)
    return response
  } catch (error) {
    return error
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
    const response = await makeRequest('PUT', `/provider/${data.id}`, data)
    return response
  } catch (error) {
    return error
  }
}
/* DIAGNOSTICS */
export const getDiagnostics = async () => {
  try {
    const response = await makeRequest('GET', `/diagnostic`)
    return response
  } catch (error) {
    return error
  }
}
export const getDiagnosticById = async (id) => {
  try {
    const response = await makeRequest('GET', `/diagnostic/id/${id}`)
    return response
  } catch (error) {
    return error
  }
}
export const registerDiagnostic = async (dataUser) => {
  try {
    if (typeof dataUser.photoBefore === 'object') {
      const url1 = await uploadFire(dataUser.photoBefore, `diagnostics/${dataUser.userId}-before-${dateNow}`)
      dataUser.photoBefore = url1
      const url2 = await uploadFire(dataUser.photoAfter, `diagnostics/${dataUser.userId}-after-${dateNow}`)
      dataUser.photoAfter = url2
    } else {
      dataUser.photoBefore = photo_default
      dataUser.photoAfter = photo_default
    }
    const response = await makeRequest('POST', '/diagnostic', dataUser)
    return response
  } catch (error) {
    return error
  }
}
export const updateDiagnostic = async (data) => {
  try {
    if (typeof data.photoBefore === 'object') {
      const url = await uploadFire(data.photoBefore, `diagnostics/${data.dni}-before-${dateNow}`)
      data.photoBefore = url
    }
    if (typeof data.photoAfter === 'object') {
      const url = await uploadFire(data.photoAfter, `diagnostics/${data.dni}-after-${dateNow}`)
      data.photoAfter = url
    }
    const response = await makeRequest('PUT', `/diagnostic/${data.id}`, data)
    return response
  } catch (error) {
    return error
  }
}
export const getScalpTypes = async () => {
  try {
    const response = await makeRequest('GET', '/diagnostic/scalpTypes/')
    return response
  } catch (error) {
    return error
  }
}
export const getHairTypes = async () => {
  try {
    const response = await makeRequest('GET', '/diagnostic/hairTypes/')
    return response
  } catch (error) {
    return error
  }
}

/* TICKETS */
export const getTickets = async () => {
  try {
    const response = await makeRequest('GET', `/tickets`)
    return response
  } catch (error) {
    return error
  }
}
export const updateTicket = async (ticket, data) => {
  try {
    data.amount = parseInt(data.amount, 10)
    const dataChange = {
      ticketNumber: ticket.ticketNumber,
      partialPayments: data,
    }
    const response = await makeRequest('PUT', `/tickets/${ticket.ticketNumber}`, dataChange)
    return response
  } catch (error) {
    return error
  }
}
export const createTicket = async (dataTicket) => {
  try {
    const response = await makeRequest('POST', '/tickets', dataTicket)
    return response
  } catch (error) {
    return error
  }
}
