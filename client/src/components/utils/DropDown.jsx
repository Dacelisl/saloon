/* eslint-disable react/prop-types */

const DropDown = ({ children, label, hiden = true, toggleHiden, className }) => {
  return (
    <>
      <div className={`bg-[#d9e7cb] rounded-lg p-2 mb-2 xl:ml-4 cursor-pointer flex justify-between items-center ${className}`} onClick={toggleHiden}>
        <h2 className='text-lg m-auto text-center font-semibold'>{label}</h2>
        <span className='text-xl'>{hiden ? '−' : '+'}</span>
      </div>

      {hiden && children}
    </>
  )
}

export default DropDown
