/* eslint-disable react/prop-types */

const ToggleSwitch = ({ label, toggleState, handleToggleChange }) => {
  return (
    <>
      <span className='relative text-sm '>{label}</span>
      <label htmlFor='toggle' className='relative flex lg:text-base xxl:text-lg left-[10%] bg-stone-300 rounded-2xl h-6 w-[75%] lg:w-[80%] xl:w-[85%] mb-3'>
        <input id='toggle' type='checkbox' className='hidden' checked={toggleState} onChange={handleToggleChange} />
        <span className='slider p-0 absolute top-0 left-0 bottom-0 cursor-pointer before:right-0 before:rounded-full before:absolute before:h-6 before:w-10 before:bottom-0 before:bg-button-primary before:hover:bg-[#58ac2ea3] before:transition-all before:duration-300 before:focus:ring-gray-900 before:ease-in-out before:focus:shadow-lg sm:before:translate-x-16 md:before:translate-x-24 lg:before:translate-x-28'></span>
      </label>
    </>
  )
}

export default ToggleSwitch
