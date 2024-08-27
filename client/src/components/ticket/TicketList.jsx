/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useContext, lazy } from 'react'
import { customContext } from '../context/CustomContext'
import { createTicket } from '../../firebase/firebase.js'
import WithAuthentication from '../utils/WithAuthentication.jsx'
const Modal = lazy(() => import('../utils/Modal.jsx'))
const ButtonDefault = lazy(() => import('../utils/ButtonDefault.jsx'))
const TicketDetail = lazy(() => import('./TicketDetail.jsx'))
const TicketPayment = lazy(() => import('./TicketPayment.jsx'))

const TicketList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { selectedClient, navigate, ticket, setTicket, showToast, fetchFromDatabase } = useContext(customContext)

  useEffect(() => {
    if (selectedClient.id === '') return navigate(-1)
  }, [])

  const saveData = async (data) => {
    if (data.amount === '') data.amount = ticket.totalPayment
    ticket.partialPayments.push(data)
    ticket.customerId = selectedClient.id
    const res = await createTicket(ticket)
    if (res.code >= 400) return showToast('Problemas con el Ticket', res.code)
    setTicket('')
    navigate(-1)
    showToast('Ticket Creado', res.code)
    await fetchFromDatabase()
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
      <Modal type={2} className={'sm:h-[75%] md:h-[78%] md:top-[3%] lg:top-[5%] lg:h-[75%] xl:!top-[3%] xl:!h-[75%] xxl:!h-[78%] xxxl:!h-[75%]'}>
        <div className=' z-50'>
          <h2 className='text-xl pl-4 text-gray-500 font-bold my-2'>{selectedClient.firstName + ' ' + selectedClient.lastName}</h2>
          <TicketDetail ticket={ticket} setTicket={setTicket} />
          <div className=' my-2 flex'>
            <ButtonDefault title='Cancelar' onClick={cancelTicket} />
            <ButtonDefault title='Continuar' onClick={showModal} />
          </div>
        </div>
      </Modal>
      <TicketPayment isOpen={isModalOpen} onClose={showModal} saveData={saveData} totalPayment={ticket.totalPayment} />
    </>
  )
}
export default WithAuthentication(['admin'])(TicketList)
