/* eslint-disable react/prop-types */
import { useState, lazy } from 'react'
const InputEdit = lazy(() => import('../utils/InputEdit.jsx'))
const ButtonDefault = lazy(() => import('../utils/ButtonDefault.jsx'))
const ImagePreview = lazy(() => import('../utils/ImagePreview.jsx'))
const InputPhone = lazy(() => import('../utils/InputPhone.jsx'))

const EmployeeDetail = ({ selectedEmployee, setSelectedEmployee, imagenPreview, setImagenPreview, editable, setEditable, saveChange }) => {
  const [prevData, setPrevData] = useState('')

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setSelectedEmployee({ ...selectedEmployee, [name]: value })
  }

  const handleEdit = () => {
    setPrevData(selectedEmployee)
    setEditable(!editable)
  }
  const handleCancel = () => {
    setSelectedEmployee(prevData)
    setImagenPreview(prevData.thumbnail)
    setEditable(!editable)
  }

  return (
    <>
      <form className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <div className='lg:hidden'>
          <div className='h-[55%]'>
            <ImagePreview editable={editable} imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedItem={handleFieldChange} />
          </div>
        </div>
        <div>
          <InputEdit labelName={'Nombre'} value={selectedEmployee.firstName} edit={editable} onChange={handleFieldChange} name={'firstName'} />
          <InputEdit labelName={'Apellido'} value={selectedEmployee.lastName} edit={editable} onChange={handleFieldChange} name={'lastName'} />
          <InputEdit labelName={'Cedula'} value={selectedEmployee.dni} edit={false} onChange={handleFieldChange} type={'number'} name={'dni'} />
          <InputPhone phoneNumber={selectedEmployee.phone} setPhoneNumber={handleFieldChange} edit={!editable} />
          <InputEdit labelName={'Direccion'} value={selectedEmployee.address} edit={editable} onChange={handleFieldChange} name={'address'} />
        </div>

        <div>
          <div className='sm:hidden md:hidden lg:flex h-[53%]'>
            <ImagePreview editable={editable} imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedItem={handleFieldChange} />
          </div>
          <InputEdit labelName={'Fecha Cumpleaños'} value={selectedEmployee.dateBirthday} edit={editable} onChange={handleFieldChange} type={'date'} name={'dateBirthday'} />
          <InputEdit labelName={'Email'} value={selectedEmployee.email} edit={false} onChange={handleFieldChange} type={'email'} name={'email'} />
          <InputEdit labelName={'Rol'} value={selectedEmployee.role} edit={editable} onChange={handleFieldChange} name={'role'} />
        </div>
      </form>

      {editable ? (
        <div className='flex my-2'>
          <ButtonDefault title='Save' onClick={saveChange} />
          <ButtonDefault title='Cancel' onClick={handleCancel} />
        </div>
      ) : (
        <div className='flex relative sm:mx-auto lg:mr-[50%] lg:bottom-4 mb-3  '>
          <span className='contents'>
            <ButtonDefault title='Edit' onClick={handleEdit} /> {/* Habilitar para admind */}
          </span>
        </div>
      )}
    </>
  )
}

export default EmployeeDetail
