/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom'
import notfound_dark from '../../assets/img/notfound_dark.svg'
import dark from '../../assets/img/dark.jpg'
import { MovingDots, FloatingDots } from '../imports'

const NotFound = () => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black block text-center top-[-5%] md:top-0 justify-center backdrop-blur-3xl`}
        style={{
          backgroundImage: `url(${dark})`,
        }}
      >
        <MovingDots number={3} />
        <FloatingDots number={15} />
        <div className='z-20 relative top-[30%] right-[4%] md:top-[32%] w-[80%] xl:w-[40%] xl:top-[38%] xxl:w-[35%] xxxl:w-[25%] m-auto'>
          <img src={notfound_dark} alt='Astronauta flotando en el espacio' />
        </div>
        <h1
          className='font-sans flex absolute top-3 xl:top-[-5%] left-[50%] right-[50%] justify-center sm:text-[120px] md:text-[130px] xl:text-[180px] font-semibold text-black uppercase '
          style={{ textShadow: '-1px -1px 0 #8400ff, 1px 1px 0 #ff005a' }}
        >
          404
        </h1>
        <span
          className=' font-sans block relative sm:bottom-[13%] sm:text-2xl md:bottom-[19%] md:text-3xl lg:bottom-[25%] xl:bottom-[20%] xl:text-5xl xxl:bottom-[22%] xxxl:bottom-[25%] text-white uppercase m-auto'
          style={{ textShadow: '0 2px 0 #ff0ab2' }}
        >
          We have a problem
        </span>
        <NavLink
          to={'/'}
          className={
            ' inline-flex text-sm md:text-2xl xl:text-3xl  relative font-medium text-pink-800 border-solid border-2 border-pink-800 transition-opacity duration-200  bg-[#161414e6] px-3 py-2 top-[30%] lg:top-38 shadow-md  shadow-slate-200 hover:text-white'
          }
        >
          Go Home
        </NavLink>
      </div>
    </>
  )
}
export default NotFound
