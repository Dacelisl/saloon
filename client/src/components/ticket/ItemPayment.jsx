/* eslint-disable react/prop-types */
import { useState, useEffect, lazy } from 'react'
const ButtonDefault = lazy(() => import('../utils/ButtonDefault.jsx'))
const InputEdit = lazy(() => import('../utils/InputEdit.jsx'))
const ModalAux = lazy(() => import('../utils/ModalAux.jsx'))

const ticketDefault = {
  quantity: 1,
  itemPrice: '',
}
const ItemPayment = ({ isOpen, onClose, saveData, item }) => {
  const [dataChange, setDataChange] = useState(ticketDefault)
  useEffect(() => {
    setDataChange({ ...dataChange, ['itemPrice']: item.price })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setDataChange({ ...dataChange, [name]: value })
  }

  const handleClick = () => {
    if (dataChange.itemPrice != '' && dataChange.itemPrice != '') {
      saveData(dataChange)
      setDataChange(ticketDefault)
      onClose()
    }
  }

  return (
    <>
      <ModalAux open={isOpen} close={onClose}>
        <h2 className='text-2xl text-slate-500 font-light mb-4'>{item.name}</h2>
        <InputEdit type='number' label={false} labelName={'Enter Quantity'} value={dataChange.quantity} edit={true} onChange={handleFieldChange} name={'quantity'} className='h-10' />
        <InputEdit type='number' label={false} labelName={'Enter value'} value={dataChange.itemPrice || ''} edit={true} onChange={handleFieldChange} name={'itemPrice'} className='h-10' />
        <span className=' flex justify-center mb-2 '>
          <ButtonDefault title='Guardar' onClick={handleClick} />
        </span>
      </ModalAux>
    </>
  )
}

export default ItemPayment
