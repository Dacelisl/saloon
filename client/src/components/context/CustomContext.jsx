/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, lazy } from 'react'
import { getClients, getTickets, getEmployee, getProducts, getServices, getPaymentsMethod, getRoles, getEmployeeByEmail } from '../../firebase/firebase'
import { getUpcomingBirthdays } from '../../utils/utils'
import { useNavigate, useLocation } from 'react-router-dom'
const Toast = lazy(() => import('../utils/Toast'))
import { auth } from '../../firebase/firebaseApp'

export const customContext = createContext()

const CustomContext = ({ children }) => {
  const defaultClientList = {
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    address: '',
    email: '',
    dateBirthday: '',
    firstDate: '',
    lastDate: '',
    thumbnail: '',
    code: '',
  }
  const defaultClientRegister = {
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    address: '',
    email: '',
    dateBirthday: '',
    thumbnail: '',
  }
  const ticketDefault = {
    customerId: '',
    employeeId: '',
    totalPayment: '',
    partialPayments: [],
    items: [],
  }
  const employeeDefault = {
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    address: '',
    email: '',
    dateBirthday: '',
    thumbnail: '',
    role: '',
    password: '',
  }
  const employeeDefaultList = {
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    address: '',
    email: '',
    dateBirthday: '',
    thumbnail: '',
    role: '',
    lastConnection: '',
  }

  const [clients, setClients] = useState([])
  const [tickets, setTickets] = useState([])
  const [employees, setEmployees] = useState([])
  const [allServices, setAllServices] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [roles, setRoles] = useState([])

  const [paymentMethods, setPaymentMethods] = useState([])
  const [selectedClient, setSelectedClient] = useState(defaultClientList)
  const [selectedEmployee, setSelectedEmployee] = useState(employeeDefaultList)
  const [userLogin, setUserLogin] = useState('')
  const [ticket, setTicket] = useState(ticketDefault)
  const [nextBirthDay, setNextBirthDay] = useState('')
  const [toastMessage, setToastMessage] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('usuario registrado', user)
      if (user) {
        setUserLogin(user.email)
      }
    })
    return unsubscribe
  }, [])

  const fetchFromDatabase = async () => {
    try {
      const allEmployee = await getEmployee()
      const allClients = await getClients()
      const allTickets = await getTickets()
      const method = await getPaymentsMethod()
      const services = await getServices()
      const products = await getProducts()
      const rols = await getRoles()

      setEmployees(allEmployee)
      setRoles(rols)
      setAllServices(services)
      setAllProducts(products)
      setClients(allClients)
      setTickets(allTickets)
      setPaymentMethods(method)
    } catch (error) {
      console.log('error en el efect 1', error)
      throw new Error(`Error getting data: ${error}`)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userLogin) return
        const employee = await getEmployeeByEmail(userLogin)
        console.log('employee login', employee)
        setSelectedEmployee(employee)
      } catch (error) {
        console.log('error en el efect 2', error)
        throw new Error(`Error getting data: ${error}`)
      }
    }
    fetchData()
  }, [userLogin])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchFromDatabase()
      } catch (error) {
        throw new Error(`Error getting data: ${error}`)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const birthday = getUpcomingBirthdays(clients)
    setNextBirthDay(birthday)
  }, [clients])

  const handleSearch = (searchTerm, data) => {
    if (searchTerm === '') return data
    const filteredData = data.filter((item) => Object.values(item).some((value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())))
    return filteredData
  }

  const showToast = (message, code) => {
    setToastMessage({ message, code })
    setTimeout(() => {
      setToastMessage(null)
    }, 10000)
  }

  return (
    <customContext.Provider
      value={{
        fetchFromDatabase,
        defaultClientList,
        defaultClientRegister,
        employeeDefault,
        employeeDefaultList,
        ticketDefault,
        clients,
        roles,
        setClients,
        tickets,
        setTickets,
        selectedClient,
        setSelectedClient,
        selectedEmployee,
        setSelectedEmployee,
        employees,
        setEmployees,
        allProducts,
        allServices,
        handleSearch,
        paymentMethods,
        navigate,
        location,
        showToast,
        ticket,
        setTicket,
        nextBirthDay,
      }}
    >
      {children}
      {toastMessage && <Toast message={toastMessage.message} code={toastMessage.code} />}
    </customContext.Provider>
  )
}
export default CustomContext
