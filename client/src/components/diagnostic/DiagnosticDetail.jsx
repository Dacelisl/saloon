/* eslint-disable react/prop-types */
import { useState, useContext, lazy } from 'react'
import { customContext } from '../context/CustomContext.jsx'
const InputEdit = lazy(() => import('../utils/InputEdit.jsx'))
const InputSelect = lazy(() => import('../utils/InputSelect.jsx'))
const ButtonDefault = lazy(() => import('../utils/ButtonDefault.jsx'))
const ImagePreview = lazy(() => import('../utils/ImagePreview.jsx'))
const InputArea = lazy(() => import('../utils/InputArea.jsx'))

const DiagnosticDetail = ({
  selectedDiagnostic,
  setSelectedDiagnostic,
  imagenAfterPreview,
  setImagenAfterPreview,
  imagenBeforePreview,
  setImagenBeforePreview,
  editable,
  setEditable,
  saveChange,
  toast,
}) => {
  const [prevData, setPrevData] = useState('')
  const { navigate, isTimeAllowed, scalpTypes, HairTypes, allServices } = useContext(customContext)

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setSelectedDiagnostic({ ...selectedDiagnostic, [name]: value })
  }

  const handleEdit = () => {
    setPrevData(selectedDiagnostic)
    setEditable(!editable)
  }
  const handleCancel = () => {
    setSelectedDiagnostic(prevData)
    setImagenAfterPreview(prevData.photoAfter)
    setImagenBeforePreview(prevData.photoBefore)
    setEditable(!editable)
  }
  return (
    <>
      <form className='grid gap-1 mb-2' style={{ gridTemplateRows: 'auto auto 0.7fr' }}>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <InputEdit labelName={'Estilista'} value={`${selectedDiagnostic.employee.firstName} ${selectedDiagnostic.employee.lastName}`} name={'employee'} className='mb-2' />

            <InputSelect
              label={'Cabello'}
              name={'hairCondition'}
              itemOption={HairTypes}
              itemValue={selectedDiagnostic.hairCondition}
              handleFieldChange={handleFieldChange}
              optionValueKey='name'
              optionDisplayKey='name'
              className='h-8'
            />
            <InputSelect
              label={'Procedimiento'}
              name={'procedureType'}
              itemOption={allServices}
              itemValue={selectedDiagnostic.procedureType.id}
              handleFieldChange={handleFieldChange}
              optionValueKey='id'
              optionDisplayKey='name'
              className='h-8'
            />
          </div>
          <div>
            <InputEdit labelName={'Fecha'} value={selectedDiagnostic.date} type={'date'} onChange={handleFieldChange} name={'date'} className='mb-2' />
            <InputSelect
              label={'Cuero cabelludo'}
              name={'scalpCondition'}
              itemOption={scalpTypes}
              itemValue={selectedDiagnostic.scalpCondition}
              handleFieldChange={handleFieldChange}
              optionValueKey='name'
              optionDisplayKey='name'
              className='h-8'
            />
            <InputEdit labelName={'Proxima cita'} value={selectedDiagnostic.nextAppointment} type={'date'} onChange={handleFieldChange} name={'nextAppointment'} className='mb-2' />
          </div>
        </div>
        <div>
          <InputArea labelName={'Descripcion'} value={selectedDiagnostic.stylistNotes} name={'stylistNotes'} onChange={handleFieldChange} edit={editable} className='h-[8vh]' />
          <InputArea labelName={'Recomendaciones'} value={selectedDiagnostic.recommendations} name={'recommendations'} onChange={handleFieldChange} edit={editable} className='h-[8vh]' />
        </div>

        <div className={`grid grid-cols-2 gap-2 mb-2`}>
          <div>
            <span className='flex justify-center mb-1 text-xs lg:text-base xxl:text-lg font-semibold text-gray-600'>Antes </span>
            <ImagePreview
              editable={editable}
              imagenPreview={imagenBeforePreview}
              setImagenPreview={setImagenBeforePreview}
              setSelectedItem={handleFieldChange}
              toast={toast}
              className={'!h-full'}
              sizeImg={'w-[40vw]'}
              name='photoBefore'
            />
          </div>
          <div>
            <span className='flex justify-center mb-1 text-xs lg:text-base xxl:text-lg font-semibold text-gray-600'>Despues </span>
            <ImagePreview
              editable={editable}
              imagenPreview={imagenAfterPreview}
              setImagenPreview={setImagenAfterPreview}
              setSelectedItem={handleFieldChange}
              toast={toast}
              className={'!h-full'}
              sizeImg={'w-[40vw]'}
              name='photoAfter'
            />
          </div>
        </div>
      </form>

      {selectedDiagnostic.client.firstName ? (
        <div className={` ${editable ? 'hidden' : 'flex relative mx-auto mt-8 mb-3'}`}>
          <span className='contents'>
            <ButtonDefault title='Editar' onClick={handleEdit} disabled={!isTimeAllowed()} />
          </span>
          <span className='contents'>
            <ButtonDefault title='Agregar' onClick={() => navigate('/registerDiagnostic')} disabled={!isTimeAllowed()} />
          </span>
        </div>
      ) : (
        <div className={` ${editable ? 'hidden' : 'flex relative mx-auto mb-4'}`}>
          <span className='contents'>
            <ButtonDefault title='Agregar' onClick={() => navigate('/registerDiagnostic')} />
          </span>
        </div>
      )}

      {editable ? (
        <div className='flex mt-8 mb-4'>
          <ButtonDefault title='Guardar' onClick={saveChange} />
          <ButtonDefault title='Cancelar' onClick={handleCancel} />
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default DiagnosticDetail
