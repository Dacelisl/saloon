import { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import CustomContext from './components/context/CustomContext'
import { initializeFirebase } from './firebase/firebaseApp.js'
import {
  Login,
  TicketList,
  ClientList,
  ProductList,
  ProviderList,
  ProductRegister,
  NotFound,
  Cube,
  AccessDenied,
  HamburguerMenu,
  EmployeeRegister,
  EmployeeList,
  ProviderRegister,
  RegisterClient,
  EarningsEmployee,
  HistoricalClientList,
  Home,
} from './components/imports.js'

function App() {
  const [isFirebaseInitialized, setIsFirebaseInitialized] = useState(false)

  useEffect(() => {
    const initialize = async () => {
      await initializeFirebase()
        .then(() => {
          setIsFirebaseInitialized(true)
        })
        .catch((error) => {
          
          console.error('Error initializing Firebase in App.jsx:', error)
        })
    }
    initialize()
  }, [])

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
              <Route path='ticket' element={<TicketList />} />
              <Route path='provider' element={<ProviderList />} />
              <Route path='providerRegister' element={<ProviderRegister />} />
              <Route path='404' element={<NotFound />} />
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
