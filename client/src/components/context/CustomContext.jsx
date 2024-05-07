/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, lazy } from 'react'
import { getClients, getTickets, getEmployee, getProducts, getServices, getPaymentsMethod, getRoles } from '../../firebase/firebase'
import { useNavigate, useLocation } from 'react-router-dom'
const Toast = lazy(() => import('../utils/Toast'))

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
  const [ticket, setTicket] = useState(ticketDefault)
  const [toastMessage, setToastMessage] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fetchFromDatabase = async () => {
      try {
        const allClients = await getClients()
        const allTickets = await getTickets()
        const method = await getPaymentsMethod()
        const allEmployee = await getEmployee()
        const services = await getServices()
        const products = await getProducts()
        const rols = await getRoles()

        setRoles(rols)
        setEmployees(allEmployee)
        setAllServices(services)
        setAllProducts(products)
        setClients(allClients)
        setTickets(allTickets)
        setPaymentMethods(method)
      } catch (error) {
        throw new Error(`error getting data`, error)
      }
    }
    fetchFromDatabase()
  }, [])

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
      }}
    >
      {children}
      {toastMessage && <Toast message={toastMessage.message} code={toastMessage.code} />}
    </customContext.Provider>
  )
}
export default CustomContext
