/* eslint-disable react/prop-types */
import { useState } from 'react'
import Register from '../utils/Register.jsx'
import { registerClient } from '../../firebase/firebase'

const userDefault = {
  firstName: '',
  lastName: '',
  dni: '',
  phone: '',
  address: '',
  email: '',
  dateBirthday: '',
  thumbnail: '',
  code: '',
}
const ModalRegisterClient = () => {
  const [userData, setUserData] = useState(userDefault)

  const [send, setSend] = useState(true)

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

  const handleAddUser = async (e) => {
    e.preventDefault()
    try {
      const resMongo = await registerClient(userData)
      switch (resMongo.code) {
        case 201:
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
      <Register labelName={'Registro Cliente'} userData={userData} handleAddUser={handleAddUser} handleInputChange={handleInputChange} active={send} />
    </>
  )
}

export default ModalRegisterClient
