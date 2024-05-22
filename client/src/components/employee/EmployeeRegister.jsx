/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, useContext } from 'react'
import { customContext } from '../context/CustomContext.jsx'
import { registerEmployeeMongo, registerEmployeeFire } from '../../firebase/firebase.js'
import { WithAuthentication, Register, Modal } from '../imports.js'
import { PasswordValid } from '../../utils/utils.js'

const employeeDefault = {
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

const EmployeeRegister = () => {
  const { roles, showToast } = useContext(customContext)

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
          showToast('Empleado Creado', resMongo.code)
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
      <Modal type={2} className={'pb-3 xl:h-[80%] xl:top-[3%] xxl:h-[90%] xxl:top-[1%] xxxl:h-[90%]'}>
        <Register labelName={'Registro Empleados'} userData={userData} handleAddUser={handleAddUser} setUserData={setUserData} roles={roles} employee toast={showToast} />
      </Modal>
    </>
  )
}
export default WithAuthentication(['admin'])(EmployeeRegister)
