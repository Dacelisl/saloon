/* eslint-disable react/prop-types */
import { useState } from 'react'
import { InputEdit, InputArea, ButtonDefault, ImagePreview, InputPhone } from '../imports.js'

const ProviderDetail = ({ selectedprovider, setSelectedProvider, imagenPreview, setImagenPreview, editable, setEditable, saveChange, toast }) => {
  const [prevData, setPrevData] = useState('')

  const handleFieldChange = (e) => {
    const { name, value } = e.target

    setSelectedProvider((prevProvider) => {
      if (name.startsWith('contact.')) {
        const contactField = name.split('.')[1]
        return {
          ...prevProvider,
          contact: {
            ...prevProvider.contact,
            [contactField]: value,
          },
        }
      } else if (name === 'thumbnail') {
        return {
          ...prevProvider,
          contact: {
            ...prevProvider.contact,
            thumbnail: value,
          },
        }
      }else if (name === 'phone') {
        return {
          ...prevProvider,
          contact: {
            ...prevProvider.contact,
            phone: value,
          },
        }
      } else {
        return {
          ...prevProvider,
          [name]: value,
        }
      }
    })
  }

  const handleEdit = () => {
    setPrevData(selectedprovider)
    setEditable(!editable)
  }
  const handleCancel = () => {
    setImagenPreview(prevData.contact.thumbnail)
    setSelectedProvider(prevData)
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
            <InputArea labelName={'Descripcion'} name={'description'} onChange={handleFieldChange} value={selectedprovider.description} edit={editable} className='h-14' />
          </div>
        </div>
        <h2 className='text-lg pl-4 text-gray-500 font-semibold mt-4'>Contacto:</h2>
        <div className='block border px-4 pt-2 pb-1  mb-1 rounded-md border-solid  border-gray-200'>
          <form className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className='lg:hidden mt-2'>
              <div className='h-[55%]'>
                <ImagePreview editable={editable} imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedItem={handleFieldChange} toast={toast} />
              </div>
            </div>
            <div>
              <InputEdit labelName={'Nombre'} value={selectedprovider.contact.firstName} edit={editable} onChange={handleFieldChange} name={'contact.firstName'} className='h-8' />
              <InputEdit labelName={'Apellido'} value={selectedprovider.contact.lastName} edit={editable} onChange={handleFieldChange} name={'contact.lastName'} className='h-8' />
              <InputEdit labelName={'Cedula'} value={selectedprovider.contact.dni} edit={false} onChange={handleFieldChange} type={'number'} name={'contact.dni'} className='h-8' />
              <InputPhone phoneNumber={selectedprovider.contact.phone} setPhoneNumber={handleFieldChange} edit={!editable} value={selectedprovider.contact.phone || ''} className='h-8' />
              <InputEdit labelName={'Direccion'} value={selectedprovider.contact.address} edit={editable} onChange={handleFieldChange} name={'contact.address'} className='h-8' />
            </div>
            <div>
              <div className='sm:hidden md:hidden lg:flex h-[48%] mt-6 mb-3 '>
                <ImagePreview editable={editable} imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedItem={handleFieldChange} toast={toast} />
              </div>
              <InputEdit labelName={'Email'} value={selectedprovider.contact.email} edit={false} onChange={handleFieldChange} type={'email'} name={'contact.email'} className='h-8' />
              <InputEdit
                labelName={'Fecha Cumpleaños'}
                value={selectedprovider.contact.dateBirthday}
                edit={editable}
                onChange={handleFieldChange}
                type={'date'}
                name={'contact.dateBirthday'}
                className='h-8'
              />
            </div>
          </form>
        </div>
      </div>
      {selectedprovider.name ? (
        <div className={` ${editable ? 'hidden' : 'flex my-1'}`}>
          <span className='contents'>
            <ButtonDefault title='Edit' onClick={handleEdit} />
          </span>
        </div>
      ) : (
        ''
      )}
      {editable ? (
        <div className='flex my-1'>
          <ButtonDefault title='Save' onClick={saveChange} />
          <ButtonDefault title='Cancel' onClick={handleCancel} />
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default ProviderDetail
