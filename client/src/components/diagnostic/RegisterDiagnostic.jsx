/* eslint-disable react/prop-types */
import { useState, lazy, useContext, useEffect } from 'react'
import { customContext } from '../context/CustomContext.jsx'
import { formatDate } from '../../utils/utils.js'
import { registerDiagnostic } from '../../firebase/firebase.js'
import Modal from '../utils/Modal.jsx'
const InputEdit = lazy(() => import('../utils/InputEdit.jsx'))
const InputSelect = lazy(() => import('../utils/InputSelect.jsx'))
const InputArea = lazy(() => import('../utils/InputArea.jsx'))
const ImagePreview = lazy(() => import('../utils/ImagePreview.jsx'))
const ButtonDefault = lazy(() => import('../utils/ButtonDefault.jsx'))

const defaultDiagnostic = {
  userId: '',
  employeeId: '',
  date: '',
  procedureType: '',
  hairCondition: '',
  scalpCondition: '',
  stylistNotes: '',
  recommendations: 'N/a',
  nextAppointment: '',
  photoBefore: 'photo',
  photoAfter: 'photo',
}

const RegisterDiagnostic = () => {
  const { clients, selectedClient, scalpTypes, HairTypes, allServices, loggedEmployee, showToast, fetchFromDatabase, navigate } = useContext(customContext)

  const [userData, setUserData] = useState(defaultDiagnostic)
  const [imagenAfterPreview, setImagenAfterPreview] = useState('')
  const [imagenBeforePreview, setImagenBeforePreview] = useState('')

  const date = new Date()
  const dateNow = formatDate(date)

  useEffect(() => {
    if (!selectedClient.id ) return navigate(-1)
    userData.date = dateNow
    userData.employeeId = loggedEmployee.id
    userData.userId = selectedClient.id
  }, [dateNow, loggedEmployee.id, selectedClient.id, userData])

  const handleAddUser = async () => {
    try {
      const resMongo = await registerDiagnostic(userData)
      if (resMongo.code !== 201) showToast('Some properties are missing or undefined', resMongo.code)
      resetData()
      showToast('Diagnostico agregado', resMongo.code)
      await fetchFromDatabase()
      navigate(-1)
    } catch (error) {
      showToast('Error Inesperado', 500)
      throw new Error('Unhandled Error:', error)
    }
  }

  const sendAction = () => {
    const isFormValid = Object.values(userData).every((value) => {
      return value !== undefined && value !== null && value !== ''
    })
    if (isFormValid) {
      handleAddUser()
    } else {      
      showToast('Falta Informacion', 500)
    }
  }
  const resetData = () => {
    setUserData(defaultDiagnostic)
    setImagenAfterPreview('')
    setImagenBeforePreview('')
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <>
      <Modal type={2} className={'!py-3 md:h-[85%] md:top-[3%] lg:top-[5%] lg:h-[88%] xl:h-[80%] xl:top-[3%] xxl:h-[90%]'}>
        <h1 className='text-xl text-center font-bold mb-4 text-gray-700'>Nuevo Diagnostico </h1>
        <form className='grid gap-1 mb-2' style={{ gridTemplateRows: 'auto auto 0.7fr' }}>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              {selectedClient.id !== '' ? (
                <InputEdit labelName={'Cliente'} value={`${selectedClient.firstName} ${selectedClient.lastName}`} onChange={handleInputChange} name={'userId'} className='h-9' />
              ) : (
                <InputSelect
                  label={'Cliente'}
                  name={'userId'}
                  itemOption={clients}
                  handleFieldChange={handleInputChange}
                  optionValueKey='id'
                  optionDisplayKey='fullName'
                  itemValue={userData.userId}
                  editable
                  className='h-8'
                />
              )}

              <InputSelect
                label={'Cabello'}
                name={'hairCondition'}
                itemOption={HairTypes}
                itemValue={userData.hairCondition}
                handleFieldChange={handleInputChange}
                optionValueKey='name'
                optionDisplayKey='name'
                editable
                className='h-8'
              />
              <InputSelect
                label={'Procedimiento'}
                name={'procedureType'}
                itemOption={allServices}
                itemValue={userData.procedureType}
                handleFieldChange={handleInputChange}
                optionValueKey='id'
                optionDisplayKey='name'
                editable
                className='h-8'
              />
            </div>
            <div>
              <InputEdit labelName={'Fecha'} value={dateNow} type={'date'} onChange={handleInputChange} name={'date'} className='h-9' />
              <InputSelect
                label={'Cuero cabelludo'}
                name={'scalpCondition'}
                itemOption={scalpTypes}
                itemValue={userData.scalpCondition}
                handleFieldChange={handleInputChange}
                optionValueKey='name'
                optionDisplayKey='name'
                editable
                className='h-8'
              />
              <InputEdit labelName={'Proxima cita'} value={userData.nextAppointment} type={'date'} onChange={handleInputChange} name={'nextAppointment'} edit className='h-9' />
            </div>
          </div>
          <div>
            <InputArea labelName={'Descripcion'} value={userData.stylistNotes} name={'stylistNotes'} onChange={handleInputChange} edit className='h-[8vh]' />
            <InputArea labelName={'Recomendaciones'} value={userData.recommendations} name={'recommendations'} onChange={handleInputChange} edit className='h-[8vh]' />
          </div>

          <div className={`grid grid-cols-2 gap-2 mb-2`}>
            <div>
              <span className='flex justify-center mb-1 text-xs lg:text-base xxl:text-lg font-semibold text-gray-600'>Antes </span>
              <ImagePreview
                editable
                imagenPreview={imagenBeforePreview}
                setImagenPreview={setImagenBeforePreview}
                setSelectedItem={handleInputChange}
                toast={showToast}
                className={'!w-fit'}
                sizeImg={'w-[30vw]'}
                name='photoBefore'
              />
            </div>
            <div>
              <span className='flex justify-center mb-1 text-xs lg:text-base xxl:text-lg font-semibold text-gray-600'>Despues </span>
              <ImagePreview
                editable
                imagenPreview={imagenAfterPreview}
                setImagenPreview={setImagenAfterPreview}
                setSelectedItem={handleInputChange}
                toast={showToast}
                className={'!w-fit'}
                sizeImg={'w-[30vw]'}
                name='photoAfter'
              />
            </div>
          </div>
        </form>

        <div className='flex flex-wrap justify-end mt-2 mb-4'>
          <ButtonDefault title='Cancelar' onClick={() => navigate(-1)} />
          <ButtonDefault title='Guardar' onClick={sendAction} />
        </div>
      </Modal>
    </>
  )
}

export default RegisterDiagnostic
