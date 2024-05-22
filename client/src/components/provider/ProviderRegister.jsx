/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, useContext } from 'react'
import { customContext } from '../context/CustomContext.jsx'
import { registerProvider } from '../../firebase/firebase.js'
import { WithAuthentication, InputEdit, InputArea, Register, Modal } from '../imports.js'

const ProviderRegister = () => {
  const { showToast } = useContext(customContext)
  const [providerData, setProviderData] = useState('')
  const [contactData, setContactData] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProviderData({
      ...providerData,
      [name]: value,
    })
  }

  const sendAction = () => {
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
      const resMongo = await registerProvider(providerData)
      if (resMongo.code !== 200) showToast('Error in the registration process', resMongo.code)
      showToast('Successfully registered user', resMongo.code)
      setProviderData('')
      setContactData('')
    } catch (error) {
      throw new Error('Unhandled Error:', error)
    }
  }

  return (
    <Modal type={2} className={' h-3/4 md:h-[90%]  xl:h-[80%] xl:w-[70%] xxl:h-[90%] xxxl:h-[80%] xxl:w-[45%] overflow-auto'}>
      <h2 className='text-xl pl-4 font-bold mb-1'>Proveedor</h2>
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
