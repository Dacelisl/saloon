/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import ClientTable from './ClientTable'
import ClientDetail from './ClientDetail'
import SearchClient from '../utils/SearchClient'
import { getClients, updateClients } from '../../firebase/firebase'
import FloatingDots from '../utils/FloatingDots'
import MovingDots from '../utils/MovingDots'

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
  thumbnail: '',
  code: '',
}

const ClientList = () => {
  const [clients, setClients] = useState([])
  const [selectedClient, setSelectedClient] = useState(defaultClient)
  const [selectedClientId, setSelectedClientId] = useState('')
  const [search, setSearch] = useState('')
  const [imagenPreview, setImagenPreview] = useState('')
  const [editable, setEditable] = useState(false)

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

  useEffect(() => {
    const selected = clients.find((client) => client.id === selectedClientId)
    setSelectedClient(selected || defaultClient)
    setImagenPreview(selected?.thumbnail || '')
  }, [clients, selectedClientId])

  const handleClientSelect = (clientId) => {
    setSelectedClientId(clientId.id)
  }

  const saveChange = async () => {
    await updateClients(selectedClient)
    setEditable(false)
    const clientsUpdate = await getClients()
    setClients(clientsUpdate)
  }

  const handleSearch = (searchTerm) => {
    if (searchTerm === '') return setSearch('')
    const filtered = clients.filter((client) =>
      Object.entries(client).some(([key, value]) => typeof value === 'string' && key !== 'thumbnail' && value.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    setSearch(filtered)
  }

  return (
    <>
      <div className=' fixed inset-0 flex items-center top-[-5%] md:top-0 justify-center bg-secondary-dark backdrop-blur-xl  bg-opacity-75'>
        <MovingDots number={4} />
        <FloatingDots number={3} />
        <div className='z-10 bg-primary-light  p-4 max-w-md mx-auto rounded-lg shadow-sm shadow-slate-700'>
          <h2 className='text-xl pl-4 text-gray-500 font-bold mb-1'>Clients</h2>
          <ClientDetail
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            imagenPreview={imagenPreview}
            setImagenPreview={setImagenPreview}
            editable={editable}
            setEditable={setEditable}
            saveChange={saveChange}
          />
          <SearchClient onSearch={handleSearch} />
          <ClientTable onClientSelected={handleClientSelect} data={search !== '' ? search : clients} />
        </div>
      </div>
    </>
  )
}

export default ClientList
