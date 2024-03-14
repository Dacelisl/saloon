import { useState, useEffect } from 'react'
import Login from './components/login/Login'
import ModalRegister from './components/modals/ModalRegister'
import ModalRegisterClient from './components/modals/ModalRegisterClient'
import ModalProduct from './components/modals/ModalProduct'
import Test from './components/modals/Test'
import ProductList from './components/productList/ProductList.jsx'
import { logOut, getProducts, getClients } from './firebase/firebase.js'
import ClientList from './components/clientList/ClientList.jsx'

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

  /*  const [products, setProducts] = useState([]) */
  const [clients, setClients] = useState([])

  useEffect(() => {
    const fetchFromDatabase = async () => {
      try {
        const allClients = await getClients()
        setClients(allClients)
      } catch (error) {
        throw new Error(`error getting data`, error)
      }
    }
    fetchFromDatabase()
  }, [])
  /* useEffect(() => {
    const fetchFromDatabase = async () => {
      try {
        const allProducts = await getProducts()
        setProducts(allProducts)
      } catch (error) {
        throw new Error(`error getting data`)
      }
    }
    fetchFromDatabase()
  }, []) */

  return (
    <>
      <div>
        <ClientList clients={clients} />
        {/* <ModalRegisterClient isOpen={isModalOpen} onClose={closeModal} />
        <button onClick={openModal} className='bg-blue-500 absolute text-white px-4 py-2 rounded-md'>
          Abrir Modal
        </button> */}
        {/* <ProductList products={products} /> */}
        {/* <ClientAll/> */}
        {/* <ModalProduct  /> */}
        {/* <Test  /> */}
      </div>
    </>
  )
}

export default App
{
  /* <ClientAll/>
      <ModalRegisterClient isOpen={isModalOpen} onClose={closeModal}></ModalRegisterClient>
      <ModalRegister isOpen={isModalOpen} onClose={closeModal} /> 
      <button onClick={openModal} className='bg-blue-500 absolute text-white px-4 py-2 rounded-md'>
        Abrir Modal
      </button>
      <Login></Login>
      <button onClick={close} className='bg-red-600 right-[2%] top-[1%] absolute text-white px-4 py-2 rounded-md'>
        LogOut
      </button> */
}
