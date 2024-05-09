/* eslint-disable react/prop-types */
import FloatingDots from './FloatingDots'
import MovingDots from './MovingDots'
import dark from '../../assets/img/dark.jpg'

const Modal = ({ children, className, type = 1 }) => {
  return (
    <>
      <div
        className='fixed inset-0 flex items-center top-[-5%] md:top-0 justify-center bg-secondary-dark backdrop-blur-xl bg-opacity-75'
        style={{
          backgroundImage: `url(${dark})`,
        }}
      >
        <FloatingDots number={7} />
        <MovingDots number={3} />
        <div
          className={`z-20 relative sm:top-[8%] md:top-[5%] px-4 py-2 mx-auto rounded-lg shadow-md shadow-slate-500 ${
            type === 1 ? 'bg-[#030313] w-[90%] h-[70%] max-w-md' : `bg-primary-light sm:w-[95%] lg:max-w-fit xl:p-7  xxl:w-[40%] xxl:max-w-none ${className}`
          } `}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default Modal
