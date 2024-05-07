/* eslint-disable react/prop-types */
import { useState, lazy } from 'react'
const InputEdit = lazy(() => import('../utils/InputEdit'))
const InputArea = lazy(() => import('../utils/InputArea'))
const Register = lazy(() => import('../utils/Register'))
const Modal = lazy(() => import('../utils/Modal'))

const providerDefault = {
  name: '',
  description: '',
  email: '',
  address: '',
  city: '',
  paymentTerms: '',
  contact: {
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    address: '',
    email: '',
    dateBirthday: '',
  },
}
const ProviderRegister = () => {
  const [providerData, setProviderData] = useState(providerDefault)
  const [send, setSend] = useState(true)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'phone') {
      const formattedPhone = `${providerData.code}${value}`
      setProviderData({
        ...providerData,
        [name]: formattedPhone,
      })
    } else {
      setProviderData({
        ...providerData,
        [name]: value,
      })
    }
    const isFormValid = Object.values(providerData).every((value) => value.trim() !== '')
    if (isFormValid) {
      setSend(false)
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
            <InputArea labelName={'Descripcion'} name={'Description'} onChange={handleInputChange} value={providerData.description} edit />
          </div>
        </div>

        <div className='h-[55%] mt-1'>
          <div className='p-4 mb-1'>
            <Register labelName={'Datos Contacto'} userData={providerData.contact} handleInputChange={handleInputChange} active={send} />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ProviderRegister
