/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, lazy } from 'react'
import { getEarningsEmployeeById, getEarningsEmployees } from '../../firebase/firebase.js'
import { getStartOfWeek, getEndOfWeek, getStartOfMonth, getEndOfMonth, formatDate } from '../../utils/utils.js'
import { customContext } from '../context/CustomContext.jsx'
import WithAuthentication from '../utils/WithAuthentication.jsx'
import InputSelect from '../utils/InputSelect.jsx'
import EarningsEmployeeTable from './EarningsEmployeeTable.jsx'
import EarningsCompanyTable from './EarningsCompanyTable.jsx'
const ButtonDefault = lazy(() => import('../utils/ButtonDefault.jsx'))
const ToggleSwitch = lazy(() => import('../utils/ToggleSwitch.jsx'))
const InputEdit = lazy(() => import('../utils/InputEdit.jsx'))
const Modal = lazy(() => import('../utils/Modal.jsx'))

const EarningsEmployee = () => {
  const { loggedEmployee, employees, showToast } = useContext(customContext)

  const [data, setData] = useState([])
  const [minDate, setMinDate] = useState('')
  const [maxDate, setMaxDate] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [allEarningsData, setAllEarningsData] = useState([])
  const [filteredEmployee, setFilteredEmployee] = useState(loggedEmployee)
  const [toggleState, setToggleState] = useState(true)

  const startOfWeek = getStartOfWeek()
  const endOfWeek = getEndOfWeek()
  const startOfMonth = getStartOfMonth()
  const endOfMonth = getEndOfMonth()

  useEffect(() => {
    const loadData = async () => {
      const selected = await getEarningsEmployeeById(filteredEmployee.id)
      const allEarnings = await getEarningsEmployees()
      setAllEarningsData(allEarnings.payload)
      if (selected.code === 200) {
        const sortedData = selected.payload.sort((a, b) => new Date(b.date) - new Date(a.date))
        setMinDate(sortedData.length > 0 ? sortedData[0].date : '')
        setMaxDate(sortedData.length > 0 ? sortedData[sortedData.length - 1].date : '')
        setData(sortedData)
        setFilteredData(sortedData)
      }
    }
    loadData()
  }, [filteredEmployee])

  const groupByDateAndEmployee = (data) => {
    const groupedData = data.reduce((acc, entry) => {
      const { date, employee, id } = entry
      if (!acc[id]) {
        acc[id] = {
          id,
          date,
          employee,
          totalEarnings: 0,
          totalEarningsCompany: 0,
        }
      }
      acc[id].totalEarnings += entry.totalEarnings
      acc[id].totalEarningsCompany += entry.totalEarningsCompany
      return acc
    }, {})

    return Object.values(groupedData)
  }

  const handleDateChange = ({ target: { name, value } }) => {
    if (name === 'employeeId') {
      const employee = employees.find((user) => user.id === value)
      if (employee) setFilteredEmployee(employee)
    }
    if (name === 'minDate') setMinDate(value)
    if (name === 'maxDate') setMaxDate(value)
  }

  const filterDataByDate = () => {
    if (minDate && maxDate) {
      if (minDate <= maxDate) {
        const filtered = data.filter((item) => item.date >= minDate && item.date <= maxDate)
        setFilteredData(filtered)
      } else {
        showToast('Las fechas exceden el rango disponible', 500)
      }
    }
  }

  const filterByPeriod = (startDate, endDate) => {
    const filtered = data.filter((item) => item.date >= startDate && item.date <= endDate)
    setFilteredData(filtered)
  }

  const handleToggleChange = (e) => {
    setToggleState(e.target.checked)
    const newData = e.target.checked ? data : groupByDateAndEmployee(allEarningsData)
    setFilteredData(newData)
  }

  const handleClickAll = () => setFilteredData(data)
  const handleClickToday = () => filterByPeriod(formatDate(new Date()), formatDate(new Date()))
  const handleClickWeek = () => filterByPeriod(startOfWeek, endOfWeek)
  const handleClickMonth = () => filterByPeriod(startOfMonth, endOfMonth)

  return (
    <Modal type={2} className={'!py-6 px-1 md:h-[85%] md:top-[3%] lg:top-[5%] lg:h-[88%] xl:!top-[3%] xl:!h-[85%] xl:max-w-2xl xl:!w-full xxl:max-w-4xl xxl:!h-[90%]'}>
      <div>
        <div className='inline-flex mb-3'>
          {loggedEmployee.role === 'admin' && (
            <span className='!ml-5'>
              <ToggleSwitch label={`${toggleState ? 'Empleado' : 'Empresa'}`} toggleState={toggleState} handleToggleChange={handleToggleChange} />
            </span>
          )}
          <span className='flex my-auto max-h-fit'>
            <ButtonDefault title='Todo' onClick={handleClickAll} color={'!w-fit !py-0 !px-1 !ml-3 !mr-1'} />
            <ButtonDefault title='Semana' onClick={handleClickWeek} color={'!w-fit !py-0 !px-1 !mx-1'} />
            <ButtonDefault title='Mes' onClick={handleClickMonth} color={'!w-fit !py-0 !px-1 !mx-1'} />
            <ButtonDefault title='Hoy' onClick={handleClickToday} color={'!w-fit !py-0 !px-1 !mx-1'} />
          </span>
        </div>
        <div className='block'>
          <div className='block ml-5 my-1 xl:flex xl:w-[90%]'>
            {loggedEmployee.role === 'admin' && (
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
            )}
            <InputEdit labelName={'Fecha Inicio'} edit value={minDate} onChange={handleDateChange} type={'date'} name={'minDate'} className='flex' />
            <span className='xl:ml-3'>
              <InputEdit labelName={'Fecha Fin'} edit value={maxDate} onChange={handleDateChange} type={'date'} name={'maxDate'} />
            </span>
            <ButtonDefault title='Filtrar' onClick={filterDataByDate} color={'h-fit self-center mx-auto mt-3 xl:ml-3'} />
          </div>
        </div>
      </div>

      {toggleState ? <EarningsEmployeeTable data={filteredData} /> : <EarningsCompanyTable data={filteredData} />}
    </Modal>
  )
}

export default WithAuthentication(['stylist', 'admin', 'auxiliary'])(EarningsEmployee)
