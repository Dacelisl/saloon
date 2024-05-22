/* eslint-disable react/prop-types */

const InputArea = ({ label = true, labelName, value, edit = false, onChange, name, className = '' }) => {
  return (
    <div className=' mt-0 w-full '>
      {label && (
        <label htmlFor={name} className='block text-xs lg:text-base xxl:text-lg  mb-1 font-semibold text-gray-600'>
          {labelName}:
        </label>
      )}
      <textarea
        id={name}
        value={value || ''}
        disabled={!edit}
        onChange={onChange}
        autoComplete='off'
        name={name}
        placeholder={label ? '' : labelName}
        className={`w-full px-3 py-2 border rounded-md focus:outline-red-200 ${className}`}
      ></textarea>
    </div>
  )
}

export default InputArea
