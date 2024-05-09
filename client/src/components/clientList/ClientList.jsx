/* eslint-disable react/prop-types */
import { useState, useEffect, useContext, lazy } from 'react'
import { customContext } from '../context/CustomContext'
import { getClients, updateClients } from '../../firebase/firebase'
const ClientTable = lazy(() => import('./ClientTable'))
const ClientDetail = lazy(() => import('./ClientDetail'))
const InputSearch = lazy(() => import('../utils/InputSearch'))
const Modal = lazy(() => import('../utils/Modal'))

const ClientList = () => {
  const { defaultClientList, clients, setClients, selectedClient, setSelectedClient, handleSearch, showToast, fetchFromDatabase } = useContext(customContext)

  const [search, setSearch] = useState('')
  const [imagenPreview, setImagenPreview] = useState('')
  const [editable, setEditable] = useState(false)

  useEffect(() => {
    const selected = clients.find((client) => client.id === selectedClient.id)
    setImagenPreview(selected?.thumbnail || '')
  }, [clients, selectedClient])

  const handleClientSelect = (clientId) => {
    setSelectedClient(clientId)
  }

  const saveChange = async () => {
    const res = await updateClients(selectedClient)
    setEditable(false)
    const clientsUpdate = await getClients()
    setClients(clientsUpdate)
    await fetchFromDatabase()
    setSelectedClient(defaultClientList)
    if (res.code > 200) return showToast('Cambios NO Guardados ', res.code)
    showToast('Se guardaron los cambios ', res.code)
  }

  const handleSearchInClients = (searchTerm) => {
    setSearch(handleSearch(searchTerm, clients))
  }

  return (
    <>
      <Modal type={2} className={'h-3/4 md:h-[90%] lg:h-auto  xxl:h-fit xxxl:h-[90%] xl:w-[70%] xxl:w-auto xxxl:w-[60%] mb-5 overflow-auto'}>
        <h2 className='text-xl pl-4 text-gray-500 font-bold mb-3'>Clients</h2>
        <ClientDetail
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          imagenPreview={imagenPreview}
          setImagenPreview={setImagenPreview}
          editable={editable}
          setEditable={setEditable}
          saveChange={saveChange}
        />
        <InputSearch onSearch={handleSearchInClients} />
        <ClientTable onClientSelected={handleClientSelect} data={search !== '' ? search : clients} />
      </Modal>
    </>
  )
}

export default ClientList
