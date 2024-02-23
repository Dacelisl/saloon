import { useState } from 'react'
/* import { useNavigate } from 'react-router-dom' */
import matrix from '../../assets/matrix.jpg'
import { singIn, logOut } from '../../firebase/firebase'
import ButtonIcon from '../utils/ButtonIcon'
import Toast from '../utils/Toast'
import ModalRecoveryPassword from '../modals/ModalRecoveryPassword'

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
        backgroundImage: `url(${matrix})`,
      }}
    >
      <div className='relative flex items-center justify-center h-full '>
        <form
          id='login'
          className='absolute h-fit w-[70%] bg-slate-500/20 top-[45%] left-1/2 rounded-xl -translate-x-1/2 -translate-y-1/2 backdrop-blur-md shadow-lg shadow-slate-400 text-slate-50 p-5 pt-4 mb-[10%] md:w-[55%] lg:w-[40%] xl:w-[40%] xl:p-10 2xl:w-[30%] 2xl:p-10  lg:top-[45%] lg:p-8'
        >
          <h3 className='text-xl md:text-3xl mb-3 text-center font-semibold'>Sing In</h3>
          <input
            type='text'
            id='username'
            autoComplete='off'
            required
            value={user.userName}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
            placeholder='Enter your Username'
            className='block h-10 w-full bg-slate-700 rounded px-3 mt-2 mb-4 text-lg font-extralight placeholder:text-slate-400 '
          />
          <input
            id='password'
            required
            autoComplete='off'
            type='password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder='Enter your password'
            className='block h-10 w-full bg-slate-700 rounded px-3 mt-2 mb-4 text-lg font-extralight placeholder:text-slate-400 '
          />
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
        <ModalRecoveryPassword isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
      <span className=' flex mt-4 mb-4  justify-center'>
        <ButtonIcon
          id='btn-login'
          title='SingOut'
          nameIcon='log-in-outline'
          sizeIcon={'large'}
          style={{
            width: '130px',
            height: '50px',
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