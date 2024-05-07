/* eslint-disable react/prop-types */
import { useState, useEffect, lazy } from 'react'
import { getProviders, updateClients } from '../../firebase/firebase'
const ProviderTable = lazy(() => import('./ProviderTable'))
const ProviderDetail = lazy(() => import('./ProviderDetail'))
const InputSearch = lazy(() => import('../utils/InputSearch'))
const Modal = lazy(() => import('../utils/Modal'))

const providerDefault = {
  name: '',
  description: '',
  email: '',
  address: '',
  city: '',
  paymentTerms: '',
  contact: {
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    address: '',
    email: '',
    dateBirthday: '',
  },
}

const ProviderList = () => {
  const [clients, setClients] = useState([])
  const [selectedClient, setSelectedClient] = useState(providerDefault)
  const [selectedClientId, setSelectedClientId] = useState('')
  const [search, setSearch] = useState('')
  const [imagenPreview, setImagenPreview] = useState('')
  const [editable, setEditable] = useState(false)

  useEffect(() => {
    const fetchFromDatabase = async () => {
      try {
        const allClients = await getProviders()
        setClients(allClients)
      } catch (error) {
        throw new Error(`error getting data`, error)
      }
    }
    fetchFromDatabase()
  }, [])

  useEffect(() => {
    const selected = clients.find((client) => client.id === selectedClientId)
    setSelectedClient(selected || providerDefault)
    setImagenPreview(selected?.thumbnail || '')
  }, [clients, selectedClientId])

  const handleClientSelect = (clientId) => {
    setSelectedClientId(clientId.id)
  }

  const saveChange = async () => {
    await updateClients(selectedClient)
    setEditable(false)
    const clientsUpdate = await getProviders()
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
      <Modal type={2} className={' h-3/4 md:h-[90%]  xl:h-[80%] xl:w-[70%] xxl:h-[90%] xxxl:h-[80%] xxl:w-auto xxxl:w-[60%] overflow-auto'}>
        <h2 className='text-xl text-center mb-3 text-gray-500 font-bold'>Proveedores</h2>
        <ProviderDetail
          selectedprovider={selectedClient}
          setSelectedClient={setSelectedClient}
          imagenPreview={imagenPreview}
          setImagenPreview={setImagenPreview}
          editable={editable}
          setEditable={setEditable}
          saveChange={saveChange}
        />
        <InputSearch onSearch={handleSearch} />
        <ProviderTable onClientSelected={handleClientSelect} data={search !== '' ? search : clients} />
      </Modal>
    </>
  )
}

export default ProviderList
