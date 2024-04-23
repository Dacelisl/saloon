/* eslint-disable react/prop-types */

const ButtonDefault = ({ title = 'Button',color, ...others }) => {
  return (
    <>
      <button
        type='submit'
        className={`px-2 py-0 mt-1 mx-auto flex text-sm xxl:text-xl  xxl:font-semibold font-medium  rounded-md bg-button-primary text-button-text_primary hover:bg-button-hover hover:text-button-text_hover focus:outline-none focus:ring-1 focus:ring-gray-700 shadow-md shadow-slate-800 ${color}`}
        {...others}
      >
        <span className='p-1'>{title}</span>
      </button>
    </>
  )
}

export default ButtonDefault
