/* eslint-disable react/prop-types */
const InputEdit = ({ label, value, edit, inputChange, type, name }) => {
  return (
    <div className='mb-2'>
      <label className='block text-xs font-semibold text-gray-600'>
        {label}:
        <input value={value} disabled={edit} onChange={inputChange} type={type} autoComplete='off' name={name} className='w-full px-2 py-1 border rounded-md' />
      </label>
    </div>
  )
}

export default InputEdit
