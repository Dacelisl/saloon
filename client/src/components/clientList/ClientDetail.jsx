/* eslint-disable react/prop-types */
import { useState } from 'react'
import InputEdit from '../utils/InputEdit'
import ButtonDefault from '../utils/ButtonDefault'
import ImagePreview from '../utils/ImagePreview'
import InputPhone from '../utils/InputPhone.jsx'
import { Link } from 'react-router-dom'

const ClientDetail = ({ selectedClient, setSelectedClient, imagenPreview, setImagenPreview, editable, setEditable, saveChange }) => {
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
      <div className='flex mb-1 border-solid border-2 border-gray-200'>
        <div className='w-[50%]'>
          <div className=' p-4 rounded-md'>
            <InputEdit labelName={'Nombre'} value={selectedClient.firstName} edit={editable} onChange={handleFieldChange} name={'firstName'} />
            <InputEdit labelName={'Apellido'} value={selectedClient.lastName} edit={editable} onChange={handleFieldChange} name={'lastName'} />
            <InputEdit labelName={'Cedula'} value={selectedClient.dni} edit={false} onChange={handleFieldChange} type={'number'} name={'dni'} />
            <InputPhone phoneNumber={selectedClient.phone} setPhoneNumber={setSelectedClient} edit={!editable} />
            <InputEdit labelName={'Direccion'} value={selectedClient.address} edit={editable} onChange={handleFieldChange} name={'address'} />
            <InputEdit labelName={'Email'} value={selectedClient.email} edit={false} onChange={handleFieldChange} type={'email'} name={'email'} />
          </div>
        </div>

        {/* rigth secction */}
        <div className='w-[45%] ml-4  mt-5'>
          <div className='h-[40%]'>
            <ImagePreview editable={editable} imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedItem={setSelectedClient} />
          </div>
          <InputEdit labelName={'Fecha Cumpleaños'} value={selectedClient.dateBirthday} edit={editable} onChange={handleFieldChange} type={'date'} name={'dateBirthday'} />
          <InputEdit labelName={'Fecha Registro'} value={selectedClient.firstDate} edit={false} onChange={handleFieldChange} type={'date'} name={'firstDate'} />
          <InputEdit labelName={'Ultima Visita'} value={selectedClient.lastDate} edit={false} onChange={handleFieldChange} type={'date'} name={'lastDate'} />
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
          <Link to={'/historical'} className='contents'>
            <ButtonDefault title='Ticket' />
          </Link>
          <Link to={'/historical'} className='contents'>
            <ButtonDefault title='Ver Historial' />
          </Link>
        </div>
      )}
    </>
  )
}

export default ClientDetail
