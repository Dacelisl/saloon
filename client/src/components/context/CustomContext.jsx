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
  const [HairTypes, setHairTypes] = useState([])

  const [decodedClaims, setDecodedClaims] = useState(null)
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
        const idTokenResult = await user.getIdTokenResult()
        const claims = idTokenResult.claims
        setDecodedClaims(claims.claims)

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
      const hairs = await getHairTypes()
      const scalp = await getScalpTypes()

      const employeesFormatted = allEmployee.payload?.map((emp) => ({
        ...emp,
        fullName: `${emp.firstName} ${emp.lastName}`,
      }))
      const clientsFormatted = allClients.payload?.map((user) => ({
        ...user,
        fullName: `${user.firstName} ${user.lastName}`,
      }))

      const serviceSort = services.payload.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })

      setEmployees(employeesFormatted)
      setRoles(rols.payload)
      setCategories(categ.payload)
      setProviders(prov.payload)
      setAllServices(serviceSort)
      setAllProducts(products.payload)
      setClients(clientsFormatted)
      setTickets(allTickets.payload)
      setPaymentMethods(method.payload)
      setDiagnostics(allDiagnostic.payload)
      setScalpTypes(scalp.payload)
      setHairTypes(hairs.payload)
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
  const isTimeAllowed = (typeUser) => {
    const userAllowed = Array.isArray(typeUser) ? typeUser.some((user) => user === decodedClaims.role) : typeUser === decodedClaims.role
    const currentHour = new Date().getHours()
    return userAllowed && currentHour >= decodedClaims.workingHours.startTime && currentHour < decodedClaims.workingHours.endTime
  }
  const isUserAllowed = (typeUser) => {
    return Array.isArray(typeUser) ? typeUser.some((user) => user === decodedClaims.role) : typeUser === decodedClaims.role
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
        isTimeAllowed,
        isUserAllowed,
      }}
    >
      {children}
      {toastMessage && <Toast message={toastMessage.message} code={toastMessage.code} time={4000} />}
      {!spinner && <Cube hiden={spinner} dark={false} />}
    </customContext.Provider>
  )
}
export default CustomContext
