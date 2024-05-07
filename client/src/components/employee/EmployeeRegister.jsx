/* eslint-disable react/prop-types */
import { useState, useContext, lazy } from 'react'
import { customContext } from '../context/CustomContext.jsx'
import { registerEmployeeMongo, registerEmployeeFire } from '../../firebase/firebase.js'
const Register = lazy(() => import('../utils/Register.jsx'))
const { PasswordValid } = lazy(() => import('../../utils/utils.js'))
const Modal = lazy(() => import('../utils/Modal.jsx'))

const EmployeeRegister = () => {
  const { employeeDefault, roles, showToast } = useContext(customContext)

  const [userData, setUserData] = useState(employeeDefault)

  const handleAddUser = async () => {
    try {
      const rol = roles.filter((item) => item.name == userData.role)
      userData.role = rol[0].id
      userData.phone = parseInt(userData.phone)
      if (!PasswordValid(userData.password)) {
        showToast('Password must contain: 8 characters between uppercase, lowercase, and numbers', 500)
        return
      }
      const resMongo = await registerEmployeeMongo(userData)
      switch (resMongo.code) {
        case 201:
          await registerEmployeeFire(userData.email, userData.password, userData.role)
          setUserData(employeeDefault)
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
      throw new Error('Unhandled Error:', error)
    }
  }
  return (
    <>
      <Modal type={2} className={' h-3/4 md:h-[90%] lg:h-auto xl:h-[80%] xl:w-[70%] xxl:h-[90%] xxxl:h-[80%] xxl:w-[45%] overflow-auto'}>
        <Register labelName={'Registro Empleados'} userData={userData} handleAddUser={handleAddUser} setUserData={setUserData} roles={roles} employee />
      </Modal>
    </>
  )
}

export default EmployeeRegister
