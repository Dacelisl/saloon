/* eslint-disable react/prop-types */
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { customContext } from '../context/CustomContext'
import { logOut } from '../../firebase/firebase'

const HamburguerMenu = () => {
  const { loggedEmployee, setLoggedEmployee, location, navigate, showToast } = useContext(customContext)
  const [changeAction, setChangeAction] = useState(false)
  const isLoginPage = location.pathname === '/login' || location.pathname === '/404' || location.pathname === '/403'

  function menuOnClick() {
    setChangeAction(!changeAction)
  }
  const singOut = async (e) => {
    e.preventDefault()
    try {
      const res = await logOut()
      if (res) {
        setLoggedEmployee('')
        showToast('Log Out', 200)
        navigate('/login')
      }
    } catch (error) {
      showToast('Error Log Out', 500)
    }
  }
  return (
    <>
      {!isLoginPage && (
        <>
          <div className='z-50 top-0 right-2 absolute ' onClick={menuOnClick}>
            <div className={`w-12 h-8 mt-8 mr-0 mb-5 ml-6 cursor-pointer ${changeAction ? 'change block' : ''}`} onClick={menuOnClick}>
              <div className={`block h-[6px] w-full duration-300 ease-out bg-slate-100 rounded -translate-y-1 ${changeAction ? '!translate-y-1 -rotate-45' : ''}`}></div>
              <div className={`block h-[6px] w-full duration-300 ease-out bg-slate-100 rounded ${changeAction ? 'opacity-0' : ''}`}></div>
              <div className={`block h-[6px] w-full duration-300 ease-out bg-slate-100 rounded translate-y-1 ${changeAction ? '!-translate-y-2 rotate-45' : ''}`}></div>
            </div>
            <nav className={changeAction ? 'block' : 'hidden duration-300 ease-out '}>
              <ul className='px-0 py-0 '>
                <li className=' text-slate-100 sm:text-sm xl:text-base hover:font-bold'>
                  <Link to={'/'}>Home</Link>
                </li>
                <li className=' text-slate-100 sm:text-sm xl:text-base hover:font-bold'>
                  <Link to={'/registerCliente'}>Add Client</Link>
                </li>
                <li className=' text-slate-100 sm:text-sm xl:text-base hover:font-bold'>
                  <Link to={'/users'}>Clients</Link>
                </li>

                {loggedEmployee.role === 'admin' ? (
                  <>
                    <li className=' text-slate-100 sm:text-sm xl:text-base hover:font-bold'>
                      <Link to={'/registerProduct'}>Add Product</Link>
                    </li>
                    <li className=' text-slate-100 sm:text-sm xl:text-base hover:font-bold'>
                      <Link to={'/products'}>Product</Link>
                    </li>
                    <li className=' text-slate-100 sm:text-sm xl:text-base hover:font-bold'>
                      <Link to={'/registerEmployee'}>Add Employee</Link>
                    </li>
                    <li className=' text-slate-100 sm:text-sm xl:text-base hover:font-bold'>
                      <Link to={'/employeeList'}>Employee</Link>
                    </li>
                    <li className=' text-slate-100 sm:text-sm xl:text-base hover:font-bold'>
                      <Link to={'/providerRegister'}>Add Provider</Link>
                    </li>
                    <li className=' text-slate-100 sm:text-sm xl:text-base hover:font-bold'>
                      <Link to={'/provider'}>Provider</Link>
                    </li>
                  </>
                ) : (
                  ''
                )}

                <li className=' text-slate-100 sm:text-sm xl:text-base hover:font-bold'>
                  <Link to={'/earnings'}>Wallet</Link>
                </li>

                <li className={loggedEmployee.role === 'admin' ? 'mt-7 ml-[30%] xl:mt-10' : 'mt-7 ml-[20%] xl:mt-10'}>
                  <a href='#' className=' text-slate-100 text-sm border-2 p-1 rounded-sm shadow shadow-slate-300 hover:font-bold' onClick={singOut}>
                    LogOut
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div
            className={
              loggedEmployee.role === 'admin'
                ? `flex fixed w-[520px] h-[700px] translate-x-[60%] -translate-y-[30%]  md:translate-x-[56%] lg:translate-x-[53%] xl:translate-x-[28%] xxl:translate-x-[16%] xxl:-translate-y-[25%] xxxl:-translate-x-[14%] ${
                    changeAction ? 'z-40 w-0 h-0 mt-8 mr-0 mb-5 ml-5 bg-[#688d52] rounded-[60%] top-0 -right-[30%] duration-300 ease-out' : ''
                  }`
                : `flex fixed w-[520px] h-[500px] translate-x-[65%] -translate-y-[30%]  md:translate-x-[60%] lg:translate-x-[58%] xl:translate-x-[35%] xxl:translate-x-[22%] xxl:-translate-y-[25%] xxxl:-translate-x-[10%] ${
                    changeAction ? 'z-40 w-0 h-0 mt-8 mr-0 mb-5 ml-5 bg-[#688d52] rounded-[50%] top-0 -right-[30%] duration-300 ease-out' : ''
                  }`
            }
          ></div>
        </>
      )}
    </>
  )
}
export default HamburguerMenu
