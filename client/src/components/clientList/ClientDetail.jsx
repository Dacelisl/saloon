/* eslint-disable react/prop-types */
import { useState, useContext, lazy } from 'react'
import { Link } from 'react-router-dom'
import { customContext } from '../context/CustomContext.jsx'
const InputEdit = lazy(() => import('../utils/InputEdit.jsx'))
const ButtonDefault = lazy(() => import('../utils/ButtonDefault.jsx'))
const ImagePreview = lazy(() => import('../utils/ImagePreview.jsx'))
const InputPhone = lazy(() => import('../utils/InputPhone.jsx'))

const ClientDetail = ({ loggedEmployee, selectedClient, setSelectedClient, imagenPreview, setImagenPreview, editable, setEditable, saveChange, toast, showData }) => {
  const { isTimeAllowed } = useContext(customContext)
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
          <InputEdit labelName={'Cedula'} value={selectedClient.dni} edit={editable} onChange={handleFieldChange} type={'number'} name={'dni'} />
          <InputPhone phoneNumber={selectedClient.phone} setPhoneNumber={handleFieldChange} edit={!editable} value={selectedClient.phone || ''} />
          <InputEdit labelName={'Direccion'} value={selectedClient.address} edit={editable} onChange={handleFieldChange} name={'address'} />
          <InputEdit labelName={'Email'} value={selectedClient.email} edit={editable} onChange={handleFieldChange} type={'email'} name={'email'} />
        </div>
        <div>
          <div className='sm:hidden md:hidden lg:flex h-[45%] lg:mb-2'>
            <ImagePreview editable={editable} imagenPreview={imagenPreview} setImagenPreview={setImagenPreview} setSelectedItem={handleFieldChange} toast={toast} />
          </div>
          <InputEdit labelName={'Fecha Cumpleaños'} value={selectedClient.dateBirthday} edit={editable} onChange={handleFieldChange} type={'date'} name={'dateBirthday'} />
          <InputEdit labelName={'Fecha Registro'} value={selectedClient.firstDate} edit={false} onChange={handleFieldChange} type={'date'} name={'firstDate'} />
          <InputEdit labelName={'Ultima Visita'} value={selectedClient.lastDate} edit={false} onChange={handleFieldChange} type={'date'} name={'lastDate'} />
        </div>
      </form>

      {selectedClient.firstName ? (
        <div className={` ${editable ? 'hidden' : 'flex my-2'}`}>
          {loggedEmployee.role === 'admin' ? (
            <span className='contents'>
              <ButtonDefault title='Editar' onClick={handleEdit} disabled={!isTimeAllowed()} />
            </span>
          ) : (
            ''
          )}

          <Link to={'/ticket'} className='contents'>
            <ButtonDefault title='Ticket' disabled={!isTimeAllowed()} />
          </Link>
          <Link to={showData.diagnostic ? '/diagnostic' : '/registerDiagnostic'} className='contents'>
            <ButtonDefault title='Diagnostico' disabled={!showData.diagnostic && !isTimeAllowed()} />
          </Link>

          {showData.historical ? (
            <Link to={'/historical'} className='contents'>
              <ButtonDefault title='Historial' disabled={selectedClient ? false : true} />
            </Link>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
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

export default ClientDetail
