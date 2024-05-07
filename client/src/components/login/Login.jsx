import { useState, lazy } from 'react'
/* import { useNavigate } from 'react-router-dom' */
import dark from '../../assets/img/dark.jpg'
import { singIn, logOut } from '../../firebase/firebase'

const ButtonIcon = lazy(() => import( '../utils/ButtonIcon'))
const Toast = lazy(() => import( '../utils/Toast'))
const InputPassword = lazy(() => import( '../utils/InputPassword'))
const InputEdit = lazy(() => import( '../utils/InputEdit'))
const ModalRecoveryPassword = lazy(() => import( './RecoveryPassword'))

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user, setUser] = useState({
    userName: '',
    password: '',
  })
  /*  const navigate = useNavigate() */
  const [toast, setToast] = useState({
    state: false,
    message: '',
    type: 'alert',
  })

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }
  const handleCloseModal = async () => {
    setIsModalOpen(false)
  }

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const singOut = async (e) => {
    e.preventDefault()
    try {
      await logOut()
      msgToast('logOut')
    } catch (error) {
      console.log('error en el logout', error)
    }
  }
  const login = async (e) => {
    e.preventDefault()
    try {
      if (user.userName || user.password != '') {
        await singIn(user.userName, user.password)
        setUser({
          userName: '',
          password: '',
        })
        return msgToast('Login Successful')
      }
      return msgToast('enter username and passwords')
    } catch (error) {
      msgToast('Invalid username or password')
    }
  }

  const msgToast = (msg) => {
    setToast({
      state: true,
      message: msg,
      type: msg.includes('Successful') ? 'success' : 'alert',
    })
    resetToast(msg.includes('welcome') || msg.includes('Successful'))
  }
  const resetToast = (res) => {
    setTimeout(() => {
      setToast(false)
      /* res ? navigate('/') : res === false ? setRegister(true) : <></> */
      console.log('navega segun respuesta ', res)
    }, 9000)
  }
  return (
    <div
      className='fixed w-full h-full top-0 block'
      style={{
        backgroundImage: `url(${dark})`,
      }}
    >
      <div className='relative flex items-center justify-center h-full '>
        <form
          id='login'
          className='absolute h-fit  bg-slate-500/20 top-[45%] left-1/2 rounded-xl -translate-x-1/2 -translate-y-1/2 backdrop-blur-md shadow-lg shadow-slate-400 text-slate-50 p-5 pt-4 mb-[10%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[45%] xl:p-10 xxl:w-[40%] xxxl:w-[30%] 2xl:p-10  lg:top-[45%] lg:p-8'
        >
          <h3 className='text-xl md:text-3xl mb-3 text-center font-semibold'>Sing In</h3>

          <InputEdit label={false} labelName={'Enter your Username'} value={user.userName} edit name={'userName'} className='bg-slate-700  h-10 mb-3' />

          <InputPassword label={false} labelName={'Enter your password'} name={'password'} onChange={handleFieldChange} value={user.password} edit className='bg-slate-700 h-10' />

          <span className=' flex mt-4 mb-4  justify-center'>
            <ButtonIcon
              id='btn-login'
              title='Sing In'
              nameIcon='log-in-outline'
              sizeIcon={'large'}
              style={{
                width: '130px',
                height: '50px',
                justifyContent: 'center',
                backgroundColor: '#85b30b61',
                fontSize: 'medium',
              }}
              onClick={login}
            />
          </span>
          <span className='block text-center text-xs font-extralight mt-3 md:text-lg'>
            <span className='cursor-pointer' onClick={handleOpenModal}>
              Forgot password ?
            </span>
          </span>
        </form>
      </div>
      <ModalRecoveryPassword isOpen={isModalOpen} onClose={handleCloseModal} />
      <span className=' flex mt-2 mb-2  justify-center'>
        <ButtonIcon
          id='btn-login'
          title='SingOut'
          nameIcon='log-in-outline'
          sizeIcon={'large'}
          style={{
            width: 'auto',
            padding: '5px',
            justifyContent: 'center',
            backgroundColor: '#c92626',
            fontSize: 'medium',
          }}
          onClick={singOut}
        />
      </span>

      {toast.state ? (
        <>
          <Toast message={toast.message} type={toast.type} />
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Login
