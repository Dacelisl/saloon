/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, lazy } from 'react'
import { getClients, getTickets, getEmployee, getProducts, getServices, getPaymentsMethod, getRoles, getCategories, getProviders, getEmployeeByEmail } from '../../firebase/firebase'
import { getUpcomingBirthdays } from '../../utils/utils'
import { useNavigate, useLocation } from 'react-router-dom'
const Toast = lazy(() => import('../utils/Toast'))
import { auth } from '../../firebase/firebaseApp'

export const customContext = createContext()

const CustomContext = ({ children }) => {
  const ticketDefault = {
    customerId: '',
    employeeId: '',
    totalPayment: '',
    partialPayments: [],
    items: [],
  }
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

  const [loading, setLoading] = useState(true)
  const [clients, setClients] = useState([])
  const [tickets, setTickets] = useState([])
  const [employees, setEmployees] = useState([])
  const [allServices, setAllServices] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [providers, setProviders] = useState([])
  const [roles, setRoles] = useState([])
  const [role, setRole] = useState('')

  const [paymentMethods, setPaymentMethods] = useState([])
  const [selectedClient, setSelectedClient] = useState(defaultClientList)
  const [loggedEmployee, setLoggedEmployee] = useState('')
  const [userLogin, setUserLogin] = useState('')
  const [ticket, setTicket] = useState(ticketDefault)
  const [nextBirthDay, setNextBirthDay] = useState('')
  const [toastMessage, setToastMessage] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserLogin(user.email)
        setLoading(false)
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
      const categ = await getCategories()
      const prov = await getProviders()
      const rols = await getRoles()

      setEmployees(allEmployee)
      setRoles(rols)
      setCategories(categ)
      setProviders(prov)
      setAllServices(services)
      setAllProducts(products)
      setClients(allClients)
      setTickets(allTickets)
      setPaymentMethods(method)
    } catch (error) {
      throw new Error(`Error getting data: ${error}`)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionDataString = localStorage.getItem('sessionData')
        if (!sessionDataString && !userLogin) {
          setLoading(false)
          return
        }
        if (sessionDataString && !userLogin) {
          const sessionData = JSON.parse(sessionDataString)
          setUserLogin(sessionData.userEmail)
        }
        if (userLogin) {
          const employee = await getEmployeeByEmail(userLogin)
          setLoggedEmployee(employee)
          setRole(employee.role)
          await fetchFromDatabase()
          setLoading(false)
        }
      } catch (error) {
        throw new Error(`Error getting data: ${error}`)
      }
    }
    fetchData()
  }, [userLogin])

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
        loading,
        setUserLogin,
        fetchFromDatabase,
        clients,
        roles,
        role,
        categories,
        providers,
        setClients,
        tickets,
        setTickets,
        selectedClient,
        setSelectedClient,
        loggedEmployee,
        setLoggedEmployee,
        employees,
        setEmployees,
        allProducts,
        setAllProducts,
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
