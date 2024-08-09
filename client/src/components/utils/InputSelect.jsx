/* eslint-disable react/prop-types */

const InputSelect = ({ label, name, itemValue, itemOption, handleFieldChange, editable = false, className = '', optionValueKey = 'name', optionDisplayKey = 'name' }) => {  
  return (
    <div className='mb-2'>
      <label className='block text-xs lg:text-base xxl:text-lg font-semibold text-gray-600'>
        {label}:
        <select
          name={name}
          disabled={!editable}
          value={itemValue || ''}
          onChange={handleFieldChange}
          className={`w-full h-9 px-2 mt-1 text-sm py-1 border rounded-md focus:outline-red-200 ${className}`}
        >
          {itemOption.map((option) => (
            <option key={option.id} value={option[optionValueKey]}>
              {option[optionDisplayKey]}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default InputSelect
