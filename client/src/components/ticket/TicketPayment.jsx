/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import ButtonDefault from '../utils/ButtonDefault.jsx'
import InputEdit from '../utils/InputEdit.jsx'
import InputSelect from '../utils/InputSelect.jsx'
import { getPaymentsMethod } from '../../firebase/firebase.js'
import { now } from 'mongoose'
import ModalAux from '../utils/ModalAux.jsx'

const ticketDefault = {
  paymentDate: Date(now),
  paymentMethod: '',
  amount: '',
}
const TicketPayment = ({ isOpen, onClose, saveData, totalPayment }) => {
  const [dataChange, setDataChange] = useState(ticketDefault)
  const [paymentMethod, setPaymentMethod] = useState([])
  const [changeValue, setChangeValue] = useState(false)

  useEffect(() => {
    const fetchFromDatabase = async () => {
      try {
        const methods = await getPaymentsMethod()
        setPaymentMethod(methods)
      } catch (error) {
        throw new Error(`error getting data`, error)
      }
    }
    fetchFromDatabase()
  }, [])

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setDataChange({ ...dataChange, [name]: value })
  }
  const handleClick = () => {
    if (dataChange.paymentMethod != '') {
      saveData(dataChange)
      setDataChange(ticketDefault)
      onClose()
    }
  }

  return (
    <>
      <ModalAux open={isOpen} close={onClose}>
        <h2 className='text-2xl text-slate-500 font-light mb-4'>Pago</h2>
        <InputSelect label={'Metodo de Pago'} name={'paymentMethod'} editable itemOption={paymentMethod} handleFieldChange={handleFieldChange} />
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
