/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import HistoricalClientTable from './HistoricalClientTable'
import HistoricalClientDetail from './HistoricalClientDetail'
import { getTickets, getClients, updateTicket } from '../../../firebase/firebase.js'
import ButtonDefault from '../../utils/ButtonDefault.jsx'
import FloatingDots from '../../utils/FloatingDots'
import MovingDots from '../../utils/MovingDots'
import HistoricalClientCredit from './HistoricalClientCredit.jsx'

const defaultClient = {
  firstName: '',
  lastName: '',
  dni: '',
  phone: '',
  address: '',
  email: '',
  thumbnail: '',
  code: '',
}

const HistoricalClientList = () => {
  const [clients, setClients] = useState([])
  const [tickets, setTickets] = useState([])
  const [selectedClient, setSelectedClient] = useState(defaultClient)
  const [selectedTicket, setSelectedTicket] = useState('')
  const [selectedClientId, setSelectedClientId] = useState('')
  const [isModalCreditOpen, setIsModalCreditOpen] = useState(false)

  const [imagenPreview, setImagenPreview] = useState('')

  useEffect(() => {
    const fetchFromDatabase = async () => {
      try {
        const allClients = await getClients()
        const allTickets = await getTickets()
        setTickets(allTickets)
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
  }, [clients, selectedClientId, tickets])

  const handleClientSelect = (ticket) => {
    setSelectedTicket(ticket)
    setSelectedClientId(ticket.customer.id)
  }

  const saveData = async (data) => {
    await updateTicket(selectedTicket, data)
    const allTickets = await getTickets()
    setTickets(allTickets)
  }
  const openModal = async () => {
    setIsModalCreditOpen(true)
  }
  const handleCloseCreditModal = async () => {
    setIsModalCreditOpen(false)
  }

  return (
    <>
      <div className=' fixed inset-0 flex items-center top-[-5%] md:top-0 justify-center bg-secondary-dark backdrop-blur-xl  bg-opacity-75'>
        <MovingDots number={4} />
        <FloatingDots number={3} />
        <div className='z-10 bg-primary-light  p-4 max-w-fit  sm:w-[90%] mx-auto rounded-lg shadow-sm shadow-slate-700'>
          <h2 className='text-xl pl-4 text-gray-500 font-bold mb-1'>{selectedClient.firstName + ' ' + selectedClient.lastName}</h2>
          <HistoricalClientDetail selectedClient={selectedClient} ticket={selectedTicket} imagenPreview={imagenPreview} />
          <HistoricalClientTable onClientSelected={handleClientSelect} data={tickets} />
          <div className='flex mt-2'>{selectedTicket.balanceDue > 0 ? <ButtonDefault title='Abonar' onClick={openModal} /> : <span className=' mt-6'></span>}</div>
        </div>
      </div>
      <HistoricalClientCredit isOpen={isModalCreditOpen} onClose={handleCloseCreditModal} saveData={saveData} />
    </>
  )
}

export default HistoricalClientList
