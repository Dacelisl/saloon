/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import ClientTable from './ClientTable'
import ClientDetail from './ClientDetail'
import Test from '../modals/Test'
import SearchClient from '../utils/SearchClient'
import { getClientsByName } from '../../firebase/firebase'

const defaultClient = {
  firstName: '',
  lastName: '',
  dni: '',
  phone: '',
  address: '',
  email: '',
  dateBirthday: '',
  firstDate: '',
  lastDate: '',
}

const ClientList = ({ clients }) => {
  const [selectedClient, setSelectedClient] = useState(defaultClient)
  const [selectedClientId, setSelectedClientId] = useState('')
  const [search, setSearch] = useState('')
  const [imagenPreview, setImagenPreview] = useState('')

  useEffect(() => {
    const selected = clients.find((client) => client.id === selectedClientId)
    setSelectedClient(selected || defaultClient)
    setImagenPreview(selected?.thumbnail || '')
  }, [clients, selectedClientId])

  const handleClientSelect = (clientId) => {
    setSelectedClientId(clientId.id)
  }

  const saveChange = () => {
    console.log('se guardo todo ', selectedClient)
  }

  const handleSearch = async (searchTerm) => {
    const clients = await getClientsByName(searchTerm)
    setSearch(clients)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSelectedClient((prevFields) => ({
      ...prevFields,
      [name]: value,
    }))
  }

  return (
    <>
      <div className=' fixed inset-0 flex items-center top-[-5%] md:top-0 justify-center bg-secondary-light backdrop-blur-xl  bg-opacity-75'>
        <Test></Test>
        <div className='z-10 bg-primary-light  p-4 max-w-md mx-auto rounded-lg shadow-xl shadow-slate-800'>
          <h2 className='text-xl pl-4 text-gray-500 font-bold mb-1'>Clients</h2>
          <ClientDetail
            selectedClient={selectedClient}
            imagenPreview={imagenPreview}
            setImagenPreview={setImagenPreview}
            setSelectedClient={setSelectedClient}
            handleInputChange={handleInputChange}
            saveChange={saveChange}
          />
          <SearchClient onSearch={handleSearch} />
          <ClientTable onClientSelected={handleClientSelect} data={search ? search : clients} />
          {/* <div className='flex-1'>{clients.length > 0 ? <ClientTable onClientSelected={handleClientSelect} data={clients} /> : <></>}</div> */}
        </div>
      </div>
    </>
  )
}

export default ClientList
