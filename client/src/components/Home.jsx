/* eslint-disable react/prop-types */

import { lazy } from 'react'
import { Link } from 'react-router-dom'
import addUser from '../assets/Icons/addUser.svg'
import users from '../assets/Icons/users.svg'
import bills from '../assets/Icons/bills.svg'
import Logo from './utils/Logo'
const Modal = lazy(() => import('./utils/Modal'))
const IconContainer = lazy(() => import('./utils/IconContainer'))
const PanelBirthday = lazy(() => import('./utils/PanelBirthday'))

const Home = () => {
  return (
    <div className='flex'>
        <Logo/>
      <Modal>
        <div className='grid z-30 grid-rows-[auto,1fr,auto] relative h-full'>
          <div id='body' className='relative contents overflow-auto h-[60%]'>
            <PanelBirthday />
          </div>
          <div id='footer' className='flex absolute w-full bottom-0 h-[20%] justify-around items-center'>
            <Link to={'/registerCliente'}>
              <IconContainer icon={addUser} alt={'registerCliente'} />
            </Link>
            <Link to={'/users'}>
              <IconContainer icon={users} alt={'users'} />
            </Link>
            <Link to={'/earnings'}>
              <IconContainer icon={bills} alt={'earningsEmployee'} />
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Home
