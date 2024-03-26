import { useState } from 'react'
import { passwordRecovery } from '../../../firebase/firebase.js'
import Toast from '../../utils/Toast.jsx'
import ButtonDefault from '../../utils/ButtonDefault.jsx'

// eslint-disable-next-line react/prop-types
const HistoricalClientCredit = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [toast, setToast] = useState({
    state: false,
    message: '',
  })

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleButtonClick = () => {
    setEmail('')
    msgToast('Check your mailbox')
    console.log(`Recuperar contraseña para el correo: ${email}`)
    onClose()
  }
  const msgToast = (msg) => {
    setToast({
      state: true,
      message: msg,
    })
    resetToast()
  }
  const resetToast = () => {
    setTimeout(() => {
      setToast(false)
    }, 19000)
  }

  return (
    <>
      <div className={`modal z-40  ${isOpen ? 'block' : 'hidden'}`}>
        <div className='modal-overlay  fixed w-full h-full top-0 backdrop-blur-md bg-white/30 left-0 right-0 bottom-0 '>
          <div className='modal-container absolute top-1/3 left-1/3'>
            <div className='modal-content w-80 h-52 items-center grid bg-primary-light p-6 rounded-2xl shadow-xl shadow-slate-800'>
              <span className=' absolute right-4 top-1 text-lg text-slate-700 cursor-pointer hover:text-slate-400' onClick={onClose}>
                X
              </span>
              <h2 className='text-2xl text-slate-500 font-light mb-4'>Realizar Abono</h2>
              <div className='mb-2'>
                <input
                  type='number'
                  placeholder='Enter value'
                  className='w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500'
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <span className=' flex justify-center '>
                <ButtonDefault title='Guardar' onClick={handleButtonClick} />
              </span>
            </div>
          </div>
        </div>
      </div>
      {toast.state ? (
        <>
          <Toast message={toast.message} type='success' time={19000} />
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default HistoricalClientCredit
