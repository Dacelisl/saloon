import { useState } from 'react'
import Login from './components/login/Login'
import { logOut } from './firebase/firebase'
import ModalRegister from './components/modals/ModalRegister'
import ModalRegisterClient from './components/modals/ModalRegisterClient'
import ClientAll from './components/table/ClientAll'
import ModalProduct from './components/modals/ModalProduct'
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const close = () => {
    logOut()
  }
  return (
    <>
    <ModalProduct></ModalProduct>
      {/* <ClientAll></ClientAll>
      <ModalRegisterClient isOpen={isModalOpen} onClose={closeModal}></ModalRegisterClient>
      <ModalRegister isOpen={isModalOpen} onClose={closeModal} /> 
      <button onClick={openModal} className='bg-blue-500 absolute text-white px-4 py-2 rounded-md'>
        Abrir Modal
      </button>
      <Login></Login>
      <button onClick={close} className='bg-red-600 right-[2%] top-[1%] absolute text-white px-4 py-2 rounded-md'>
        LogOut
      </button> */}
    </>
  )
}

export default App
