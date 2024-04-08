/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { getPaymentsMethod } from '../../../firebase/firebase.js'
import InputSelect from '../../utils/InputSelect.jsx'
import ButtonDefault from '../../utils/ButtonDefault.jsx'
import InputEdit from '../../utils/InputEdit.jsx'

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
      <div className={`modal z-40  ${isOpen ? 'block' : 'hidden'}`}>
        <div className='modal-overlay  fixed w-full h-full top-0 backdrop-blur-md bg-[#7b7b7bb3] left-0 right-0 bottom-0 '>
          <div className='modal-container absolute top-1/3 left-1/3'>
            <div className='modal-content w-80 h-56 items-center grid bg-primary-light p-6 rounded-2xl shadow-xl shadow-slate-800'>
              <span className=' absolute right-4 top-1 text-lg text-slate-700 cursor-pointer hover:text-slate-400' onClick={onClose}>
                X
              </span>
              <h2 className='text-2xl text-slate-500 font-light mb-4'>Realizar Abono</h2>
              <InputSelect label={'Metodo de Pago'} name={'paymentMethod'} itemOption={paymentMethods} itemValue={dataChange.paymentMethod} handleFieldChange={handleFieldChange} />

              <InputEdit
                type='number'
                edit
                name={'amount'}
                label={false}
                labelName={'Enter value'}
                value={dataChange.amount}
                onChange={handleFieldChange}
                className=' border-gray-300 h-10'
              />
              
              <span className=' flex justify-center mb-2 '>
                <ButtonDefault title='Guardar' onClick={handleClick} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HistoricalClientCredit
