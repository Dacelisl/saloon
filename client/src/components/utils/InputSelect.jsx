/* eslint-disable react/prop-types */

const InputSelect = ({ label, name, itemValue, itemOption, handleFieldChange, editable = false }) => {
  return (
    <div className='mb-2'>
      <label className='block text-xs font-semibold text-gray-600'>
        {label}:
        <select name={name} disabled={!editable} value={itemValue} onChange={handleFieldChange} className='w-full px-2 text-sm py-1 border rounded-md'>
          <option value="">Seleccione</option>
          {itemOption.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default InputSelect
