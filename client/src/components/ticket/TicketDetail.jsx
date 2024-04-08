/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import InputSelect from '../utils/InputSelect.jsx'

import TicketTable from './TicketTable.jsx'
import { getEmployee, getPaymentsMethod, getProducts, getServices } from '../../firebase/firebase.js'
import TicketPayment from './TicketPayment.jsx'
import ToggleSwitch from '../utils/ToggleSwitch.jsx'

const TicketDetail = ({ ticket, setTicket }) => {
  const [employees, setEmployees] = useState([])
  const [paymentMethod, setPaymentMethod] = useState([])
  const [allServices, setAllServices] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [dataTable, setDataTable] = useState([])
  const [itemSelected, setItemSelected] = useState('')
  const [toggleState, setToggleState] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchFromDatabase = async () => {
      try {
        const allEmployee = await getEmployee()
        setEmployees(allEmployee)
        const methods = await getPaymentsMethod()
        setPaymentMethod(methods)
        const services = await getServices()
        setAllServices(services)
        const products = await getProducts()
        setAllProducts(products)
        setDataTable(services)
      } catch (error) {
        throw new Error(`error getting data`, error)
      }
    }
    fetchFromDatabase()
  }, [])

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    if (name === 'paymentMethod') ticket.partialPayments[0].paymentMethod = value
    setTicket({ ...ticket, [name]: value })
  }

  const handleToggleChange = (e) => {
    setToggleState(e.target.checked)
    const newData = e.target.checked ? allProducts : allServices
    setDataTable(newData)
  }

  const saveData = async (data) => {
    const item = {
      itemId: itemSelected.id,
      itemType: toggleState ? 'product' : 'service',
      quantity: data.quantity,
      itemPrice: data.itemPrice,
    }
    ticket.items.push(item)
  }
  const showModal = async () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <div className='flex mb-1 border-solid border-2 border-gray-200'>
        <div className='h-[50%]'>
          <div className=' p-4 rounded-md'>
            <div className='mb-2'>
              <label className='block text-xs font-semibold text-gray-600'>
                Empleado:
                <select name='employeeId' onChange={handleFieldChange} className='w-full px-2 py-1 text-sm border rounded-md'>
                  <option value=''>Seleccione</option>
                  {employees.map((option) => (
                    <option key={option.id} value={option.id}>
                      {`${option.firstName} ${option.lastName}`}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className='flex m-auto'>
              <div className='block w-[50%]'>
                <ToggleSwitch label={'Productos / Servicios'} toggleState={toggleState} handleToggleChange={handleToggleChange} />
              </div>
              <InputSelect label={'Metodo de Pago'} name={'paymentMethod'} editable itemOption={paymentMethod} handleFieldChange={handleFieldChange} />
            </div>
            {dataTable.length > 0 && <TicketTable data={dataTable} onItemSelected={setItemSelected} openModal={showModal} />}
          </div>
        </div>
      </div>
      <TicketPayment isOpen={isModalOpen} onClose={showModal} saveData={saveData} name={itemSelected.name} />
    </>
  )
}

export default TicketDetail
