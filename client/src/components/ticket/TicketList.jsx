/* eslint-disable react/prop-types */
import { useState } from 'react'
import TicketDetail from '../ticket/TicketDetail'
import TicketPayment from '../ticket/TicketPayment.jsx'
import ButtonDefault from '../utils/ButtonDefault.jsx'
import Modal from '../utils/Modal.jsx'
import { createTicket } from '../../firebase/firebase.js'

const defaultClient = {
  id: '660cba4b8ace03583c01e741',
  firstName: 'Maria',
  lastName: 'Porochenko',
  dni: 1292090277,
  phone: '+57 2227858147',
  address: 'calle falsa 123',
  email: 'newMaria@gmail.com',
}
const ticketDefault = {
  customerId: '660cba4b8ace03583c01e741',
  employeeId: '',
  totalPayment: '',
  partialPayments: [],
  items: [],
}

const TicketList = () => {
  const [selectedClient, setSelectedClient] = useState(defaultClient)
  const [ticket, setTicket] = useState(ticketDefault)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const saveData = async (data) => {
    if (data.amount === '') data.amount = ticket.totalPayment
    ticket.partialPayments.push(data)
    const res = await createTicket(ticket)
    if (res.code === 201) {
      console.log('todo funciono ok')
    }
  }
  const showModal = async () => {
    if (ticket.employeeId != '' && ticket.items.length > 0) {
      setIsModalOpen(!isModalOpen)
    }
    console.log('ingrese datos faltantes')
  }
  return (
    <>
      <Modal type={2}>
        <div className=' z-50'>
          <h2 className='text-xl pl-4 text-gray-500 font-bold mb-1'>{selectedClient.firstName + ' ' + selectedClient.lastName}</h2>
          <TicketDetail ticket={ticket} setTicket={setTicket} />
          <div className=' my-2 flex'>
            <ButtonDefault title='Cancel' />
            <ButtonDefault title='Continuar' onClick={showModal} />
          </div>
        </div>
      </Modal>
      <TicketPayment isOpen={isModalOpen} onClose={showModal} saveData={saveData} totalPayment={ticket.totalPayment} />
    </>
  )
}

export default TicketList
