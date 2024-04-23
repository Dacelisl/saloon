/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { getPaymentsMethod } from '../../../firebase/firebase.js'
import InputSelect from '../../utils/InputSelect.jsx'
import ButtonDefault from '../../utils/ButtonDefault.jsx'
import InputEdit from '../../utils/InputEdit.jsx'
import ModalAux from '../../utils/ModalAux.jsx'

const ticketDefault = {
  paymentMethod: '',
  amount: '',
}
const HistoricalClientCredit = ({ isOpen, onClose, saveData }) => {
  const [dataChange, setDataChange] = useState(ticketDefault)
  const [paymentMethods, setPaymentMethods] = useState([])

  useEffect(() => {
    const fetchFromDatabase = async () => {
      try {
        const method = await getPaymentsMethod()
        setPaymentMethods(method)
      } catch (error) {
        throw new Error(`error getting data`)
      }
    }
    fetchFromDatabase()
  }, [])

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setDataChange({ ...dataChange, [name]: value })
  }
  const handleClick = () => {
    saveData(dataChange)
    setDataChange(ticketDefault)
    onClose()
  }

  return (
    <>
      <ModalAux open={isOpen} close={onClose}>
        <h2 className='text-2xl text-slate-500 font-light mb-4'>Realizar Abono</h2>
        <InputSelect editable label={'Metodo de Pago'} name={'paymentMethod'} itemOption={paymentMethods} itemValue={dataChange.paymentMethod} handleFieldChange={handleFieldChange} />
        <InputEdit type='number' edit name={'amount'} label={false} labelName={'Enter value'} value={dataChange.amount} onChange={handleFieldChange} className=' border-gray-300 h-10' />
        <span className=' flex justify-center mb-2 '>
          <ButtonDefault title='Guardar' onClick={handleClick} />
        </span>
      </ModalAux>
    </>
  )
}

export default HistoricalClientCredit
