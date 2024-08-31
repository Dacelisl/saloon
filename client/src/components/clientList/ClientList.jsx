/* eslint-disable react-refresh/only-export-components */
import { useState, useContext, useEffect, lazy } from 'react'
import { customContext } from '../context/CustomContext.jsx'
import { updateClients } from '../../firebase/firebase.js'
import WithAuthentication from '../utils/WithAuthentication.jsx'
const InputSearch = lazy(() => import('../utils/InputSearch.jsx'))
const Modal = lazy(() => import('../utils/Modal.jsx'))
const ClientTable = lazy(() => import('./ClientTable.jsx'))
const ClientDetail = lazy(() => import('./ClientDetail.jsx'))

const ClientList = () => {
  const { clients, selectedClient, tickets, diagnostics, loggedEmployee, setSelectedClient, handleSearch, showToast, setSpinner, fetchFromDatabase } = useContext(customContext)

  const [search, setSearch] = useState('')
  const [imagenPreview, setImagenPreview] = useState('')
  const [editable, setEditable] = useState(false)
  const [showData, setShowData] = useState({ diagnostic: false, historical: false })

  useEffect(() => {
    const selected = clients.sort((a, b) => new Date(b.lastDate) - new Date(a.lastDate))
    if (selected.length > 0) {
      setSelectedClient(selected[0])
      setImagenPreview(selected[0]?.thumbnail)
    }
  }, [clients])

  useEffect(() => {
    const ticketFound = tickets.filter((ticket) => ticket.customer.id === selectedClient.id)
    const diagnosticFound = diagnostics.filter((data) => data.client.dni === selectedClient.dni)
    setShowData({ diagnostic: diagnosticFound.length > 0, historical: ticketFound.length > 0 })
  }, [diagnostics, selectedClient, tickets])

  const handleClientSelect = (clientId) => {
    setSelectedClient(clientId)
    setImagenPreview(clientId?.thumbnail || '')
  }

  const saveChange = async () => {
    setSpinner(false)
    const res = await updateClients(selectedClient)
    setEditable(false)
    await fetchFromDatabase()
    setSelectedClient('')
    setImagenPreview('')
    setSpinner(true)
    if (res.code !== 200) return showToast('Cambios NO Guardados ', res.code)
    showToast('Se guardaron los cambios ', res.code)
  }

  const handleSearchInClients = (searchTerm) => {
    setSearch(handleSearch(searchTerm, clients))
  }

  return (
    <>
      <Modal type={2} className={'!p-3 md:h-[85%] md:top-[3%] lg:top-[5%] lg:h-[88%] xl:top-[3%] xxl:h-[90%]'}>
        <h2 className='text-xl flex justify-center text-gray-500 font-bold mb-3'>Clientes</h2>
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
          showData={showData}
        />
        <InputSearch onSearch={handleSearchInClients} />
        <div className='h-[30%]'>
          <ClientTable onClientSelected={handleClientSelect} data={search !== '' ? search : clients} />
        </div>
      </Modal>
    </>
  )
}

export default WithAuthentication(['stylist', 'admin','auxiliary'])(ClientList)
