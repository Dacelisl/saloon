import { Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import CustomContext from './components/context/CustomContext'
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
  BackArrow,
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
            <BackArrow />
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
