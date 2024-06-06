import { useState, useContext } from 'react'
import dark from '../../assets/img/dark.jpg'
import { singIn } from '../../firebase/firebase'
import { customContext } from '../context/CustomContext'
import { ButtonIcon, InputPassword, InputEdit, MovingDots, FloatingDots, Toast, RecoveryPassword } from '../imports.js'

const Login = () => {
  const { navigate, setUserLogin } = useContext(customContext)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)
  const [user, setUser] = useState({
    userName: '',
    password: '',
  })

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }
  const handleCloseModal = async () => {
    setIsModalOpen(false)
  }
  const showToast = (message, code) => {
    setToastMessage({ message, code })
    setTimeout(() => {
      setToastMessage(null)
    }, 10000)
  }

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }
  const login = async (e) => {
    e.preventDefault()
    try {
      if (user.userName || user.password != '') {
        const res = await singIn(user.userName, user.password)
        setUserLogin(res.user.email)
        localStorage.setItem(
          'sessionData',
          JSON.stringify({
            userEmail: res.user.email,
            userID: res.user.uid,
          })
        )
        setUser({
          userName: '',
          password: '',
        })
        showToast('Login Successful', 200)
        navigate('/')
      }
      return showToast('Enter username and passwords', 500)
    } catch (error) {
      showToast('Invalid username or password', 500)
    }
  }
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
            className='absolute h-fit  bg-[#0b0d0f] top-[45%] left-1/2 rounded-xl -translate-x-1/2 -translate-y-1/2 backdrop-blur-md shadow-md shadow-slate-400 text-slate-50 p-5 pt-4 mb-[10%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[45%] xl:p-10 xxl:w-[40%] xxxl:w-[30%] 2xl:p-10  lg:top-[45%] lg:p-8'
          >
            <h3 className='text-xl md:text-3xl mb-3 text-center font-semibold'>Sing In</h3>
            <InputEdit label={false} labelName={'Enter your Username'} value={user.userName} onChange={handleFieldChange} edit name={'userName'} className='bg-slate-700  h-10 mb-3' />
            <InputPassword label={false} labelName={'Enter your password'} name={'password'} onChange={handleFieldChange} value={user.password} edit className='bg-slate-700 h-10 !text-sm' />
            <span className=' flex mt-4 mb-4  justify-center'>
              <ButtonIcon id='btn-login' title='Sing In' nameIcon='log-in-outline' sizeIcon={'large'} className={'w-28 h-11 justify-center bg-[#85b30b61] text-base'} onClick={login} />
            </span>
            <span className='block text-center text-xs font-extralight mt-3 md:text-lg'>
              <span className='cursor-pointer' onClick={handleOpenModal}>
                Forgot password ?
              </span>
            </span>
          </form>
        </div>
        <RecoveryPassword isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
      {toastMessage && <Toast message={toastMessage.message} code={toastMessage.code} />}
    </>
  )
}

export default Login
