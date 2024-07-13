/* eslint-disable react/prop-types */

const ToggleSwitch = ({ label, toggleState, handleToggleChange }) => {
  return (
    <>
      <span className='relative text-sm'>{label}</span>
      <label htmlFor='toggle' className='relative flex items-center bg-stone-300 rounded-2xl h-6 w-full max-w-xs mb-3'>
        <input id='toggle' type='checkbox' className='hidden' checked={toggleState} onChange={handleToggleChange} />
        <span className={`slider p-0 absolute top-0 left-0 bottom-0 cursor-pointer rounded-full h-6 w-1/2 bg-button-primary transition-transform duration-300 ease-in-out transform ${toggleState ? 'translate-x-full' : 'translate-x-0'}`}>
          <span className='block w-full h-full bg-button-primary hover:bg-[#58ac2ea3] rounded-full'></span>
        </span>
      </label>
    </>
  )
}

export default ToggleSwitch
