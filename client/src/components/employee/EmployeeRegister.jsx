/* eslint-disable react-refresh/only-export-components */

import { useState, useContext, lazy } from 'react'
import { customContext } from '../context/CustomContext.jsx'
import { registerEmployeeMongo, registerEmployeeFire } from '../../firebase/firebase.js'
import { PasswordValid } from '../../utils/utils.js'
import WithAuthentication from '../utils/WithAuthentication.jsx'
const Modal = lazy(() => import('../utils/Modal.jsx'))
const Register = lazy(() => import('../utils/Register.jsx'))

const employeeDefault = {
  firstName: '',
  lastName: '',
  dni: '',
  phone: '',
  address: '',
  email: '',
  dateBirthday: '',
  thumbnail: 'https://firebasestorage.googleapis.com/v0/b/project-fabiosalon.appspot.com/o/photo_default.jpeg?alt=media&token=9e28057e-52a2-4a5d-87d0-509fc7be2eac',
  role: '',
  password: '',
}

const EmployeeRegister = () => {
  const { fetchFromDatabase, roles, showToast, navigate, setSpinner } = useContext(customContext)

  const [userData, setUserData] = useState(employeeDefault)

  const handleAddUser = async () => {
    try {
      const rol = roles.filter((item) => item.name == userData.role)
      userData.role = rol[0].id
      userData.phone = parseInt(userData.phone)
      userData.roleName = rol[0].name
      if (!PasswordValid(userData.password)) {
        showToast('Password must contain: 8 characters between uppercase, lowercase, and numbers', 500)
        return
      }
      const resMongo = await registerEmployeeMongo(userData)
      setSpinner(false)
      switch (resMongo.code) {
        case 201:
          await registerEmployeeFire(userData.email, userData.password, userData.roleName)
          showToast('Successfully registered Employee', resMongo.code)
          await fetchFromDatabase()
          navigate(-1)
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
          } else if (resMongo.message.includes('role')) {
            showToast('Select a role from the list', resMongo.code)
          } else if (resMongo.message.includes(userData.email)) {
            showToast('Email Duplicate', resMongo.code)
          } else {
            showToast('Error in the registration process', resMongo.code)
          }
          break
        default:
          showToast('Unhandled Error', resMongo.code)
          break
      }
    } catch (error) {
      showToast('Unhandled Error', 500)
    } finally {
      setUserData(employeeDefault)
      setSpinner(true)
    }
  }
  return (
    <>
      <Modal type={2} className={'!py-3 md:h-[85%] md:top-[3%] lg:top-[5%] lg:h-[88%] xl:h-[80%] xl:top-[3%] xxl:h-[90%]'}>
        <Register labelName={'Registro Empleados'} userData={userData} handleAddUser={handleAddUser} setUserData={setUserData} roles={roles} employee toast={showToast} />
      </Modal>
    </>
  )
}
export default WithAuthentication(['admin'])(EmployeeRegister)
