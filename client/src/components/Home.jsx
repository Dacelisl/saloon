/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { Link } from 'react-router-dom'
import addUser from '../assets/Icons/addUser.svg'
import users from '../assets/Icons/users.svg'
import bills from '../assets/Icons/bills.svg'
import WithAuthentication from '../components/utils/WithAuthentication.jsx'
const Logo = lazy(() => import('../components/utils/Logo.jsx'))
const Modal = lazy(() => import('../components/utils/Modal.jsx'))
const IconContainer = lazy(() => import('../components/utils/IconContainer.jsx'))
const PanelBirthday = lazy(() => import('../components/utils/PanelBirthday.jsx'))

const Home = () => {
  return (
    <div className='flex'>
      <Logo />
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

export default WithAuthentication(['stylist', 'admin', 'Auxiliar'])(Home)
