/* eslint-disable react/prop-types */
import './style.css'
const OfflinePage = () => {
  return (
    <div className='flex z-[60] fixed inset-0 items-center top-[-5%] md:top-0 justify-center bg-[#c9ddc5]'>
      <div id='error' className='m-auto p-5 z-20'>
        <div id='box' className='relative p-5 border border-solid border-black'>
          <h3 id='title-error' className='relative text-[5vw] font-bold uppercase animate-pulse from-neutral-50 '>ERROR 500</h3>
          <p className='relative mb-2 from-neutral-50'>
            Things are a little <span>unstable</span>here
          </p>
          <p className='relative mb-2'>I suggest come back later</p>
        </div>
      </div>
    </div>
  )
}

export default OfflinePage
