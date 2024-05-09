/* eslint-disable react/prop-types */
import { useState, useEffect, useContext, lazy } from 'react'
import { customContext } from '../../context/CustomContext.jsx'
import { updateTicket } from '../../../firebase/firebase.js'
const HistoricalClientTable = lazy(() => import('./HistoricalClientTable'))
const HistoricalClientDetail = lazy(() => import('./HistoricalClientDetail'))
const ButtonDefault = lazy(() => import('../../utils/ButtonDefault.jsx'))
const Modal = lazy(() => import('../../utils/Modal.jsx'))
const HistoricalClientCredit = lazy(() => import('./HistoricalClientCredit.jsx'))

const HistoricalClientList = () => {
  const { tickets, selectedClient, fetchFromDatabase, showToast } = useContext(customContext)

  const [selectedTicket, setSelectedTicket] = useState('')
  const [ticketsClient, setTicketsClient] = useState('')
  const [isModalCreditOpen, setIsModalCreditOpen] = useState(false)

  useEffect(() => {
    const selected = tickets.filter((ticket) => ticket.customer.id === selectedClient.id)
    setTicketsClient(selected)
  }, [selectedClient, tickets])

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket)
  }

  const saveData = async (data) => {
    const res = await updateTicket(selectedTicket, data)
    await fetchFromDatabase()
    if (res.code > 200) return showToast('Problemas con el pago', res.code)
    showToast('Pago realizado', res.code)
  }
  const openModal = async () => {
    setIsModalCreditOpen(true)
  }
  const handleCloseCreditModal = async () => {
    setIsModalCreditOpen(false)
  }

  return (
    <>
      <Modal type={2} className={'h-3/4 !pb-2 md:h-[90%] xl:w-[70%] xl:h-fit xxl:w-auto xxxl:w-[60%] overflow-auto'}>
        <h2 className='text-xl pl-4 text-gray-500 font-bold mb-1'>{selectedClient.firstName + ' ' + selectedClient.lastName}</h2>
        <HistoricalClientDetail selectedClient={selectedClient} ticket={selectedTicket} />
        <HistoricalClientTable onClientSelected={handleTicketSelect} data={ticketsClient} />
        <div className='flex my-2'>{selectedTicket.balanceDue > 0 ? <ButtonDefault title='Abonar' onClick={openModal} /> : <span className=' mt-6'></span>}</div>
      </Modal>
      <HistoricalClientCredit isOpen={isModalCreditOpen} onClose={handleCloseCreditModal} saveData={saveData} balanceDue={selectedTicket.balanceDue} />
    </>
  )
}

export default HistoricalClientList
