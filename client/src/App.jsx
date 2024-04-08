import { useState, useEffect } from 'react'
import Login from './components/login/Login'
import ModalRegister from './components/modals/ModalRegister'
import ModalRegisterClient from './components/modals/ModalRegisterClient'
import ModalProduct from './components/modals/ModalProduct'
import Test from './components/modals/Test'
import ProductList from './components/productList/ProductList.jsx'
import { logOut, getTickets } from './firebase/firebase.js'
import ClientList from './components/clientList/ClientList.jsx'
import TicketList from './components/ticket/TicketList.jsx'
import HistoricalClientList from './components/clientList/HistoricalClient/HistoricalClientList.jsx'


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  /* const close = () => {
    logOut()
  } */

  return (
    <>
      <div>
        {/* <HistoricalClientList/> */}
        <TicketList  />
        {/* <ClientList  /> */}
        {/* <ProductList /> */}
        {/* <ModalRegisterClient isOpen={isModalOpen} onClose={closeModal} />
        <button onClick={openModal} className='bg-blue-500 absolute text-white px-4 py-2 rounded-md'>
          Abrir Modal
        </button> */}
        {/* <ClientAll/> */}
        {/* <ModalProduct  /> */}
        {/* <Test  /> */}
        {/* <Login />
        <button onClick={close} className='bg-red-600 right-[2%] top-[1%] absolute text-white px-4 py-2 rounded-md'>
          LogOut
        </button> */}
      </div>
    </>
  )
}

export default App
