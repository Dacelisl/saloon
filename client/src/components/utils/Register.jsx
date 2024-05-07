/* eslint-disable react/prop-types */
import { useState, lazy } from 'react'
import { useNavigate } from 'react-router-dom'
const InputEdit = lazy(() => import('../utils/InputEdit.jsx'))
const InputPhone = lazy(() => import('../utils/InputPhone.jsx'))
const InputSelect = lazy(() => import('../utils/InputSelect.jsx'))
const InputPassword = lazy(() => import('../utils/InputPassword.jsx'))
const ImagePreview = lazy(() => import('../utils/ImagePreview.jsx'))
const ButtonDefault = lazy(() => import('../utils/ButtonDefault.jsx'))

const Register = ({ labelName, userData, setUserData, handleAddUser, employee = false, roles, toast }) => {
  const [localUserData, setLocalUserData] = useState(userData)
  const navigate = useNavigate()

  const sendAction = () => {
    const isFormValid = Object.values(localUserData).every((value) => {
      if (typeof value === 'string') {
        return value.trim() !== ''
      }
      return value !== undefined && value !== null
    })
    if (isFormValid) {
      handleAddUser()
    } else {
      toast('Falta Informacion', 500)
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLocalUserData({
      ...userData,
      [name]: value,
    })
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }))
  }

  return (
    <>
      <h1 className='text-xl text-center font-bold mb-4 text-gray-700'>{labelName}</h1>
      <form className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <InputEdit labelName={'Nombre'} value={userData.firstName} onChange={handleInputChange} edit name={'firstName'} className='h-9' />
        <InputEdit labelName={'Apellido'} value={userData.lastName} onChange={handleInputChange} edit name={'lastName'} className='h-9' />
        <InputEdit type='number' labelName={'DNI'} value={userData.dni} onChange={handleInputChange} edit name={'dni'} className='h-9' />
        <InputEdit labelName={'Direccion'} value={userData.address} onChange={handleInputChange} edit name={'address'} className='h-9' />
        <InputEdit type='email' labelName={'Email'} value={userData.email} onChange={handleInputChange} edit name={'email'} className='h-9' />
        <InputPhone phoneNumber={userData.phone} setPhoneNumber={handleInputChange} value={userData.phone} className={'h-9'} />
        <InputEdit type='date' labelName={'Fecha Cumpleaños'} value={userData.dateBirthday} onChange={handleInputChange} edit name={'dateBirthday'} className='h-9' />
        <ImagePreview setSelectedItem={handleInputChange} showInputOnly style='h-9' labelName='Foto de perfil' />
      </form>
      {employee && (
        <>
          <div className='border p-4 mb-4 rounded-md'>
            <h3 className='text-lg font-semibold mb-2'>User Data</h3>
            <InputEdit labelName={'Nombre de Usuario'} value={userData.email} name={'username'} className='h-9' />
            <InputSelect label={'Rol'} name={'role'} itemOption={roles} itemValue={userData.role} handleFieldChange={handleInputChange} editable />
            <InputPassword labelName={'Contraseña'} name={'password'} onChange={handleInputChange} value={userData.password} edit className='h-10' />
          </div>
        </>
      )}
      <div className='flex flex-wrap justify-end mt-4'>
        <ButtonDefault title='Cancelar' onClick={() => navigate(-1)} />
        <ButtonDefault title='Guardar' onClick={sendAction} />
      </div>
    </>
  )
}

export default Register
