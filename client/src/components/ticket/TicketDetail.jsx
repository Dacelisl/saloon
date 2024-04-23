/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import TicketTable from './TicketTable.jsx'
import { getEmployee, getProducts, getServices } from '../../firebase/firebase.js'
import ItemPayment from './ItemPayment.jsx'
import ToggleSwitch from '../utils/ToggleSwitch.jsx'
import { totalPrice } from '../../utils/utils.js'

const TicketDetail = ({ ticket, setTicket }) => {
  const [employees, setEmployees] = useState([])
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
      name: itemSelected.name,
      itemType: toggleState ? 'product' : 'service',
      quantity: data.quantity,
      itemPrice: data.itemPrice,
    }
    ticket.items.push(item)
    setTicket(totalPrice(ticket))
  }
  const deleteItem = async (id) => {
    const filteredItems = ticket.items.filter((item) => item.itemId !== id)
    setTicket({ ...ticket, items: filteredItems, totalPayment: calculateTotal(filteredItems) })
  }
  const calculateTotal = (data) => {
    let total = 0
    data.forEach((item) => {
      total += item.itemPrice * item.quantity
    })
    return total
  }
  const showModal = async () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <div className='block mb-1 border-solid border-2 border-gray-200'>
        {ticket.items?.length > 0 ? (
          <div className=' h-[30%]  block p-4 rounded-md'>
            <div className='text-justify border-double border-2 border-gray-200 '>
              <ul className='text-justify text-sm'>
                {ticket.items.map((item) => (
                  <li className='flex justify-between border-solid border-b-2 border-gray-200 ' key={item.itemId}>
                    <span className='w-[55%] pl-1'>{item.name}</span>
                    <span className='w-[10%] text-center'>{item.quantity}</span>
                    <span className='w-[30%] text-right pr-3'>$ {item.itemPrice}</span>
                    <span className='w-[5%] text-right pr-1 text-xs pt-[2px] font-semibold cursor-pointer hover:text-stone-400' onClick={() => deleteItem(item.itemId)}>
                      {'X'}
                    </span>
                  </li>
                ))}
                <br />{' '}
                <li className='flex bg-secondary-light justify-between text-base  border-solid border-b-2 border-gray-200 '>
                  <span className='w-[50%] text-left pl-1'>Total a Pagar: </span>
                  <span className='w-[50%] text-right pr-6'>$ {ticket.totalPayment}</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          ''
        )}
        <div className='h-[70%] block'>
          <div className=' p-4 rounded-md'>
            <div className='flex m-auto'>
              <div className='pb-4 xl:relative xxl:m-auto'>
                <label className='block text-xs font-semibold text-gray-600'>
                  Empleado:
                  <select name='employeeId' onChange={handleFieldChange} className='w-full px-1 h-8 text-sm border rounded-md'>
                    <option value=''>Seleccione</option>
                    {employees.map((option) => (
                      <option key={option.id} value={option.id}>
                        {`${option.firstName} ${option.lastName}`}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className='block ml-5 sm:w-[47%] xl:relative xxl:m-auto xl:w-auto'>
                <ToggleSwitch label={'Productos / Servicios'} toggleState={toggleState} handleToggleChange={handleToggleChange} />
              </div>
            </div>
            {dataTable.length > 0 && <TicketTable data={dataTable} onItemSelected={setItemSelected} openModal={showModal} />}
          </div>
        </div>
      </div>
      <ItemPayment isOpen={isModalOpen} onClose={showModal} saveData={saveData} item={itemSelected} />
    </>
  )
}

export default TicketDetail
