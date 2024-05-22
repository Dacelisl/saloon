/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { InputEdit, ButtonDefault, ImagePreview, InputPhone } from '../imports.js'

const ClientDetail = ({ selectedClient, setSelectedClient, imagenPreview, setImagenPreview, editable, setEditable, saveChange, toast }) => {
  const [prevData, setPrevData] = useState('')

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setSelectedClient({ ...selectedClient, [name]: value })
  }

  const handleEdit = () => {
    setPrevData(selectedClient)
    setEditable(!editable)
  }
  const handleCancel = () => {
    setSelectedClient(prevData)
    setImagenPreview(prevData.thumbnail)
    setEditable(!editable)
  }

  return (
    <>
      <form className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='lg:hidden'>
          <div className='h-[55%]'>
            <ImagePreview editable={editable} imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedItem={handleFieldChange} toast={toast} />
          </div>
        </div>
        <div>
          <InputEdit labelName={'Nombre'} value={selectedClient.firstName} edit={editable} onChange={handleFieldChange} name={'firstName'} />
          <InputEdit labelName={'Apellido'} value={selectedClient.lastName} edit={editable} onChange={handleFieldChange} name={'lastName'} />
          <InputEdit labelName={'Cedula'} value={selectedClient.dni} edit={false} onChange={handleFieldChange} type={'number'} name={'dni'} />
          <InputPhone phoneNumber={selectedClient.phone} setPhoneNumber={handleFieldChange} edit={!editable} value={selectedClient.phone || ''} />
          <InputEdit labelName={'Direccion'} value={selectedClient.address} edit={editable} onChange={handleFieldChange} name={'address'} />
          <InputEdit labelName={'Email'} value={selectedClient.email} edit={false} onChange={handleFieldChange} type={'email'} name={'email'} />
        </div>
        <div>
          <div className='sm:hidden md:hidden lg:flex h-[48%]'>
            <ImagePreview editable={editable} imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedItem={handleFieldChange} toast={toast} />
          </div>
          <InputEdit labelName={'Fecha Cumpleaños'} value={selectedClient.dateBirthday} edit={editable} onChange={handleFieldChange} type={'date'} name={'dateBirthday'} />
          <InputEdit labelName={'Fecha Registro'} value={selectedClient.firstDate} edit={false} onChange={handleFieldChange} type={'date'} name={'firstDate'} />
          <InputEdit labelName={'Ultima Visita'} value={selectedClient.lastDate} edit={false} onChange={handleFieldChange} type={'date'} name={'lastDate'} />
        </div>
      </form>

      {selectedClient.firstName ? (
        <div className={` ${editable ? 'hidden' : 'flex my-2'}`}>
          <span className='contents'>
            <ButtonDefault title='Edit' onClick={handleEdit} />
          </span>
          <Link to={'/ticket'} className='contents'>
            <ButtonDefault title='Ticket' />
          </Link>
          <Link to={'/historical'} className='contents'>
            <ButtonDefault title='Ver Historial' disabled={selectedClient ? false : true} />
          </Link>
        </div>
      ) : (
        ''
      )}
      {editable ? (
        <div className='flex my-2'>
          <ButtonDefault title='Save' onClick={saveChange} />
          <ButtonDefault title='Cancel' onClick={handleCancel} />
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default ClientDetail
