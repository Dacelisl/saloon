/* eslint-disable react/prop-types */
const InputRange = ({ label = true, labelName, value = { min: '', max: '' }, edit = false, onChange, name, className = '' }) => {
  const handleMinChange = (e) => {
    onChange({
      target: {
        name: `${name}.min`,
        value: Number(e.target.value),
      },
    })
  }

  const handleMaxChange = (e) => {
    onChange({
      target: {
        name: `${name}.max`,
        value: Number(e.target.value),
      },
    })
  }

  return (
    <div className='mb-2'>
      {label && (
        <label htmlFor={name} className='block text-xs lg:text-base xxl:text-lg font-semibold text-gray-600'>
          {labelName}:
        </label>
      )}
      <div className='flex items-center space-x-2'>
        <input
          id={`${name}-min`}
          value={value.min || ''}
          disabled={!edit}
          onChange={handleMinChange}
          type='number'
          autoComplete='off'
          placeholder='Min'
          className={`w-full px-2 mt-1 text-sm py-1 border rounded-md focus:outline-red-200 ${className}`}
        />
        <span>-</span>
        <input
          id={`${name}-max`}
          value={value.max || ''}
          disabled={!edit}
          onChange={handleMaxChange}
          type='number'
          autoComplete='off'
          placeholder='Max'
          className={`w-full px-2 mt-1 text-sm py-1 border rounded-md focus:outline-red-200 ${className}`}
        />
      </div>
    </div>
  )
}

export default InputRange
