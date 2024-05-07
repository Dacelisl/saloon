import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const CustomContext = lazy(() => import('./components/context/CustomContext.jsx'))
const Login = lazy(() => import('./components/login/Login'))
const Home = lazy(() => import('./components/Home.jsx'))
const TicketList = lazy(() => import('./components/ticket/TicketList.jsx'))
const ClientList = lazy(() => import('./components/clientList/ClientList.jsx'))
const ProductList = lazy(() => import('./components/product/ProductList.jsx'))
const ProviderList = lazy(() => import('./components/provider/ProviderList.jsx'))
const ProductRegister = lazy(() => import('./components/product/ProductRegister.jsx'))
const NotFound = lazy(() => import('./components/404/NotFound.jsx'))
const Cube = lazy(() => import('./components/utils/Cube.jsx'))
const BackArrow = lazy(() => import('./components/utils/BackArrow.jsx'))
const EmployeeRegister = lazy(() => import('./components/employee/EmployeeRegister.jsx'))
const EmployeeList = lazy(() => import('./components/employee/EmployeeList.jsx'))
const ProviderRegister = lazy(() => import('./components/provider/ProviderRegister.jsx'))
const RegisterClient = lazy(() => import('./components/clientList/RegisterClient.jsx'))
const EarningsEmployee = lazy(() => import('./components/earnings/EarningsEmployee.jsx'))
const HistoricalClientList = lazy(() => import('./components/clientList/HistoricalClient/HistoricalClientList.jsx'))

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
            <Routes>
              <Route path='/' element={<Home />} errorElement={<NotFound />} />
              <Route path='login' element={<Login />} />
              <Route path='historical' element={<HistoricalClientList />} />
              <Route path='users' element={<ClientList />} />
              <Route path='products' element={<ProductList />} />
              <Route path='registerProduct' element={<ProductRegister />} />
              <Route path='ticket' element={<TicketList />} />
              <Route path='registerEmployee' element={<EmployeeRegister />} />
              <Route path='employeeList' element={<EmployeeList />} />
              <Route path='earnings' element={<EarningsEmployee />} />
              <Route path='registerCliente' element={<RegisterClient />} />
              <Route path='providerRegister' element={<ProviderRegister />} />
              <Route path='provider' element={<ProviderList />} />
              <Route path='/*' element={<NotFound />} />
            </Routes>
          </CustomContext>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
