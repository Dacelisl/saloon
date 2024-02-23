/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { PasswordValid } from '../../utils/utils.js'
import Toast from '../utils/Toast.jsx'

import { getRoles, registerEmployeeMongo, registerEmployeeFire } from '../../firebase/firebase.js'

const ModalRegister = ({ isOpen, onClose }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    address: '',
    email: '',
    dateBirthday: '',
    role: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [send, setSend] = useState(true)
  const [roles, setRoles] = useState([])
  const [toast, setToast] = useState({
    state: false,
    message: '',
    type: 'alert',
  })
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
    setUserData({
      ...userData,
      [name]: value,
    })
    const isFormValid = Object.values(userData).every((value) => value.trim() !== '')
    if (isFormValid) {
      setSend(false)
    }
  }
  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleAddUser = async () => {
    try {
      const rol = roles.filter((item) => item.id == userData.role)
      const role = rol[0].name
      if (!PasswordValid(userData.password)) {
        msgToast('Password must contain: 8 characters between uppercase, lowercase, and numbers')
        return
      }
      const resMongo = await registerEmployeeMongo(userData)
      switch (resMongo.code) {
        case 201:
          await registerEmployeeFire(userData.email, userData.password, role)
          msgToast('Successfully registered user')
          resetUser()
          onClose()
          break
        case 400:
          msgToast('Some properties are missing or undefined')
          break
        case 500:
          if (resMongo.message.includes('phone')) {
            msgToast('Phone Number is not valid')
          } else if (resMongo.message.includes('dateBirthday')) {
            msgToast('DateBirthday is required')
          } else if (resMongo.message.includes('dni')) {
            msgToast('That DNI already exists')
          } else if (resMongo.message.includes('role')) {
            msgToast('Select a role from the list')
          } else if (resMongo.message.includes(userData.email)) {
            msgToast('Email Duplicate')
          } else {
            msgToast('Error in the registration process')
          }
          break
        default:
          msgToast('Unhandled Error')
          break
      }
    } catch (error) {
      throw new Error('Unhandled Error:', error)
    }
  }

  const msgToast = (msg) => {
    setToast({
      state: true,
      message: msg,
      type: msg.includes('Successfully') ? 'success' : 'alert',
    })
    resetToast()
  }
  const resetToast = () => {
    setTimeout(() => {
      setToast(false)
    }, 3000)
  }
  const resetUser = () => {
    setUserData({
      firstName: '',
      lastName: '',
      dni: '',
      phone: '',
      address: '',
      email: '',
      dateBirthday: '',
      role: '',
      password: '',
    })
  }

  return (
    <>
      <div className={`fixed inset-0 top-[-5%] md:top-0 flex items-center justify-center ${isOpen ? 'visible' : 'invisible'}`}>
        <div className='fixed inset-0 bg-black opacity-50'></div>
        <div className='bg-white max-w-fit md:w-2/3 lg:w-1/2 xl:w-1/3 p-6 rounded-lg z-10 h-3/4 md:h-auto overflow-auto'>
          <h2 className='text-xl font-bold mb-4'>Add Employee</h2>
          <form id='form-login' className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='mb-4'>
              <label className='block text-sm font-semibold text-gray-600'>
                Nombre:
                <input type='text' name='firstName' value={userData.firstName} onChange={handleInputChange} className='w-full px-3 py-2 border rounded-md' />
              </label>
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-semibold text-gray-600'>
                Apellido:
                <input type='text' name='lastName' value={userData.lastName} onChange={handleInputChange} className='w-full px-3 py-2 border rounded-md' />
              </label>
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-semibold text-gray-600'>
                DNI:
                <input type='number' autoComplete='off' name='dni' value={userData.dni} onChange={handleInputChange} className='w-full px-3 py-2 border rounded-md' />
              </label>
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-semibold text-gray-600'>
                Phone:
                <input type='tel' autoComplete='tel-country-code' name='phone' value={userData.phone} onChange={handleInputChange} className='w-full px-3 py-2 border rounded-md' />
              </label>
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-semibold text-gray-600'>
                Address:
                <input type='text' autoComplete='off' name='address' value={userData.address} onChange={handleInputChange} className='w-full px-3 py-2 border rounded-md' />
              </label>
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-semibold text-gray-600'>
                Email:
                <input type='email' autoComplete='email' name='email' value={userData.email} onChange={handleInputChange} className='w-full px-3 py-2 border rounded-md' />
              </label>
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-semibold text-gray-600'>
                DateBirthday:
                <input type='date' name='dateBirthday' value={userData.dateBirthday} onChange={handleInputChange} className='w-full px-3 py-2 border rounded-md' />
              </label>
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-semibold text-gray-600'>
                Rol:
                <select name='role' value={userData.role} onChange={handleInputChange} className='w-full px-3 py-2 border rounded-md'>
                  <option value=''>Seleccione un role</option>
                  {roles.map((rol) => (
                    <option key={rol.id} value={rol.id}>
                      {rol.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </form>
          <div className='border p-4 mb-4 rounded-md'>
            <h3 className='text-lg font-semibold mb-2'>User Data</h3>
            <div className='mb-4'>
              <label className='block text-sm font-semibold text-gray-600'>
                Nombre de Usuario:
                <input type='text' autoComplete='off' disabled name='username' value={userData.email} className='w-full px-3 py-2 border rounded-md' />
              </label>
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-semibold text-gray-600'>
                Contraseña:
                <div className='relative'>
                  <input type={showPassword ? 'text' : 'password'} name='password' required value={userData.password} onChange={handleInputChange} className='w-full px-3 py-2 border rounded-md' />
                  <button type='button' className='absolute top-0 right-0 mt-2 mr-2' onClick={toggleShowPassword}>
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
              </label>
            </div>
          </div>
          <div className='flex justify-center'>
            <button type='button' onClick={handleAddUser} disabled={send} className='bg-blue-500 text-white px-4 py-2 mr-2 rounded-md'>
              Agregar
            </button>
            <button type='button' onClick={onClose} className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md'>
              Cerrar
            </button>
          </div>
        </div>
      </div>
      {toast.state ? (
        <>
          <Toast message={toast.message} type={toast.type} time={3000} />
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default ModalRegister
