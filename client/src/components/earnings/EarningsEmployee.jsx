/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useContext, lazy } from 'react'
import { customContext } from '../context/CustomContext.jsx'
import { getEarningsEmployeeById } from '../../firebase/firebase.js'
import { getStartOfWeek, getEndOfWeek, getStartOfMonth, getEndOfMonth, formatDate } from '../../utils/utils.js'

const ButtonDefault = lazy(() => import('../utils/ButtonDefault.jsx'))
const InputEdit = lazy(() => import('../utils/InputEdit.jsx'))
const Modal = lazy(() => import('../utils/Modal.jsx'))

const EarningsEmployee = () => {
  const { selectedEmployee, showToast } = useContext(customContext)

  const [data, setData] = useState([])
  const [minData, setMinData] = useState('')
  const [minDate, setMinDate] = useState('')
  const [maxData, setMaxData] = useState('')
  const [maxDate, setMaxDate] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const startOfWeek = getStartOfWeek()
  const endOfWeek = getEndOfWeek()
  const startOfMonth = getStartOfMonth()
  const endOfMonth = getEndOfMonth()

  useEffect(() => {
    async function loadData() {
      const selected = await getEarningsEmployeeById(selectedEmployee.id)
      const sortedData = selected.sort((a, b) => new Date(a.date) - new Date(b.date))
      const minDate = sortedData.length > 0 ? sortedData[0].date : null
      const maxDate = sortedData.length > 0 ? sortedData[sortedData.length - 1].date : null
      setMinData(minDate)
      setMaxData(maxDate)
      setData(selected)
      setFilteredData(selected)
    }
    loadData()
  }, [])

  const handleDateChange = (e) => {
    const { name, value } = e.target
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
    <Modal type={2} className={'h-3/4 !pb-2  md:h-[90%] xl:w-[80%] xl:h-fit xxl:w-[90%] xxxl:w-[70%] overflow-auto'}>
      <div>
        <div className='inline-flex mb-3 '>
          <ButtonDefault title='Todo' onClick={handleClickAll} color={'!w-fit !py-0 !px-1 !ml-5 !mr-3'} />
          <ButtonDefault title='Semana' onClick={handleClickWeek} color={'!w-fit !py-0 !px-1 !mx-2'} />
          <ButtonDefault title='Mes' onClick={handleClickMount} color={'!w-fit !py-0 !px-1 !mx-2'} />
          <ButtonDefault title='Hoy' onClick={handleClickToday} color={'!w-fit !py-0 !px-1 !mx-2'} />
        </div>
        <div className='flex'>
          <div className='inline-flex ml-5 mt-1 '>
            <InputEdit labelName={'Fecha Inicio'} edit value={minDate} onChange={handleDateChange} type={'date'} name={'minDate'} className='' />
            <InputEdit labelName={'Fecha Fin'} edit value={maxDate} onChange={handleDateChange} type={'date'} name={'maxDate'} className=' ml-3' />
            <ButtonDefault title='Filtrar' onClick={handleClick} color={'h-fit self-center mt-3 ml-5'} />
          </div>
        </div>
      </div>

      <div className=' block px-4 pt-2 pb-4 rounded-md'>
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
                    <td className='pl-1'>{detail.serviceOrProduct}</td>
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

export default EarningsEmployee
