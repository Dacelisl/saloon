/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react'
import { customContext } from '../../context/CustomContext.jsx'
import { updateTicket } from '../../../firebase/firebase.js'
import { WithAuthentication, HistoricalClientDetail, HistoricalClientTable, ButtonDefault, Modal, HistoricalClientCredit } from '../../imports.js'

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
      <Modal type={2} className={'!py-6 xl:!top-[3%] xl:!h-[80%]'}>
        <div className='h-[45%]'>
          <h2 className='text-xl pl-4 text-gray-500 font-bold mb-1'>{selectedClient.firstName + ' ' + selectedClient.lastName}</h2>
          <HistoricalClientDetail selectedClient={selectedClient} ticket={selectedTicket} />
        </div>
        <div className='mt-10 h-[50%]'>
          <HistoricalClientTable onClientSelected={handleTicketSelect} data={ticketsClient} />
        </div>
          <div className='flex mt-1 -mb-2'>{selectedTicket.balanceDue > 0 ? <ButtonDefault title='Abonar' onClick={openModal} /> : <span className=' mt-6'></span>}</div>
      </Modal>
      <HistoricalClientCredit isOpen={isModalCreditOpen} onClose={handleCloseCreditModal} saveData={saveData} balanceDue={selectedTicket.balanceDue} />
    </>
  )
}

export default WithAuthentication(['stylist', 'admin'])(HistoricalClientList)
