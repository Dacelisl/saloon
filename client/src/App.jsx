import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Login = lazy(() => import('./components/login/Login'))
const Home = lazy(() => import('./components/Home.jsx'))
const TicketList = lazy(() => import('./components/ticket/TicketList.jsx'))
const ClientList = lazy(() => import('./components/clientList/ClientList.jsx'))
const ProductList = lazy(() => import('./components/productList/ProductList.jsx'))
const ModalProduct = lazy(() => import('./components/modals/ModalProduct.jsx'))
const NotFound = lazy(() => import('./components/404/NotFound.jsx'))
const Spinner = lazy(() => import('./components/utils/Spinner.jsx'))
const ModalRegister = lazy(() => import('./components/modals/ModalRegister.jsx'))
const ModalRegisterClient = lazy(() => import('./components/modals/ModalRegisterClient.jsx'))
const HistoricalClientList = lazy(() => import('./components/clientList/HistoricalClient/HistoricalClientList.jsx'))

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense
          fallback={
            <span className='flex absolute top-[50%] left-[50%] '>
              <Spinner />
            </span>
          }
        >
          <Routes>
            <Route path='/' element={<Home />} errorElement={<NotFound />} />
            <Route path='login' element={<Login />} />
            <Route path='historical' element={<HistoricalClientList />} />
            <Route path='users' element={<ClientList />} />
            <Route path='products' element={<ProductList />} />
            <Route path='product' element={<ModalProduct />} />
            <Route path='ticket' element={<TicketList />} />
            <Route path='register' element={<ModalRegister />} />
            <Route path='registerCliente' element={<ModalRegisterClient />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
