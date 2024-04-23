/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import ClientTable from './ClientTable'
import ClientDetail from './ClientDetail'
import SearchClient from '../utils/SearchClient'
import Modal from '../utils/Modal'
import { getClients, updateClients } from '../../firebase/firebase'

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
      <Modal type={2}>
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
      </Modal>
    </>
  )
}

export default ClientList
