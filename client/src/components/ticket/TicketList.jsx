/* eslint-disable react/prop-types */
import { useState } from 'react'
/* import ClientTable from './ClientTable' */
import TicketDetail from '../ticket/TicketDetail'
import ButtonDefault from '../utils/ButtonDefault.jsx'
import { now } from 'mongoose'

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
  customerId: '',
  employeeId: '',
  partialPayments: [
    {
      paymentDate: Date(now),
      paymentMethod: '',
      amount: '',
    },
  ],
  items: [],
}

const TicketList = () => {
  const [selectedClient, setSelectedClient] = useState(defaultClient)
  const [ticket, setTicket] = useState(ticketDefault)

  const handleClick = () => {
    setTicket({ ...ticket, ['customerId']:selectedClient.id  })
    console.log('data del ticket list', ticket)
  }

  return (
    <>
      <div className=' fixed inset-0 flex items-center top-[-5%] md:top-0 justify-center bg-secondary-dark backdrop-blur-xl  bg-opacity-75'>
        <div className='z-10 bg-primary-light  p-4 max-w-fit mx-auto rounded-lg shadow-sm shadow-slate-700'>
          <h2 className='text-xl pl-4 text-gray-500 font-bold mb-1'>{selectedClient.firstName + ' ' + selectedClient.lastName}</h2>
          <TicketDetail ticket={ticket} setTicket={setTicket} />
          <div className=' my-2 flex'>
            <ButtonDefault title='Save' onClick={handleClick} />
            <ButtonDefault title='Cancel' />
          </div>
        </div>
      </div>
    </>
  )
}

export default TicketList
