/* eslint-disable react/prop-types */
import InputEdit from '../utils/InputEdit.jsx'
import InputPhone from '../utils/InputPhone.jsx'
import InputSelect from '../utils/InputSelect.jsx'
import InputPassword from '../utils/InputPassword.jsx'
import Modal from '../utils/Modal.jsx'
import ButtonDefault from '../utils/ButtonDefault.jsx'

const ModalRegisterClient = ({ labelName, userData, handleInputChange, handleAddUser, active, employee = false, roles }) => {
  return (
    <>
      <Modal type={2} className={' h-3/4 md:h-[90%] lg:h-auto xxl:h-fit xxl:w-[60%] overflow-auto'}>
        <h1 className='text-xl font-bold mb-4 text-gray-700'>{labelName}</h1>
        <form className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <InputEdit labelName={'Nombre'} value={userData.firstName} onChange={handleInputChange} edit name={'firstName'} className='h-9' />
          <InputEdit labelName={'Apellido'} value={userData.lastName} onChange={handleInputChange} edit name={'lastName'} className='h-9' />
          <InputEdit type='number' labelName={'DNI'} value={userData.dni} onChange={handleInputChange} edit name={'dni'} className='h-9' />
          <InputEdit labelName={'Direccion'} value={userData.address} onChange={handleInputChange} edit name={'address'} className='h-9' />
          <InputEdit type='email' labelName={'Email'} value={userData.email} onChange={handleInputChange} edit name={'email'} className='h-9' />
          <InputPhone phoneNumber={userData.phone} setPhoneNumber={handleInputChange} className={'h-9'} />
          <InputEdit type='date' labelName={'Fecha Cumpleaños'} value={userData.dateBirthday} onChange={handleInputChange} edit name={'dateBirthday'} className='h-9' />
          <InputEdit type='file' labelName={'Foto de perfil'} value={userData.thumbnail} onChange={handleInputChange} edit name={'thumbnail'} className='h-9' />
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
          <ButtonDefault title='Cancelar' /* onClick={onClose} */ />
          <ButtonDefault title='Guardar' onClick={handleAddUser} disabled={active} />
        </div>
      </Modal>
    </>
  )
}

export default ModalRegisterClient
