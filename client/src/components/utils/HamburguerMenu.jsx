/* eslint-disable react/prop-types */
import { useState, useContext } from 'react'
import { customContext } from '../context/CustomContext'
import { logOut } from '../../firebase/firebase'

const Logo = () => {
  const { location, navigate, showToast } = useContext(customContext)

  const [changeAction, setChangeAction] = useState(false)
  const isLoginPage = location.pathname === '/login' || location.pathname === '/404'

  function menuOnClick() {
    setChangeAction(!changeAction)
  }
  const singOut = async (e) => {
    console.log('ingresa logout');
    e.preventDefault()
    try {
      await logOut()
      showToast('Log Out', 200)
      navigate('/login')
    } catch (error) {
      showToast('Error Log Out', 500)
    }
  }
  return (
    <>
      {!isLoginPage && (
        <>
          <div className='z-50 top-0 right-4 absolute '>
            <div className={`w-12 h-11 mt-8 mr-0 mb-5 ml-5 cursor-pointer ${changeAction ? 'change block' : ''}`} onClick={menuOnClick}>
              <div className={`block h-[6px] w-full duration-300 ease-out bg-slate-100 rounded -translate-y-1 ${changeAction ? '!translate-y-1 -rotate-45' : ''}`}></div>
              <div className={`block h-[6px] w-full duration-300 ease-out bg-slate-100 rounded ${changeAction ? 'opacity-0' : ''}`}></div>
              <div className={`block h-[6px] w-full duration-300 ease-out bg-slate-100 rounded translate-y-1 ${changeAction ? '!-translate-y-2 rotate-45' : ''}`}></div>
            </div>
            <nav className={changeAction ? 'block' : 'hidden duration-300 ease-out '}>
              <ul className='px-0 py-0 '>
                <li>
                  <a href='#' className=' text-slate-100 text-base hover:font-bold'>
                    Home
                  </a>
                </li>
                <li>
                  <a href='#' className=' text-slate-100 text-base hover:font-bold'>
                    About
                  </a>
                </li>
                <li>
                  <a href='#' className=' text-slate-100 text-base hover:font-bold'>
                    Contact
                  </a>
                </li>
                <li className='mt-5 xl:mt-10'>
                  <a href='#' className=' text-slate-100 text-sm border p-1 rounded-sm shadow shadow-slate-300 hover:font-bold' onClick={singOut}>
                    LogOut
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div
            className={`flex fixed w-[520px] h-[460px] translate-x-[60%] -translate-y-[30%] lg:translate-x-[50%] xl:translate-x-[30%] xxl:translate-x-[15%] xxl:-translate-y-[25%] xxxl:-translate-x-[5%] ${
              changeAction ? 'z-40 w-0 h-0 mt-8 mr-0 mb-5 ml-5 bg-[#12132be8] rounded-[60%] top-0 -right-[30%] duration-300 ease-out' : ''
            }`}
          ></div>
        </>
      )}
    </>
  )
}
export default Logo
