import { useState, useContext, useEffect, lazy } from 'react'
import { singIn } from '../../firebase/firebase'
import { customContext } from '../context/CustomContext.jsx'
import dark from '../../assets/img/dark.jpg'
const ButtonIcon = lazy(() => import('../utils/ButtonIcon.jsx'))
const InputPassword = lazy(() => import('../utils/InputPassword.jsx'))
const InputEdit = lazy(() => import('../utils/InputEdit.jsx'))
const MovingDots = lazy(() => import('../utils/MovingDots.jsx'))
const FloatingDots = lazy(() => import('../utils/FloatingDots.jsx'))
const RecoveryPassword = lazy(() => import('../login/RecoveryPassword.jsx'))
const Logo = lazy(() => import('../utils/Logo.jsx'))

const Login = () => {
  const { navigate, loggedEmployee, showToast } = useContext(customContext)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user, setUser] = useState({
    userName: '',
    password: '',
  })

  useEffect(() => {
    if (loggedEmployee !== '') {
      navigate('/')
    }
  }, [loggedEmployee])

  const handleModalToggle = () => setIsModalOpen(prev => !prev)

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }
  const login = async (e) => {
    e.preventDefault()
    try {
      if (!user.userName || !user.password) return showToast('Enter username and passwords', 500)
      await singIn(user.userName, user.password)
      setUser({
        userName: '',
        password: '',
      })
    } catch (error) {
      showToast('Invalid username or password', 500)
    }
  }
  if (loggedEmployee) return null

  return (
    <>
      <div
        className='fixed w-full h-full top-0 block'
        style={{
          backgroundImage: `url(${dark})`,
        }}
      >
        <FloatingDots number={7} />
        <MovingDots number={3} />
        <div className='relative flex items-center justify-center h-full '>
          <form
            id='login'
            className='absolute h-fit  bg-[#0b0d0f] top-[45%] left-1/2 rounded-xl -translate-x-1/2 -translate-y-1/2 backdrop-blur-md shadow-md shadow-slate-400 text-slate-50 p-5 pt-4 mb-[10%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[45%] xl:p-10  xxl:w-[40%] xxxl:w-[30%] 2xl:p-10  lg:top-[45%] lg:p-8'
          >
            <Logo className={'!inline-block !m-auto !right-0 !left-0 !top-[-20%] lg:!top-[-15%] xl:!top-[-19%] xxl:!top-[-22%] xxxl:!top-[-26%] !w-[70%]'} />
            <InputEdit label={false} labelName={'Enter your Username'} value={user.userName} onChange={handleFieldChange} edit name={'userName'} className='bg-slate-700  h-10 mb-3 !mt-11' />
            <InputPassword label={false} labelName={'Enter your password'} name={'password'} onChange={handleFieldChange} value={user.password} edit className='bg-slate-700 h-10 !text-sm' />
            <span className=' flex mt-4 mb-4  justify-center'>
              <ButtonIcon id='btn-login' title='Sing In' nameIcon='log-in-outline' sizeIcon={'large'} className={'w-28 h-11 justify-center bg-[#85b30b61] text-base'} onClick={login} />
            </span>
            <span className='block text-center text-xs font-extralight mt-3 md:text-lg'>
              <span className='cursor-pointer' onClick={handleModalToggle}>
                Forgot password ?
              </span>
            </span>
          </form>
        </div>
        <RecoveryPassword isOpen={isModalOpen} onClose={handleModalToggle} />
      </div>
    </>
  )
}

export default Login
