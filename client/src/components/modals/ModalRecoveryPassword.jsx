import { useState } from 'react'
import ButtonIcon from '../utils/ButtonIcon'
import { passwordRecovery } from '../../firebase/firebase'
import Toast from '../utils/Toast.jsx'
import ModalAux from '../utils/ModalAux.jsx'
import InputEdit from '../utils/InputEdit.jsx'

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
      <ModalAux open={isOpen} close={onClose}>
        <h2 className='text-2xl text-slate-300 font-extralight mb-4'>Recuperación de Contraseña</h2>
        <InputEdit type='email' label={false} labelName={'Enter your Email'} value={email} edit={true} onChange={handleEmailChange} className='h-10' />
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

export default ModalRecoveryPassword
