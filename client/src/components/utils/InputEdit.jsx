/* eslint-disable react/prop-types */

const InputEdit = ({ label = true, labelName, value, edit =false, onChange , type = 'text', name, className='' }) => {
  return (
    <div className='mb-2'>
      {label && (
        <label htmlFor={name} className='block text-xs lg:text-base xxl:text-lg  mb-1 font-semibold text-gray-600'>
          {labelName}:
        </label>
      )}
      <input
        id={name}
        value={value}
        disabled={!edit}
        onChange={onChange}
        type={type}
        autoComplete='off'
        name={name}
        placeholder={label ? '' : labelName}
        className={`w-full px-2 py-0 border rounded-md focus:outline-red-200 ${className}`}
      />
    </div>
  )
}

export default InputEdit
