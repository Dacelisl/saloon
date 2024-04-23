/* eslint-disable react/prop-types */

import Modal from './utils/Modal'
import IconContainer from './utils/IconContainer'
import wallet_icon from '../assets/Icons/wallet.svg'
import add_user from '../assets/Icons/add_user.svg'
import bills from '../assets/Icons/bills.svg'
import { Link } from 'react-router-dom'

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
            <Link to={'/users'}>
            <IconContainer icon={add_user} alt={'clients'} />
            </Link>
            <Link>
              <IconContainer icon={wallet_icon} alt={'tickets'} />
            </Link>
            <Link to={'/ticket'}>
              <IconContainer icon={bills} alt={'tickets'} />
            </Link>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Home
