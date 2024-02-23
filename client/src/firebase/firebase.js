import { auth } from './firebaseApp'
import { isValidPassword } from '../utils/utils'
import axios from 'axios'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,sendPasswordResetEmail, signOut } from 'firebase/auth'
axios.defaults.withCredentials = true

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
        console.log('se envio el email de recover',e);
      })
      .catch((error) => {
        console.log('error en el recovery 1', error);
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
