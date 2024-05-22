import { NavLink } from 'react-router-dom'
import dark from '../../assets/img/dark.jpg'
import lock from '../../assets/Icons/lock.svg'
import { FloatingDots, MovingDots } from '../imports.js'

const AccessDenied = () => {
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
          <div className='flex flex-col items-center justify-center min-h-screen bg-secondary-dark'>
            <div className='absolute top-[30%] w-fit'>
              <span className='relative block mx-auto w-fit'>
                <img className='p-1 w-20' src={`${lock}`} />
              </span>
              <div className='text-center min-w-fit mt-4 font-semibold font-sans text-lg text-slate-300'>
                <h1>Acceso Denegado</h1>
                <p>No tienes permiso para acceder a esta ruta.</p>
              </div>
              <NavLink
                to={'/'}
                className={
                  'block relative mx-auto w-fit mt-[20%] text-sm md:text-xl xl:text-2xl font-light text-pink-700  border-2 border-pink-900 transition-opacity duration-200  bg-[#161414e6] p-2 shadow-sm  shadow-slate-200 hover:text-white'
                }
              >
                Go Home
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccessDenied
