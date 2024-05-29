import { useState, useContext } from 'react'
import { passwordRecovery } from '../../firebase/firebase.js'
import { customContext } from '../context/CustomContext'
import { ButtonIcon, ModalAux, InputEdit } from '../imports.js'

// eslint-disable-next-line react/prop-types
const RecoveryPassword = ({ isOpen, onClose }) => {
  const { showToast } = useContext(customContext)
  const [email, setEmail] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleButtonClick = async () => {
     await passwordRecovery(email)
    setEmail('')
    showToast('Check your mailbox', 200)
    onClose()
  }
  return (
    <>
      <ModalAux open={isOpen} close={onClose}>
        <h2 className='text-2xl text-slate-700 font-extralight mb-4'>Recuperación de Contraseña</h2>
        <InputEdit type='email' label={false} labelName={'Enter your Email'} value={email} edit={true} onChange={handleEmailChange} className='h-10' />
        <span className=' flex mt-4 mb-4  justify-center '>
          <ButtonIcon title='Send' nameIcon='send-outline' sizeIcon={'small'} className={'w-24 h-10 justify-center bg-[#4b7d30] text-base'} onClick={handleButtonClick} />
        </span>
      </ModalAux>
    </>
  )
}

export default RecoveryPassword
