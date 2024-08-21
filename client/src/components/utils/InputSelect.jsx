/* eslint-disable react/prop-types */
import { useEffect } from 'react'

const InputSelect = ({ label, name, itemValue, itemOption, handleFieldChange, editable = false, className = '', optionValueKey = 'name', optionDisplayKey = 'name' }) => {
  useEffect(() => {
    if (itemOption.length > 0) {
      const selectedOption = itemOption.find((option) => option[optionDisplayKey] === itemValue)
      if (selectedOption && selectedOption[optionValueKey] !== itemValue) {
        handleFieldChange({ target: { name, value: selectedOption[optionValueKey] } })
      }
    }
  }, [itemValue, itemOption, optionDisplayKey, optionValueKey, handleFieldChange, name])

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
            <option key={option[optionValueKey]} value={option[optionValueKey]}>
              {option[optionDisplayKey]}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default InputSelect
