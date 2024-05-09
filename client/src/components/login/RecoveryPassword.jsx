import { useState, lazy } from 'react'
import { passwordRecovery } from '../../firebase/firebase.js'
const ButtonIcon = lazy(() => import('../utils/ButtonIcon.jsx'))
const Toast = lazy(() => import('../utils/Toast.jsx'))
const ModalAux = lazy(() => import('../utils/ModalAux.jsx'))
const InputEdit = lazy(() => import('../utils/InputEdit.jsx'))

// eslint-disable-next-line react/prop-types
const RecoveryPassword = ({ isOpen, onClose }) => {
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
      <ModalAux open={isOpen} close={onClose}>
        <h2 className='text-2xl text-slate-300 font-extralight mb-4'>Recuperación de Contraseña</h2>
        <InputEdit type='email' label={false} labelName={'Enter your Email'} value={email} edit={true} onChange={handleEmailChange} className='h-10' />
        <span className=' flex mt-4 mb-4  justify-center '>
          <ButtonIcon title='Send' nameIcon='send-outline' sizeIcon={'small'} className={'w-24 h-10 justify-center bg-[#4b7d30] text-base'} onClick={handleButtonClick} />
        </span>
      </ModalAux>
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

export default RecoveryPassword
