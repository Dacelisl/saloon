/* eslint-disable react/prop-types */
import dark from '../../assets/img/dark.jpg'
import { FloatingDots, MovingDots } from '../imports.js'

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
          className={`z-20 relative px-4 pt-2 sm:pb-2 mx-auto rounded-lg shadow-md shadow-slate-500 ${
            type === 1
              ? 'bg-[#030313] w-[90%] h-[80%] top-[8%] max-w-md'
              : `bg-primary-light sm:w-[95%] sm:top-[8%] sm:h-[80%] lg:max-w-fit xl:px-7 xxl:w-[60%] overflow-y-scroll scrollbar-thin scrollbar-track-[#ddd4b4] scrollbar-thumb-[#fffcf1] ${className}`
          } `}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default Modal
