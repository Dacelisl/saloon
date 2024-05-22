/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, useContext } from 'react'
import { customContext } from '../context/CustomContext'
import { createTicket } from '../../firebase/firebase.js'
import { WithAuthentication, TicketDetail, TicketPayment, ButtonDefault, Modal } from '../imports.js'

const TicketList = () => {
  const { selectedClient, navigate, ticket, setTicket, showToast } = useContext(customContext)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const saveData = async (data) => {
    if (data.amount === '') data.amount = ticket.totalPayment
    ticket.partialPayments.push(data)
    ticket.customerId = selectedClient.id
    const res = await createTicket(ticket)
    if (res.code >= 400) return showToast('Problemas con el Ticket', res.code)
    setTicket('')
    navigate(-1)
    showToast('Ticket Creado', res.code)

    return res
  }
  const cancelTicket = async () => {
    setTicket('')
    navigate(-1)
  }
  const showModal = async () => {
    if (ticket.employeeId != '' && ticket.items.length > 0) {
      setIsModalOpen(!isModalOpen)
    } else {
      showToast('Falta Informacion', 500)
    }
  }
  return (
    <>
      <Modal type={2}>
        <div className=' z-50'>
          <h2 className='text-xl pl-4 text-gray-500 font-bold mb-1'>{selectedClient.firstName + ' ' + selectedClient.lastName}</h2>
          <TicketDetail ticket={ticket} setTicket={setTicket} />
          <div className=' my-2 flex'>
            <ButtonDefault title='Cancel' onClick={cancelTicket} />
            <ButtonDefault title='Continuar' onClick={showModal} />
          </div>
        </div>
      </Modal>
      <TicketPayment isOpen={isModalOpen} onClose={showModal} saveData={saveData} totalPayment={ticket.totalPayment} />
    </>
  )
}
export default WithAuthentication(['admin'])(TicketList)
