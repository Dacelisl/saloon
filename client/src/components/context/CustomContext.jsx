/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, lazy } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { auth } from '../../firebase/firebaseApp'
import { getUpcomingBirthdays } from '../../utils/utils.js'
import {
  getClients,
  getTickets,
  getEmployee,
  getProducts,
  getServices,
  getPaymentsMethod,
  getRoles,
  getCategories,
  getProviders,
  getEmployeeByEmail,
  getDiagnostics,
  getHairTypes,
  getProcedureTypes,
  getScalpTypes,
} from '../../firebase/firebase'
const Toast = lazy(() => import('../utils/Toast.jsx'))
const Cube = lazy(() => import('../utils/Cube.jsx'))

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
    id: '',
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
  const defaultDiagnostic = {
    client: {
      dni: '',
      firstName: '',
      lastName: '',
    },
    employee: {
      firstName: '',
      lastName: '',
    },
    date: '',
    procedureType: '',
    hairCondition: '',
    scalpCondition: '',
    stylistNotes: '',
    recommendations: '',
    nextAppointment: '',
    photoBefore: '',
    photoAfter: '',
  }

  const [loading, setLoading] = useState(true)
  const [clients, setClients] = useState([])
  const [tickets, setTickets] = useState([])
  const [employees, setEmployees] = useState([])
  const [allServices, setAllServices] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [providers, setProviders] = useState([])
  const [diagnostics, setDiagnostics] = useState([])

  const [scalpTypes, setScalpTypes] = useState([])
  const [procedureTypes, setProcedureTypes] = useState([])
  const [HairTypes, setHairTypes] = useState([])

  const [roles, setRoles] = useState([])
  const [role, setRole] = useState('')

  const [paymentMethods, setPaymentMethods] = useState([])
  const [selectedClient, setSelectedClient] = useState(defaultClientList)
  const [loggedEmployee, setLoggedEmployee] = useState('')
  const [ticket, setTicket] = useState(ticketDefault)
  const [nextBirthDay, setNextBirthDay] = useState('')
  const [toastMessage, setToastMessage] = useState(null)
  const [spinner, setSpinner] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setTimeout(() => {
      setToastMessage(null)
    }, 4000)
  }, [toastMessage])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return setLoading(false)
      try {
        const employee = await getEmployeeByEmail(user.email)
        if (!employee.code || employee.code !== 200) {
          setToastMessage({ message: 'Usuario no Encontrado o Eliminado', code: 500 })
          await auth.signOut()
          return
        }
        setLoggedEmployee(employee.payload)
        setRole(employee.payload.role)
        setToastMessage({ message: 'Login Successful', code: 200 })
        fetchFromDatabase()
      } catch (error) {
        setToastMessage({ message: 'Error de Conexion', code: 500 })
      } finally {
        setLoading(false)
      }
    })
    return () => unsubscribe()
  }, [])

  const fetchFromDatabase = async () => {
    try {
      const allEmployee = await getEmployee()
      const allClients = await getClients()
      const allTickets = await getTickets()
      const method = await getPaymentsMethod()
      const allDiagnostic = await getDiagnostics()
      const services = await getServices()
      const products = await getProducts()
      const categ = await getCategories()
      const prov = await getProviders()
      const rols = await getRoles()
      const procedures = await getProcedureTypes()
      const hairs = await getHairTypes()
      const scalp = await getScalpTypes()

      const employees = allEmployee?.map((emp) => ({
        ...emp,
        fullName: `${emp.firstName} ${emp.lastName}`,
      }))
      const clients = allClients?.map((user) => ({
        ...user,
        fullName: `${user.firstName} ${user.lastName}`,
      }))

      setEmployees(employees)
      setRoles(rols)
      setCategories(categ)
      setProviders(prov)
      setAllServices(services)
      setAllProducts(products)
      setClients(clients)
      setTickets(allTickets)
      setPaymentMethods(method)
      setDiagnostics(allDiagnostic)
      setScalpTypes(scalp)
      setHairTypes(hairs)
      setProcedureTypes(procedures)
    } catch (error) {
      throw new Error(`Error getting data: ${error}`)
    }
  }

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
  }
  const isDataComplete = (data) => {
    for (const key in data) {
      if (data[key] === '') {
        return false
      }
    }
    return true
  }

  return (
    <customContext.Provider
      value={{
        loading,
        fetchFromDatabase,
        isDataComplete,
        clients,
        roles,
        role,
        categories,
        scalpTypes,
        HairTypes,
        procedureTypes,
        providers,
        setClients,
        tickets,
        setTickets,
        diagnostics,
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
        defaultDiagnostic,
        setSpinner,
      }}
    >
      {children}
      {toastMessage && <Toast message={toastMessage.message} code={toastMessage.code} time={4000} />}
      {!spinner && <Cube hiden={spinner} dark={false} />}
    </customContext.Provider>
  )
}
export default CustomContext
