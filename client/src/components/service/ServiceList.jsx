/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect, useState, lazy } from 'react'
import WithAuthentication from '../utils/WithAuthentication.jsx'
import { customContext } from '../context/CustomContext.jsx'
import { updateServices, createServices } from '../../firebase/firebase.js'
import DropDown from '../utils/DropDown.jsx'
const Modal = lazy(() => import('../utils/Modal.jsx'))
const InputEdit = lazy(() => import('../utils/InputEdit.jsx'))
const InputRange = lazy(() => import('../utils/InputRange.jsx'))
const InputArea = lazy(() => import('../utils/InputArea.jsx'))
const ButtonDefault = lazy(() => import('../utils/ButtonDefault.jsx'))

const ServiceList = () => {
  const { allServices, fetchFromDatabase, isTimeAllowed, showToast, setSpinner } = useContext(customContext)

  const [selectedService, setSelectedService] = useState({
    name: '',
    description: '',
    priceRange: { min: 0, max: 0 },
    profitEmployee: 0,
  })
  const [editable, setEditable] = useState(false)
  const [prevData, setPrevData] = useState('')
  const [isCreateServiceVisible, setIsCreateServiceVisible] = useState(false)

  useEffect(() => {
    const observerVisible = () => {
      if (isCreateServiceVisible) setSelectedService('')
    }
    observerVisible()
  }, [isCreateServiceVisible])

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    if (name === 'priceRange.min' || name === 'priceRange.max') {
      setSelectedService((prevState) => ({
        ...prevState,
        priceRange: {
          ...prevState.priceRange,
          [name.split('.')[1]]: Number(value),
        },
      }))
    } else {
      setSelectedService((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }
  const saveChange = async (e) => {
    e.preventDefault()
    setSpinner(false)
    let res = ''
    if (!isCreateServiceVisible) {
      res = await updateServices(selectedService)
    } else {
      delete selectedService.id
      res = await createServices(selectedService)
      setIsCreateServiceVisible(!isCreateServiceVisible)
    }
    setEditable(false)
    await fetchFromDatabase()
    setSelectedService('')
    setSpinner(true)
    if (res.status !== 'Success') return showToast('Cambios NO Guardados Elementos Duplicados', res.code)
    showToast('Se guardaron los cambios ', res.code)
  }

  const toggleCreateServiceSection = () => {
    setIsCreateServiceVisible(!isCreateServiceVisible)
  }
  const handleEdit = () => {
    setPrevData(selectedService)
    setEditable(!editable)
  }
  const handleCancel = () => {
    setSelectedService(prevData)
    setEditable(!editable)
  }

  return (
    <>
      <Modal type={2} className={'!py-4 md:h-[90%] md:top-[3%]  xl:!top-[3%] xl:!h-[85%] xl:!max-w-[80%] xxl:!h-[90%]'}>
        <div className='bg-gray-100 text-gray-800 mt-3 xl:h-full'>
          <div className='container mx-auto p-4 contents h-full'>
            <div className='flex flex-wrap xl:flex-nowrap h-full'>
              <aside className='w-full xl:w-[35%] h-[40vh] bg-white p-4 pt-2 shadow-md rounded-lg overflow-auto mb-1 xl:m-2 xl:mr-0 xl:h-[95%]'>
                <h2 className='text-lg text-center font-semibold mb-4'>Lista de Servicios</h2>
                <ul className='space-y-2'>
                  {allServices.map((item) => (
                    <li key={item.id} className='p-2 bg-[#d9e7cb] rounded-lg cursor-pointer hover:bg-gray-300' onClick={() => setSelectedService(item)}>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </aside>

              <div className='flex-1 mt-2 mr-2'>
                <DropDown label={'Detalles Del Servicio'} hiden={!isCreateServiceVisible} toggleHiden={toggleCreateServiceSection}>
                  <section className='flex-1 bg-white mb-3 shadow-md rounded-lg p-4 pt-2 ml-0 xl:ml-4'>
                    <div className='space-y-4'>
                      <InputEdit labelName={'Nombre'} value={selectedService.name} edit={editable} onChange={handleFieldChange} name={'name'} className='!mb-0' />
                      <InputArea labelName={'Descripcion'} value={selectedService.description} name={'description'} onChange={handleFieldChange} edit={editable} className='h-[8vh] !mb-0' />
                      <InputRange labelName={'Precio Promedio'} value={selectedService.priceRange} edit={editable} onChange={handleFieldChange} name={'priceRange'} />
                      <InputEdit labelName={'Porcentaje Empleado %'} value={selectedService.profitEmployee} edit={editable} onChange={handleFieldChange} type={'number'} name={'profitEmployee'} />
                    </div>
                    {editable ? (
                      <div className='flex my-2'>
                        <ButtonDefault title='Guardar' onClick={saveChange} />
                        <ButtonDefault title='Cancelar' onClick={handleCancel} />
                      </div>
                    ) : (
                      <div className='flex my-2'>
                        <ButtonDefault title='Editar' onClick={handleEdit} disabled={!isTimeAllowed(['admin'])} />
                      </div>
                    )}
                  </section>
                </DropDown>

                <DropDown label={'Agregar Nuevo Servicio'} hiden={isCreateServiceVisible} toggleHiden={toggleCreateServiceSection}>
                  <section className='flex-1 bg-white shadow-md rounded-lg mt-2 p-4 pt-2 ml-0 xl:ml-4'>
                    <form id='create-service-form' className='space-y-4'>
                      <InputEdit label={false} labelName={'Nombre del Servicio'} value={selectedService.name} edit onChange={handleFieldChange} name={'name'} />
                      <InputArea label={false} labelName={'Descripcion'} value={selectedService.description} edit name={'description'} onChange={handleFieldChange} className='h-[8vh] !mb-0' />
                      <InputRange labelName={'Precio Promedio'} value={selectedService.priceRange} edit onChange={handleFieldChange} name={'priceRange'} />
                      <InputEdit label={false} labelName={'Porcentaje Empleado'} value={selectedService.profitEmployee} edit onChange={handleFieldChange} type={'number'} name={'profitEmployee'} />
                      <ButtonDefault title='Crear Servicio' onClick={saveChange} disabled={!isTimeAllowed(['admin'])} />
                    </form>
                  </section>
                </DropDown>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
export default WithAuthentication(['admin'])(ServiceList)
