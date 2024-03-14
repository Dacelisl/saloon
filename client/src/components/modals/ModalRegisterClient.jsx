/* eslint-disable react/prop-types */
import { useState } from 'react'
import Toast from '../utils/Toast.jsx'
import { registerClient } from '../../firebase/firebase'
import { paises } from '../../utils/utils.js'

const userDefault = {
  firstName: '',
  lastName: '',
  dni: '',
  phone: '',
  address: '',
  email: '',
  dateBirthday: '',
  code: '',
}
const ModalRegisterClient = ({ isOpen, onClose }) => {
  const [userData, setUserData] = useState(userDefault)
  const [toast, setToast] = useState({
    state: false,
    message: '',
    type: 'alert',
  })
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
    setUserData(userDefault)
  }

  return (
    <>
      <div className={`z-50 flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 ${isOpen ? 'visible' : 'invisible'}`}>
        <div className='w-full max-w-md p-4 bg-white rounded-lg shadow-md'>
          <h1 className='text-xl font-bold mb-4 text-gray-700'>Registro Cliente</h1>
          <form>
            <div className='flex flex-wrap -mx-4'>
              <div className='w-full md:w-1/2 px-4 mb-4'>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  FirstName:
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    value={userData.firstName}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                  />
                </label>
              </div>
              <div className='w-full md:w-1/2 px-4 mb-4'>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  LastName:
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    value={userData.lastName}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                  />
                </label>
              </div>
              <div className='w-full md:w-1/2 px-4 mb-4'>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  DNI:
                  <input
                    type='number'
                    id='dni'
                    name='dni'
                    value={userData.dni}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                  />
                </label>
              </div>
              <div className='w-full md:w-1/2 px-4 mb-4'>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  Address:
                  <input
                    type='text'
                    id='address'
                    name='address'
                    value={userData.address}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                  />
                </label>
              </div>
              <div className='w-full md:w-1/2 px-4 mb-4'>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  Email:
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={userData.email}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                  />
                </label>
              </div>
              <div className='w-full md:w-1/2 px-4 mb-4'>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  DateBirthday:
                  <input
                    type='date'
                    id='dateBirthday'
                    name='dateBirthday'
                    value={userData.dateBirthday}
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                  />
                </label>
              </div>
              <div className='w-full md:w-1/2 px-4 mb-4'>
                <label className='block text-sm font-medium text-gray-700'>Phone:</label>
                <div className='inline-flex aspect-auto'>
                  <select name='code' value={userData.code} className='inline-flex' onChange={handleInputChange}>
                    {paises.map((pais) => (
                      <option key={pais.nombre} value={pais.indicativo}>
                        {'+' + pais.indicativo}
                      </option>
                    ))}
                  </select>
                  <input
                    type='tel'
                    id='phone'
                    autoComplete='off'
                    name='phone'
                    onChange={handleInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                  />
                </div>
              </div>
              <div className='w-full px-4 mb-4'>
                <label className='block mb-2 text-sm font-medium text-gray-700'>
                  Foto de perfil
                  <input type='file' id='foto' name='foto' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500' />
                </label>
              </div>
            </div>
            <div className='flex flex-wrap justify-end mt-4'>
              <button
                type='button'
                onClick={onClose}
                className='px-4 py-2 text-sm font-medium text-gray-500 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500'
              >
                Cancelar
              </button>
              <button
                type='submit'
                disabled={send}
                onClick={handleAddUser}
                className='ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500'
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
      {toast.state ? (
        <>
          <Toast message={toast.message} type={toast.type} time={4000} />
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default ModalRegisterClient
