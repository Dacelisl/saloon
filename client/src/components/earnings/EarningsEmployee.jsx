/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, lazy } from 'react'
import { getEarningsEmployeeById } from '../../firebase/firebase.js'
import { getStartOfWeek, getEndOfWeek, getStartOfMonth, getEndOfMonth, formatDate } from '../../utils/utils.js'
import { customContext } from '../context/CustomContext.jsx'
import WithAuthentication from '../utils/WithAuthentication.jsx'
import InputSelect from '../utils/InputSelect.jsx'
const ButtonDefault = lazy(() => import('../utils/ButtonDefault.jsx'))
const InputEdit = lazy(() => import('../utils/InputEdit.jsx'))
const Modal = lazy(() => import('../utils/Modal.jsx'))

const EarningsEmployee = () => {
  const { loggedEmployee, employees, showToast } = useContext(customContext)

  const [data, setData] = useState([])
  const [minData, setMinData] = useState('')
  const [minDate, setMinDate] = useState('')
  const [maxData, setMaxData] = useState('')
  const [maxDate, setMaxDate] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [filteredEmployee, setFilteredEmployee] = useState(loggedEmployee)

  const startOfWeek = getStartOfWeek()
  const endOfWeek = getEndOfWeek()
  const startOfMonth = getStartOfMonth()
  const endOfMonth = getEndOfMonth()

  useEffect(() => {
    async function loadData() {
      const selected = await getEarningsEmployeeById(filteredEmployee.id)
      const sortedData = selected.sort((a, b) => new Date(b.date) - new Date(a.date))
      const minDate = sortedData.length > 0 ? sortedData[0].date : null
      const maxDate = sortedData.length > 0 ? sortedData[sortedData.length - 1].date : null
      const filter = employees.filter((user) => {
        return user.id === filteredEmployee.id
      })
      setFilteredEmployee(filter[0])
      setMinData(minDate)
      setMaxData(maxDate)
      setData(selected)
      setFilteredData(selected)
    }
    loadData()
  }, [filteredEmployee])

  const handleDateChange = (e) => {
    const { name, value } = e.target
    if (name === 'employeeId') {
      const filter = employees.filter((user) => {
        return user.id === value
      })
      setFilteredEmployee(filter[0])
    }
    if (name === 'minDate') {
      setMinDate(value)
    } else if (name === 'maxDate') {
      setMaxDate(value)
    }
  }
  const handleClick = () => {
    if (minDate && maxDate) {
      if (minDate >= minData && maxDate <= maxData) {
        const filtered = data.filter((item) => {
          return item.date >= minDate && item.date <= maxDate
        })
        setFilteredData(filtered)
      } else {
        showToast('Las fechas exeden el origen', 500)
      }
    }
  }
  const handleClickAll = () => {
    setFilteredData(data)
  }
  const handleClickToday = () => {
    const currentDate = new Date()
    const currentDateFormat = formatDate(currentDate)
    const filtered = data.filter((item) => {
      return item.date === currentDateFormat
    })
    setFilteredData(filtered)
  }
  const handleClickWeek = () => {
    const filtered = data.filter((item) => {
      return item.date >= startOfWeek && item.date <= endOfWeek
    })
    setFilteredData(filtered)
  }
  const handleClickMount = () => {
    const filtered = data.filter((item) => {
      return item.date >= startOfMonth && item.date <= endOfMonth
    })
    setFilteredData(filtered)
  }
  const formatCurrency = () => {
    const amount = filteredData.reduce((total, earning) => total + parseFloat(earning.totalEarnings), 0).toFixed(2)
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount)
  }
  return (
    <Modal type={2} className={'!py-6 px-1 md:h-[85%] md:top-[3%] lg:top-[5%] lg:h-[88%] xl:!top-[3%] xl:!h-[85%] xl:max-w-2xl xl:!w-full xxl:max-w-4xl xxl:!h-[90%]'}>
      <div>
        <div className='inline-flex mb-3 '>
          <ButtonDefault title='Todo' onClick={handleClickAll} color={'!w-fit !py-0 !px-1 !ml-5 !mr-3'} />
          <ButtonDefault title='Semana' onClick={handleClickWeek} color={'!w-fit !py-0 !px-1 !mx-2'} />
          <ButtonDefault title='Mes' onClick={handleClickMount} color={'!w-fit !py-0 !px-1 !mx-2'} />
          <ButtonDefault title='Hoy' onClick={handleClickToday} color={'!w-fit !py-0 !px-1 !mx-2'} />
        </div>
        <div className='block'>
          <div className='block ml-5 my-1 xl:flex xl:w-[90%]'>
            {loggedEmployee.role === 'admin' ? (
              <span className='mr-3'>
                <InputSelect
                  label={'Empleado:'}
                  name={'employeeId'}
                  itemOption={employees}
                  itemValue={filteredEmployee.id}
                  handleFieldChange={handleDateChange}
                  optionValueKey='id'
                  optionDisplayKey='fullName'
                  editable
                  className='!h-8 '
                />
              </span>
            ) : (
              ''
            )}

            <InputEdit labelName={'Fecha Inicio'} edit value={minDate} onChange={handleDateChange} type={'date'} name={'minDate'} className='flex' />
            <span className='xl:ml-3'>
              <InputEdit labelName={'Fecha Fin'} edit value={maxDate} onChange={handleDateChange} type={'date'} name={'maxDate'} />
            </span>
            <ButtonDefault title='Filtrar' onClick={handleClick} color={'h-fit self-center mx-auto mt-3 xl:ml-3'} />
          </div>
        </div>
      </div>

      <div className='block w-full px-2 pt-2 pb-4 rounded-md'>
        <div className='text-justify border-double border-2 border-gray-200 overflow-x-auto'>
          <table className='w-full text-sm overflow-y-scroll'>
            <thead>
              <tr>
                <th className='w-[13%] pl-1'>Fecha</th>
                <th className='w-[11%] pl-1 text-center'>Ticket</th>
                <th className='w-[28%] text-center  pl-3'>Cliente</th>
                <th className='w-[29%] text-center  pl-1'>Servicio/Producto</th>
                <th className='w-[5%] '>Cantidad</th>
                <th className='w-[14%] text-right pr-3'>Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((earning, index) =>
                earning.earningsDetails.map((detail, idx) => (
                  <tr key={`${index}-${idx}`} className='border-solid border-b-2 border-gray-200'>
                    <td className='pl-1'>{earning.date}</td>
                    <td className='pl-1 text-center'>{detail.ticketNumber}</td>
                    <td className='pl-3'>{`${detail.customer.firstName} ${detail.customer.lastName}`}</td>
                    <td className='pl-1 text-center'>{detail.serviceOrProduct}</td>
                    <td className='text-center'>{detail.quantity}</td>
                    <td className='text-right pr-3'>{detail.totalCost}</td>
                  </tr>
                ))
              )}
              <tr className='w-full bg-secondary-light'>
                <td className='w-[80%] py-2 text-right pr-9 font-medium' colSpan={5}>
                  Total a Pagar:
                </td>
                <td className='w-[20%] py-2 text-right pr-3 font-medium'>{formatCurrency()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  )
}
export default WithAuthentication(['stylist', 'admin'])(EarningsEmployee)
