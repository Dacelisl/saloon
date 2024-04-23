/* eslint-disable react/prop-types */

const IconContainer = ({ icon, alt, size='w-16' }) => {
  return (
    <div className={` flex justify-center items-center w- ${size}  rounded-2xl shadow-lg shadow-slate-500 hover:shadow-md hover:shadow-slate-300 active:bg-gray-400 translate-y-0.5`}>
      <span className='text-2xl text-center'>
        <img className="p-1 " src={`${icon}`} alt={`${alt}`} />
      </span>
    </div>
  )
}
export default IconContainer
