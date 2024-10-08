/* eslint-disable react-refresh/only-export-components */
import { useState, useContext, lazy } from 'react'
import { customContext } from '../context/CustomContext.jsx'
import { registerProvider } from '../../firebase/firebase.js'
import WithAuthentication from '../utils/WithAuthentication.jsx'
const InputEdit = lazy(() => import('../utils/InputEdit.jsx'))
const InputArea = lazy(() => import('../utils/InputArea.jsx'))
const Modal = lazy(() => import('../utils/Modal.jsx'))
const Register = lazy(() => import('../utils/Register.jsx'))

const ProviderRegister = () => {
  const { fetchFromDatabase, navigate, showToast, isDataComplete, setSpinner } = useContext(customContext)
  const [providerData, setProviderData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    paymentTerms: '',
  })
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    thumbnail: 'https://firebasestorage.googleapis.com/v0/b/project-fabiosalon.appspot.com/o/photo_default.jpeg?alt=media&token=9e28057e-52a2-4a5d-87d0-509fc7be2eac',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProviderData({
      ...providerData,
      [name]: value,
    })
  }

  const sendAction = () => {
    if (!isDataComplete(providerData)) return showToast('Faltan propiedades', 500)
    if (!isDataComplete(contactData)) return showToast('Faltan propiedades en contacto', 500)
    providerData.contact = contactData
    const isFormValid = Object.values(providerData).every((value) => {
      if (typeof value === 'string') {
        return value.trim() !== ''
      }
      return value !== undefined && value !== null
    })
    if (isFormValid) {
      handleAddUser()
    } else {
      showToast('Falta Informacion', 500)
    }
  }

  const handleAddUser = async () => {
    try {
      setSpinner(false)
      const resMongo = await registerProvider(providerData)
      setSpinner(false)
      switch (resMongo.code) {
        case 201:
          setProviderData('')
          setContactData('')
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
          } else if (resMongo.message.includes(providerData.contact.email)) {
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
    } finally {
      setSpinner(true)
    }
  }

  return (
    <Modal type={2} className={'xxxl:w-[50%] md:h-[85%] md:top-[3%] lg:top-[5%] lg:h-[88%] xl:h-[85%] xl:w-[70%] xl:top-[3%] xxl:h-[90%]'}>
      <h2 className='text-xl pl-4 font-bold mt-2'>Proveedor</h2>
      <div className='block mb-1'>
        <div className='h-[40%]'>
          <form className='p-4 grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <InputEdit labelName={'Empresa'} value={providerData.name} name={'name'} onChange={handleInputChange} className='h-9' edit />
            <InputEdit labelName={'Direccion'} value={providerData.address} name={'address'} onChange={handleInputChange} edit className='h-9' />
            <InputEdit labelName={'Ciudad'} value={providerData.city} name={'city'} onChange={handleInputChange} edit className='h-9' />
            <InputEdit labelName={'Terminos de Pago'} value={providerData.paymentTerms} name={'paymentTerms'} onChange={handleInputChange} edit className='h-9' />
          </form>
          <div className='px-4'>
            <InputArea labelName={'Descripcion'} name={'description'} onChange={handleInputChange} value={providerData.description} edit />
          </div>
        </div>
        <div className='h-[55%] mt-1'>
          <div className='p-4 mb-1'>
            <Register labelName={'Datos Contacto'} userData={contactData} handleAddUser={sendAction} setUserData={setContactData} toast={showToast} />
          </div>
        </div>
      </div>
    </Modal>
  )
}
export default WithAuthentication(['admin'])(ProviderRegister)
