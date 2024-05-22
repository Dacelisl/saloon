/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react'
import { customContext } from '../context/CustomContext'
import { updateClients } from '../../firebase/firebase'
import { WithAuthentication, ClientTable, ClientDetail, InputSearch, Modal } from '../imports'

const ClientList = () => {
  const { clients, selectedClient, setSelectedClient, handleSearch, showToast, fetchFromDatabase } = useContext(customContext)

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
    await fetchFromDatabase()
    setSelectedClient('')
    if (res.code !== 200) return showToast('Cambios NO Guardados ', res.code)
    showToast('Se guardaron los cambios ', res.code)
  }

  const handleSearchInClients = (searchTerm) => {
    setSearch(handleSearch(searchTerm, clients))
  }

  return (
    <>
      <Modal type={2} className={'!py-6 xl:!top-[3%] xl:!h-[80%]'}>
        <h2 className='text-xl pl-4 text-gray-500 font-bold mb-3'>Clients</h2>
        <ClientDetail
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          imagenPreview={imagenPreview}
          setImagenPreview={setImagenPreview}
          editable={editable}
          setEditable={setEditable}
          saveChange={saveChange}
          toast={showToast}
        />
        <InputSearch onSearch={handleSearchInClients} />
        <ClientTable onClientSelected={handleClientSelect} data={search !== '' ? search : clients} />
      </Modal>
    </>
  )
}

export default WithAuthentication(['stylist', 'admin'])(ClientList)
