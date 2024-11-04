/* eslint-disable react/prop-types */
import { useState, useContext, lazy } from 'react'
import { customContext } from '../context/CustomContext.jsx'
const InputEdit = lazy(() => import('../utils/InputEdit.jsx'))
const ButtonDefault = lazy(() => import('../utils/ButtonDefault.jsx'))
const ImagePreview = lazy(() => import('../utils/ImagePreview.jsx'))
const InputPhone = lazy(() => import('../utils/InputPhone.jsx'))
const InputSelect = lazy(() => import('../utils/InputSelect.jsx'))

const EmployeeDetail = ({ selectedEmployee, setSelectedEmployee, imagenPreview, setImagenPreview, editable, setEditable, saveChange, roles, toast }) => {
  const [prevData, setPrevData] = useState('')
  const { navigate, isTimeAllowed } = useContext(customContext)

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
          <InputPhone phoneNumber={selectedEmployee.phone} setPhoneNumber={handleFieldChange}  edit={!editable} />
          <InputEdit labelName={'Direccion'} value={selectedEmployee.address} edit={editable} onChange={handleFieldChange} name={'address'} />
          <InputEdit labelName={'Fecha Cumpleaños'} value={selectedEmployee.dateBirthday} edit={editable} onChange={handleFieldChange} type={'date'} name={'dateBirthday'} />
        </div>

        <div>
          <div
            className={`sm:hidden md:hidden lg:flex ${
              imagenPreview !== '' ? 'lg:my-[10%] xl:mt-[10%] xl:my-[5%] xxl:my-[10%]' : 'lg:mt-[15%] lg:mb-[20%] xl:mt-[10%] xl:mb-[12%] xxl:my-[15%] xxxl:mb-[10%]'
            } `}
          >
            <ImagePreview editable={editable} imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedItem={handleFieldChange} toast={toast} className={'!h-full'} />
          </div>
          <InputEdit labelName={'Email'} value={selectedEmployee.email} edit={false} onChange={handleFieldChange} type={'email'} name={'email'} />
          <InputSelect label={'Rol'} name={'role'} itemOption={roles} itemValue={selectedEmployee.role} handleFieldChange={handleFieldChange} editable={editable} className='h-8' />
        </div>
      </form>
      <div className={` ${editable ? 'hidden' : 'flex relative mx-auto'}`}>
        <span className={` ${isTimeAllowed(['admin']) ? 'contents' : 'hidden'}`} >
          <ButtonDefault title='Editar' onClick={handleEdit} />
          <ButtonDefault title='Agregar' onClick={() => navigate('/registerEmployee')} />
        </span>
      </div>
      {editable ? (
        <div className='flex my-2'>
          <ButtonDefault title='Guardar' onClick={saveChange} />
          <ButtonDefault title='Cancelar' onClick={handleCancel} />
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default EmployeeDetail
