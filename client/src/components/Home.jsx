/* eslint-disable react/prop-types */

import { lazy } from 'react'
import { Link } from 'react-router-dom'
import addUser from '../assets/Icons/addUser.svg'
import users from '../assets/Icons/users.svg'
import bills from '../assets/Icons/bills.svg'
const Modal = lazy(() => import('./utils/Modal'))
const IconContainer = lazy(() => import('./utils/IconContainer'))

const Home = () => {
  return (
    <>
      <Modal>
        <div className='grid z-30 grid-rows-[auto,1fr,auto] relative h-full'>
          <h2 id='head' className='text-xl pl-4 text-gray-500 font-bold mb-1'>
            Clients
          </h2>
          <div id='body' className='overflow-auto'>
            <span>cuerpo</span>
          </div>
          <div id='footer' className='flex justify-around items-center'>
            <Link to={'/registerCliente'}>
              <IconContainer icon={addUser} alt={'registerCliente'} />
            </Link>
            <Link to={'/users'}>
              <IconContainer icon={users} alt={'users'} />
            </Link>
            <Link to={'/EmployeeList'}>
              <IconContainer icon={bills} alt={'EmployeeList'} />
            </Link>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Home
