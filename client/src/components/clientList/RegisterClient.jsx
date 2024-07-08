import { useState, useContext, lazy } from 'react'
import { registerClient } from '../../firebase/firebase.js'
import { customContext } from '../context/CustomContext.jsx'
const Modal = lazy(() => import('../utils/Modal.jsx'))
const Register = lazy(() => import('../utils/Register.jsx'))

const RegisterClient = () => {
  const { fetchFromDatabase, showToast } = useContext(customContext)

  const [userData, setUserData] = useState('')

  const handleAddUser = async () => {
    try {
      const resMongo = await registerClient(userData)
      switch (resMongo.code) {
        case 201:
          showToast('Successfully registered user', resMongo.code)
          setUserData('')
          await fetchFromDatabase()
          break
        case 400:
          showToast('Some properties are missing or undefined', resMongo.code)
          break
        case 500:
          if (resMongo.message.includes('phone')) {
            showToast('Phone Number is not valid', resMongo.code)
          } else if (resMongo.message.includes('dateBirthday')) {
            showToast('DateBirthday is required', resMongo.code)
          } else if (resMongo.message.includes('dni')) {
            showToast('That DNI already exists', resMongo.code)
          } else if (resMongo.message.includes(userData.email)) {
            showToast('Email Duplicate', resMongo.code)
          } else {
            showToast('Error in the registration process', resMongo.code)
          }
          break
        default:
          showToast('Error Inesperado', resMongo.code)
          break
      }
    } catch (error) {
      throw new Error('Unhandled Error:', error)
    }
  }
  return (
    <>
      <Modal type={2} className={'!py-5 md:h-[85%] md:top-[3%] lg:h-auto lg:top-[3%]'}>
        <Register labelName={'Registro Cliente'} userData={userData} handleAddUser={handleAddUser} setUserData={setUserData} toast={showToast} />
      </Modal>
    </>
  )
}

export default RegisterClient
