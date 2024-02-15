import { auth } from './firebaseApp'
import { isValidPassword } from '../utils/utils'
import axios from 'axios'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

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

export const registerEmployeeFire = async (email, password, rol) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    await axios.post('http://localhost:3000/api/employee/create', { accessToken: response.user.uid, rol })
    return response.user
  } catch (error) {
    throw new Error(`Error server registerEmployeeFire ${error.message}`)
  }
}

export const singIn = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)
    await axios.post('http://localhost:3000/api/employee/login', { accessToken: response.user.accessToken }, { withCredentials: true })
    return response
  } catch (error) {
    throw new Error(`Error server singIn ${error.message}`)
  }
}
export const logOut = async () => {
  await axios.post('http://localhost:3000/api/employee/logOut')

  /* signOut(auth)
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    }) */
}
export const registerEmployeeMongo = async (dataUser) => {
  try {
    const response = await axios.post('http://localhost:3000/api/employee/', dataUser)
    return response.data
  } catch (error) {
    return error.response.data
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
export const registerWithGoogle = async (passUser) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/employee/email/${passUser}`)
    console.log(response.data)
  } catch (error) {
    console.error('Error en la solicitud de registro:', error.message)
  }
}
