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
            <div className={`fixed z-[-40] top-0 right-0 w-full h-full bg-opacity-50 ${changeAction ? 'block' : 'hidden'}`} onClick={menuOnClick}></div>
            <nav
              className={`fixed top-0 right-0 w-[40vw] xl:w-[22vw] xxl:w-[18vw] xxxl:w-[12vw] h-full bg-[#709e83] transform ${
                changeAction ? 'translate-x-0' : 'translate-x-full'
              } transition-transform duration-300 ease-out z-[-40]`}
            >
              <ul className='px-[10%] mt-[10vh] z-[-51]'>
                <li className=' text-slate-50 font-bold sm:text-xl xl:text-2xl hover:font-bold'>
                  <Link to={'/'}>Home</Link>
                </li>
                <li className=' text-slate-50 font-bold mt-1 sm:text-xl xl:text-2xl hover:font-bold'>
                  <Link to={'/users'}>Clientes</Link>
                </li>
                <li className=' text-slate-50 font-bold mt-1 sm:text-xl xl:text-2xl hover:font-bold'>
                  <Link to={'/diagnostic'}>Diagnostico</Link>
                </li>

                {loggedEmployee.role === 'admin' ? (
                  <>
                    <li className=' text-slate-50 font-bold mt-1 sm:text-xl xl:text-2xl hover:font-bold'>
                      <Link to={'/products'}>Productos</Link>
                    </li>
                    <li className=' text-slate-50 font-bold mt-1 sm:text-xl xl:text-2xl hover:font-bold'>
                      <Link to={'/employeeList'}>Empleados</Link>
                    </li>
                    <li className=' text-slate-50 font-bold mt-1 sm:text-xl xl:text-2xl hover:font-bold'>
                      <Link to={'/provider'}>Proveedores</Link>
                    </li>
                  </>
                ) : (
                  ''
                )}

                <li className=' text-slate-50 font-bold mt-1 sm:text-xl xl:text-2xl hover:font-bold'>
                  <Link to={'/earnings'}>Wallet</Link>
                </li>

                <li className={loggedEmployee.role === 'admin' ? 'mt-7 ml-[10%] xl:mt-8' : 'mt-7 ml-[18%] xl:mt-10'}>
                  <a href='#' className=' text-slate-50 font-bold text-lg border-2 p-1 rounded-sm shadow shadow-slate-300 hover:font-bold' onClick={singOut}>
                    LogOut
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
export default HamburguerMenu
