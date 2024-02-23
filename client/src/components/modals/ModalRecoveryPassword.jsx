import { useState } from 'react'
import ButtonIcon from '../utils/ButtonIcon'
import { passwordRecovery } from '../../firebase/firebase'
import Toast from '../utils/Toast.jsx'

// eslint-disable-next-line react/prop-types
const ModalRecoveryPassword = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [toast, setToast] = useState({
    state: false,
    message: '',
  })

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleButtonClick = () => {
    passwordRecovery(email)
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
        <div className='modal-overlay  fixed w-full h-full top-0 backdrop-blur-md bg-white/30 left-0 right-0 bottom-0 ' onClick={onClose}>
          <div className='modal-container absolute top-1/3 left-1/3'>
            <div className='modal-content items-center grid bg-[#193a4e] p-6 rounded-2xl shadow-slate-800'>
              <h2 className='text-2xl text-slate-300 font-extralight mb-4'>Recuperación de Contraseña</h2>
              <div className='mb-4'>
                <input
                  type='email'
                  placeholder='Enter your Email'
                  className='w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500'
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <span className=' flex mt-4 mb-4  justify-center '>
                <ButtonIcon
                  title='Send'
                  nameIcon='send-outline'
                  sizeIcon={'small'}
                  style={{
                    width: '100px',
                    height: '40px',
                    justifyContent: 'center',
                    backgroundColor: '#4b7d30',
                    fontSize: 'medium',
                  }}
                  onClick={handleButtonClick}
                />
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

export default ModalRecoveryPassword
