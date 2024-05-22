/* eslint-disable react/prop-types */
import { useState } from 'react'
import { InputEdit, ButtonDefault, ImagePreview, InputPhone } from '../imports.js'

const EmployeeDetail = ({ selectedEmployee, setSelectedEmployee, imagenPreview, setImagenPreview, editable, setEditable, saveChange, toast }) => {
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
      <form className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2'>
        <div className='lg:hidden'>
          <div className='h-[55%]'>
            <ImagePreview editable={editable} imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedItem={handleFieldChange} toast={toast} />
          </div>
        </div>
        <div>
          <InputEdit labelName={'Nombre'} value={selectedEmployee.firstName} edit={editable} onChange={handleFieldChange} name={'firstName'} />
          <InputEdit labelName={'Apellido'} value={selectedEmployee.lastName} edit={editable} onChange={handleFieldChange} name={'lastName'} />
          <InputEdit labelName={'Cedula'} value={selectedEmployee.dni} edit={false} onChange={handleFieldChange} type={'number'} name={'dni'} />
          <InputPhone phoneNumber={selectedEmployee.phone} setPhoneNumber={handleFieldChange} value={selectedEmployee.phone || ''} edit={!editable} />
          <InputEdit labelName={'Direccion'} value={selectedEmployee.address} edit={editable} onChange={handleFieldChange} name={'address'} />
          <InputEdit labelName={'Fecha Cumpleaños'} value={selectedEmployee.dateBirthday} edit={editable} onChange={handleFieldChange} type={'date'} name={'dateBirthday'} />
        </div>

        <div>
          <div className='sm:hidden md:hidden lg:flex lg:my-[10%]'>
            <ImagePreview editable={editable} imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedItem={handleFieldChange} toast={toast} className={'!h-full'} />
          </div>

          <InputEdit labelName={'Email'} value={selectedEmployee.email} edit={false} onChange={handleFieldChange} type={'email'} name={'email'} />
          <InputEdit labelName={'Rol'} value={selectedEmployee.role} edit={editable} onChange={handleFieldChange} name={'role'} />
        </div>
      </form>

      {selectedEmployee.firstName ? (
        <div className={` ${editable ? 'hidden' : 'flex relative mx-auto'}`}>
          <span className='contents'>
            <ButtonDefault title='Edit' onClick={handleEdit} />
          </span>
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

export default EmployeeDetail