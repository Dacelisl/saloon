import { useState } from 'react'
import Login from './components/login/Login'
import {logOut} from './firebase/firebase'
import ModalRegister from './components/modalRegister/ModalRegister'
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
      <Login></Login>
      <button onClick={openModal} className='bg-blue-500 absolute text-white px-4 py-2 rounded-md'>
        Abrir Modal
      </button>
      <button onClick={close} className='bg-red-600 right-[2%] top-[1%] absolute text-white px-4 py-2 rounded-md'>
        LogOut
      </button>

      <ModalRegister isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}

export default App
