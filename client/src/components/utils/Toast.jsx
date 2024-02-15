/* eslint-disable react/prop-types */
import { useState } from 'react'
/* usar dentro de un div con flex absolute  */

const Toast = ({ message, type = 'success', nameIcon, positionX = 'top', positionY = 'right', time = 5000 }) => {
  const [estado, setEstado] = useState(true)
  const closeToast = () => setEstado(false)

  const toastContainer = `flex fixed z-30 items-end m-3 flex-col ${positionY == 'right' ? 'right-0 md:right-[1%]' : 'left-0 md:left-[1%]'} ${positionX == 'top' ? 'top-[2%]' : 'bottom-[2%]'}`
  const toastType = `flex w-max h-auto rounded-md  pt-1 pr-1 pb-2 pl-1 flex-row-reverse shadow shadow-slate-500 ${type === 'alert' ? 'bg-rose-500' : 'bg-emerald-500'}`

  setTimeout(closeToast, time)
  return (
    <div className={toastContainer}>
      <div className={estado ? toastType : 'hidden'}>
        <div onClick={closeToast} className='pl-3 pr-1 pt-1'>
          <span className=' w-3 h-3 flex cursor-pointer items-center'>
            <svg aria-hidden='true' width='18' height='16'>
              <path fill='#29292987' d='M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z' />
            </svg>
          </span>
        </div>
        <div className='flex m-auto  items-center text-base font-semibold '>
          <span className='pl-1 pr-2 pt-2 right-2 text-sm'>
            <ion-icon name={nameIcon || (type === 'alert' ? 'alert-circle-outline' : 'checkmark-outline')} size='large'></ion-icon>
          </span>
          {message || 'Default Text for Toast'}
        </div>
      </div>
    </div>
  )
}
export default Toast
