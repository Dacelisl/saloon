/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { PasswordValid } from '../../utils/utils.js'
import Register from '../utils/Register.jsx'

import { getRoles, registerEmployeeMongo, registerEmployeeFire } from '../../firebase/firebase.js'
const userDefault = {
  firstName: '',
  lastName: '',
  dni: '',
  phone: '',
  address: '',
  email: '',
  dateBirthday: '',
  thumbnail: '',
  role: '',
  password: '',
}
const ModalRegister = () => {
  const [userData, setUserData] = useState(userDefault)
  const [send, setSend] = useState(true)
  const [roles, setRoles] = useState([])

  useEffect(() => {
    const fetchRolesFromDatabase = async () => {
      try {
        const rols = await getRoles()
        setRoles(rols)
      } catch (error) {
        throw new Error(`error getting data`)
      }
    }
    fetchRolesFromDatabase()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'phone') {
      const formattedPhone = `${userData.code}${value}`
      setUserData({
        ...userData,
        [name]: formattedPhone,
      })
    } else {
      setUserData({
        ...userData,
        [name]: value,
      })
    }
    const isFormValid = Object.values(userData).every((value) => value.trim() !== '')
    if (isFormValid) {
      setSend(false)
    }
  }

  const handleAddUser = async () => {
    try {
      const rol = roles.filter((item) => item.id == userData.role)
      const role = rol[0].name
      if (!PasswordValid(userData.password)) {
        console.log('Password must contain: 8 characters between uppercase, lowercase, and numbers')
        return
      }
      const resMongo = await registerEmployeeMongo(userData)
      switch (resMongo.code) {
        case 201:
          await registerEmployeeFire(userData.email, userData.password, role)
          console.log('Successfully registered user')
          setUserData(userDefault)
          break
        case 400:
          console.log('Some properties are missing or undefined')
          break
        case 500:
          if (resMongo.message.includes('phone')) {
            console.log('Phone Number is not valid')
          } else if (resMongo.message.includes('dateBirthday')) {
            console.log('DateBirthday is required')
          } else if (resMongo.message.includes('dni')) {
            console.log('That DNI already exists')
          } else if (resMongo.message.includes('role')) {
            console.log('Select a role from the list')
          } else if (resMongo.message.includes(userData.email)) {
            console.log('Email Duplicate')
          } else {
            console.log('Error in the registration process')
          }
          break
        default:
          console.log('Unhandled Error')
          break
      }
    } catch (error) {
      throw new Error('Unhandled Error:', error)
    }
  }

  return (
    <>
      <Register labelName={'Registro Empleados'} userData={userData} handleAddUser={handleAddUser} handleInputChange={handleInputChange} roles={roles} employee active={send} />
    </>
  )
}

export default ModalRegister
