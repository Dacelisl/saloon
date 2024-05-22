/* eslint-disable react/prop-types */
import { useState, useContext } from 'react'
import { customContext } from '../context/CustomContext.jsx'
import { ButtonDefault, InputEdit, InputSelect, ModalAux } from '../imports.js'

const ticketDefault = {
  paymentDate: new Date(),
  paymentMethod: '',
  amount: '',
}
const TicketPayment = ({ isOpen, onClose, saveData, totalPayment }) => {
  const { paymentMethods, showToast } = useContext(customContext)
  const [dataChange, setDataChange] = useState(ticketDefault)
  const [changeValue, setChangeValue] = useState(false)

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setDataChange({ ...dataChange, [name]: value })
  }
  const handleClick = async () => {
    if (dataChange.paymentMethod === '') return showToast('Seleccione metodo de pago', 500)
    await saveData(dataChange)
    setDataChange(ticketDefault)
    onClose()
  }

  return (
    <>
      <ModalAux open={isOpen} close={onClose}>
        <h2 className='text-2xl text-slate-500 font-light mb-4'>Pago</h2>
        <InputSelect label={'Metodo de Pago'} name={'paymentMethod'} editable itemOption={paymentMethods} handleFieldChange={handleFieldChange} />

        <InputEdit type='number' labelName={'Total a Pagar'} value={totalPayment} onChange={handleFieldChange} name={'amount'} className='h-10' />

        <span className='cursor-pointer hover:text-stone-400 text-sm' onClick={() => setChangeValue(!changeValue)}>
          Pagar Otro Valor:{' '}
        </span>
        {changeValue ? (
          <InputEdit type='number' label={false} labelName={'Enter value'} value={dataChange.amount || ''} edit={true} onChange={handleFieldChange} name={'amount'} className='h-10' />
        ) : (
          ''
        )}
        <span className=' flex justify-center mt-2 mb-1 '>
          <ButtonDefault title='Pagar' onClick={handleClick} />
        </span>
      </ModalAux>
    </>
  )
}

export default TicketPayment
