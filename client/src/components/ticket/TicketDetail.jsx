/* eslint-disable react/prop-types */
import { useState, useContext, lazy } from 'react'
import { customContext } from '../context/CustomContext'
import { totalPrice } from '../../utils/utils.js'
import InputSelect from '../utils/InputSelect.jsx'
const InputSearch = lazy(() => import('../utils/InputSearch.jsx'))
const ToggleSwitch = lazy(() => import('../utils/ToggleSwitch.jsx'))
const TicketTable = lazy(() => import('./TicketTable.jsx'))
const ItemPayment = lazy(() => import('./ItemPayment.jsx'))

const TicketDetail = ({ ticket, setTicket }) => {
  const { employees, allProducts, allServices, handleSearch } = useContext(customContext)

  const [dataTable, setDataTable] = useState(allServices)
  const [itemSelected, setItemSelected] = useState('')
  const [search, setSearch] = useState('')
  const [toggleState, setToggleState] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
  const handleSearchInClients = (searchTerm) => {
    const data = toggleState ? allProducts : allServices
    setSearch(searchTerm != '' ? handleSearch(searchTerm, data) : '')
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
              <InputSelect label={'Empleado'} name={'employeeId'} handleFieldChange={handleFieldChange} itemOption={employees} optionValueKey='id' optionDisplayKey='fullName' editable />
              <div className='block ml-5 sm:w-[47%] xl:relative xxl:m-auto xl:w-auto'>
                <ToggleSwitch label={'Productos / Servicios'} toggleState={toggleState} handleToggleChange={handleToggleChange} />
              </div>
            </div>
            <InputSearch onSearch={handleSearchInClients} />
            <div className='h-[30vh]'>{dataTable.length > 0 && <TicketTable data={search !== '' ? search : dataTable} onItemSelected={setItemSelected} openModal={showModal} />}</div>
          </div>
        </div>
      </div>
      <ItemPayment isOpen={isModalOpen} onClose={showModal} saveData={saveData} item={itemSelected} />
    </>
  )
}

export default TicketDetail
