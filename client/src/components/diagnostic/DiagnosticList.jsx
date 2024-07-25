/* eslint-disable react-refresh/only-export-components */
import { useState, useContext, useEffect, lazy } from 'react'
import { customContext } from '../context/CustomContext.jsx'
import WithAuthentication from '../utils/WithAuthentication.jsx'
const { updateDiagnostic } = lazy(() => import('../../firebase/firebase.js'))
const Modal = lazy(() => import('../utils/Modal.jsx'))
const DiagnosticTable = lazy(() => import('./DiagnosticTable.jsx'))
const DiagnosticDetail = lazy(() => import('./DiagnosticDetail.jsx'))
const defaultDiagnostic = {
  client: {
    dni: '',
    firstName: '',
    lastName: '',
  },
  employee: {
    firstName: '',
    lastName: '',
  },
  date: '',
  procedureType: '',
  hairCondition: '',
  scalpCondition: '',
  stylistNotes: '',
  recommendations: '',
  nextAppointment: '',
  photoBefore: '',
  photoAfter: '',
}

const DiagnosticList = () => {
  const { diagnostics, selectedClient, showToast, fetchFromDatabase } = useContext(customContext)

  const [selectedDiagnostic, setSelectedDiagnostic] = useState(defaultDiagnostic)
  const [diagnosticsFilter, setDiagnosticsFilter] = useState('')
  const [imagenAfterPreview, setImagenAfterPreview] = useState('')
  const [imagenBeforePreview, setImagenBeforePreview] = useState('')
  const [editable, setEditable] = useState(false)

  useEffect(() => {
    const selected = diagnostics.filter((data) => data.client.dni === selectedClient.dni).sort((a, b) => new Date(b.date) - new Date(a.date))
    setDiagnosticsFilter(selected)
    setSelectedDiagnostic(selected[0])
    setImagenAfterPreview(selected[0].photoAfter)
    setImagenBeforePreview(selected[0].photoBefore)
  }, [diagnostics, selectedClient])

  const handleDiagnosticSelect = (diagnosticId) => {
    setSelectedDiagnostic(diagnosticId)
    setImagenAfterPreview(diagnosticId?.photoAfter || '')
    setImagenBeforePreview(diagnosticId?.photoBefore || '')
  }

  const saveChange = async () => {
    const res = await updateDiagnostic(selectedDiagnostic)
    setEditable(false)
    await fetchFromDatabase()
    setSelectedDiagnostic('')
    setImagenAfterPreview('')
    setImagenBeforePreview('')
    if (res.code !== 200) return showToast('Cambios NO Guardados ', res.code)
    showToast('Se guardaron los cambios ', res.code)
  }

  return (
    <>
      <Modal type={2} className={'!p-6 md:h-[85%] md:top-[3%] lg:top-[5%] lg:h-[88%] lg:!max-w-none  xxl:h-[90%]'}>
        <h2 className='flex justify-center text-xl pl-4 text-gray-500 font-bold mb-3'>{`${
          selectedDiagnostic.date ? selectedDiagnostic.client.firstName + ' ' + selectedDiagnostic.client.lastName : 'Diagnostic'
        } `}</h2>
        <DiagnosticDetail
          selectedDiagnostic={selectedDiagnostic}
          setSelectedDiagnostic={setSelectedDiagnostic}
          imagenAfterPreview={imagenAfterPreview}
          setImagenAfterPreview={setImagenAfterPreview}
          imagenBeforePreview={imagenBeforePreview}
          setImagenBeforePreview={setImagenBeforePreview}
          editable={editable}
          setEditable={setEditable}
          saveChange={saveChange}
          toast={showToast}
        />
        <div className='h-auto'>
          <DiagnosticTable onDiagnosticSelected={handleDiagnosticSelect} data={diagnosticsFilter} />
        </div>
      </Modal>
    </>
  )
}

export default WithAuthentication(['stylist', 'admin'])(DiagnosticList)
