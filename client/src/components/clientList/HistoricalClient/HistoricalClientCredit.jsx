/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from 'react'
import { customContext } from '../../context/CustomContext.jsx'
import { InputSelect, ButtonDefault, InputEdit, ModalAux } from '../../imports.js'

const HistoricalClientCredit = ({ isOpen, onClose, saveData, balanceDue = '' }) => {
  const { paymentMethods } = useContext(customContext)
  const [dataChange, setDataChange] = useState({
    paymentMethod: '',
    amount: balanceDue,
  })
  const [changeValue, setChangeValue] = useState(false)
  const [send, setSend] = useState(true)

  useEffect(() => {
    const isFormValid = Object.values(dataChange).every((value) => {
      if (typeof value === 'string') {
        return value.trim() !== ''
      }
      return value !== undefined && value !== null
    })
    if (isFormValid) {
      setSend(false)
    }
  }, [dataChange])

  useEffect(() => {
    setDataChange({ ...dataChange, ['amount']: balanceDue })
  }, [balanceDue])

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setDataChange({ ...dataChange, [name]: value })
  }
  const handleClick = async () => {
    saveData(dataChange)
    setDataChange({
      paymentMethod: '',
      amount: '',
    })
    onClose()
  }

  return (
    <>
      <ModalAux open={isOpen} close={onClose}>
        <h2 className='text-2xl text-slate-500 font-light mb-4'>Realizar Abono</h2>

        <InputSelect editable label={'Metodo de Pago'} name={'paymentMethod'} itemOption={paymentMethods} itemValue={dataChange.paymentMethod} handleFieldChange={handleFieldChange} />

        <InputEdit type='number' edit name={'amount'} label={false} labelName={'Enter value'} value={balanceDue} onChange={handleFieldChange} className=' border-gray-300 h-10' />

        <span className='cursor-pointer hover:text-stone-400 text-sm' onClick={() => setChangeValue(!changeValue)}>
          Pagar Otro Valor:{' '}
        </span>
        {changeValue ? (
          <InputEdit type='number' label={false} labelName={'Enter value'} value={dataChange.amount || ''} edit={true} onChange={handleFieldChange} name={'amount'} className='h-10' />
        ) : (
          ''
        )}

        <span className=' flex justify-center mb-2 '>
          <ButtonDefault title='Pagar' onClick={handleClick} disabled={send} />
        </span>
      </ModalAux>
    </>
  )
}

export default HistoricalClientCredit
