/* eslint-disable react/prop-types */
import { useState, lazy } from 'react'
const InputEdit = lazy(() => import('../utils/InputEdit.jsx'))
const InputArea = lazy(() => import('../utils/InputArea.jsx'))
const ButtonDefault = lazy(() => import('../utils/ButtonDefault.jsx'))
const ImagePreview = lazy(() => import('../utils/ImagePreview.jsx'))
const InputPhone = lazy(() => import('../utils/InputPhone.jsx'))

const ProviderDetail = ({ selectedprovider, setSelectedClient, imagenPreview, setImagenPreview, editable, setEditable, saveChange }) => {
  const [prevData, setPrevData] = useState('')

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setSelectedClient({ ...selectedprovider, [name]: value })
  }

  const handleEdit = () => {
    setPrevData(selectedprovider)
    setEditable(!editable)
  }
  const handleCancel = () => {
    setSelectedClient(prevData)
    setImagenPreview(prevData.thumbnail)
    setEditable(!editable)
  }

  return (
    <>
      <div className='block mb-1 '>
        <div className='border p-1 mb-1 rounded-md border-solid  border-gray-200'>
          <form className='px-4 grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <InputEdit labelName={'Empresa'} value={selectedprovider.name} name={'name'} onChange={handleFieldChange} edit={editable} className='h-8' />
            <InputEdit labelName={'Direccion'} value={selectedprovider.address} name={'address'} onChange={handleFieldChange} edit={editable} className='h-8' />
            <InputEdit labelName={'Ciudad'} value={selectedprovider.city} name={'city'} onChange={handleFieldChange} edit={editable} className='h-8' />
            <InputEdit labelName={'Terminos de Pago'} value={selectedprovider.paymentTerms} name={'paymentTerms'} onChange={handleFieldChange} edit={editable} className='h-8' />
          </form>
          <div className='px-4'>
            <InputArea labelName={'Descripcion'} name={'Description'} onChange={handleFieldChange} value={selectedprovider.description} edit={editable} className='h-10' />
          </div>
        </div>

        <h2 className='text-lg pl-4 text-gray-500 font-semibold mt-4'>Contacto:</h2>
        <div className='flex border p-1  mb-1 rounded-md border-solid  border-gray-200'>
          <div className='w-[50%]'>
            <div className=' p-4 rounded-md'>
              <InputEdit labelName={'Nombre'} value={selectedprovider.firstName} edit={editable} onChange={handleFieldChange} name={'firstName'} className='h-8' />
              <InputEdit labelName={'Apellido'} value={selectedprovider.lastName} edit={editable} onChange={handleFieldChange} name={'lastName'} className='h-8' />
              <InputEdit labelName={'Cedula'} value={selectedprovider.dni} edit={false} onChange={handleFieldChange} type={'number'} name={'dni'} className='h-8' />
              <InputPhone phoneNumber={selectedprovider.phone} setPhoneNumber={handleFieldChange} edit={!editable} className='h-8' />
              <InputEdit labelName={'Direccion'} value={selectedprovider.address} edit={editable} onChange={handleFieldChange} name={'address'} className='h-8' />
            </div>
          </div>

          {/* rigth secction */}
          <div className='w-[45%] ml-4  mt-5'>
            <div className='h-[55%]'>
              <ImagePreview editable={editable} imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedItem={handleFieldChange} style='h-[95%]' />
            </div>
            <InputEdit labelName={'Email'} value={selectedprovider.email} edit={false} onChange={handleFieldChange} type={'email'} name={'email'} className='h-8' />
            <InputEdit labelName={'Fecha Cumpleaños'} value={selectedprovider.dateBirthday} edit={editable} onChange={handleFieldChange} type={'date'} name={'dateBirthday'} className='h-8' />
          </div>
        </div>
      </div>
      {editable ? (
        <div className='flex my-2'>
          <ButtonDefault title='Save' onClick={saveChange} />
          <ButtonDefault title='Cancel' onClick={handleCancel} />
        </div>
      ) : (
        <div className='flex my-2'>
          <span className='contents'>
            <ButtonDefault title='Edit' onClick={handleEdit} /> {/* Habilitar para admind */}
          </span>
        </div>
      )}
    </>
  )
}

export default ProviderDetail
