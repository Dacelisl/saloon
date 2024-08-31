import { Suspense, useEffect, useState, lazy } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { initializeFirebase } from './firebase/firebaseApp.js'
import CustomContext from './components/context/CustomContext'
import OfflinePage from './components/404/OfflinePage.jsx'
const Login = lazy(() => import('./components/login/Login.jsx'))
const TicketList = lazy(() => import('./components/ticket/TicketList.jsx'))
const ClientList = lazy(() => import('./components/clientList/ClientList.jsx'))
const RegisterClient = lazy(() => import('./components/clientList/RegisterClient.jsx'))
const ProductList = lazy(() => import('./components/product/ProductList.jsx'))
const ProviderList = lazy(() => import('./components/provider/ProviderList.jsx'))
const ProviderRegister = lazy(() => import('./components/provider/ProviderRegister.jsx'))
const ProductRegister = lazy(() => import('./components/product/ProductRegister.jsx'))
const EmployeeList = lazy(() => import('./components/employee/EmployeeList.jsx'))
const RegisterDiagnostic = lazy(() => import('./components/diagnostic/RegisterDiagnostic.jsx'))
const DiagnosticList = lazy(() => import('./components/diagnostic/DiagnosticList.jsx'))
const ServiceList = lazy(() => import('./components/service/ServiceList.jsx'))
const EmployeeRegister = lazy(() => import('./components/employee/EmployeeRegister.jsx'))
const EarningsEmployee = lazy(() => import('./components/earnings/EarningsEmployee.jsx'))
const HistoricalClientList = lazy(() => import('./components/clientList/HistoricalClient/HistoricalClientList.jsx'))
const NotFound = lazy(() => import('./components/404/NotFound.jsx'))
const Cube = lazy(() => import('./components/utils/Cube.jsx'))
const AccessDenied = lazy(() => import('./components/utils/AccessDenied.jsx'))
const HamburguerMenu = lazy(() => import('./components/utils/HamburguerMenu.jsx'))
const Home = lazy(() => import('./components/Home.jsx'))

function App() {
  const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const handleOffline = () => setIsOffline(true)
    const handleOnline = () => setIsOffline(false)

    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)

    const timer = setTimeout(() => {
      if (!isFirebaseInitialized) {
        setIsOffline(true)
      }
    }, 10000)
    const initialize = async () => {
      await initializeFirebase()
        .then(() => {
          setIsFirebaseInitialized(true)
        })
        .catch((error) => {
          setIsOffline(true)
          throw new Error('Error initializing Firebase in App.jsx:', error)
        })
    }
    initialize()
    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
      clearTimeout(timer)
    }
  }, [isFirebaseInitialized])

  if (isOffline) {
    return <OfflinePage />
  }

  if (!isFirebaseInitialized) {
    return (
      <div className='flex absolute top-[25%] left-[50%]'>
        <Cube />
      </div>
    )
  }

  return (
    <>
      <BrowserRouter>
        <Suspense
          fallback={
            <span className='flex absolute top-[25%] left-[50%] '>
              <Cube />
            </span>
          }
        >
          <CustomContext>
            <HamburguerMenu />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='products' element={<ProductList />} />
              <Route path='registerProduct' element={<ProductRegister />} />
              <Route path='employeeList' element={<EmployeeList />} />
              <Route path='registerEmployee' element={<EmployeeRegister />} />
              <Route path='earnings' element={<EarningsEmployee />} />
              <Route path='users' element={<ClientList />} />
              <Route path='registerCliente' element={<RegisterClient />} />
              <Route path='historical' element={<HistoricalClientList />} />
              <Route path='diagnostic' element={<DiagnosticList />} />
              <Route path='registerDiagnostic' element={<RegisterDiagnostic />} />
              <Route path='ticket' element={<TicketList />} />
              <Route path='provider' element={<ProviderList />} />
              <Route path='services' element={<ServiceList />} />
              <Route path='providerRegister' element={<ProviderRegister />} />
              <Route path='404' element={<NotFound code={'404'} text={'We have a problem'} />} />
              <Route path='403' element={<AccessDenied />} />
              <Route path='/*' element={<Navigate to='/404' />} />
            </Routes>
          </CustomContext>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
