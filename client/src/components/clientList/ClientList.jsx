/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, useContext } from 'react'
import { customContext } from '../context/CustomContext'
import { updateClients } from '../../firebase/firebase'
import { WithAuthentication, ClientTable, ClientDetail, InputSearch, Modal } from '../imports'

const ClientList = () => {
  const { clients, selectedClient, loggedEmployee, setSelectedClient, handleSearch, showToast, fetchFromDatabase } = useContext(customContext)

  const [search, setSearch] = useState('')
  const [imagenPreview, setImagenPreview] = useState('')
  const [editable, setEditable] = useState(false)

  const handleClientSelect = (clientId) => {
    setSelectedClient(clientId)
    setImagenPreview(clientId?.thumbnail || '')
  }

  const saveChange = async () => {
    const res = await updateClients(selectedClient)
    setEditable(false)
    await fetchFromDatabase()
    setSelectedClient('')
    setImagenPreview('')
    if (res.code !== 200) return showToast('Cambios NO Guardados ', res.code)
    showToast('Se guardaron los cambios ', res.code)
  }

  const handleSearchInClients = (searchTerm) => {
    setSearch(handleSearch(searchTerm, clients))
  }

  return (
    <>
      <Modal type={2} className={'!p-3 md:h-[85%] md:top-[3%] lg:top-[5%] lg:h-[88%] xl:top-[3%] xxl:h-[90%]'}>
        <h2 className='text-xl pl-4 text-gray-500 font-bold mb-3'>Clients</h2>
        <ClientDetail
          loggedEmployee={loggedEmployee}
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
        <div className='h-[30%]'>
          <ClientTable onClientSelected={handleClientSelect} data={search !== '' ? search : clients} />
        </div>
      </Modal>
    </>
  )
}

export default WithAuthentication(['stylist', 'admin'])(ClientList)
