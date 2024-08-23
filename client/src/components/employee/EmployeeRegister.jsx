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
  const { fetchFromDatabase, roles, showToast, setSpinner } = useContext(customContext)

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
      setSpinner(false)
      const resMongo = await registerEmployeeMongo(userData)
      if (resMongo.code !== 201) {
        setSpinner(true)
        setUserData(employeeDefault)
        return showToast('Some properties are missing or undefined', 500)
      }
      await registerEmployeeFire(userData.email, userData.password, userData.roleName)
      showToast('Empleado Creado', resMongo.code)
      setUserData(employeeDefault)
      await fetchFromDatabase()
      setSpinner(true)
    } catch (error) {
      showToast('Unhandled Error', 500)
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
