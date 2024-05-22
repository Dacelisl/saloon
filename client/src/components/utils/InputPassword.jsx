/* eslint-disable react/prop-types */
import { useState } from 'react'

const InputPassword = ({ label = true, labelName, value, edit = false, onChange, name, className = '' }) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='mb-2'>
      {label && (
        <label htmlFor={name} className='block text-sm mb-1 lg:text-base xxl:text-lg font-semibold text-gray-600'>
          {labelName}:
        </label>
      )}
      <div className='relative'>
        <input
          id={name}
          value={value || ''}
          disabled={!edit}
          onChange={onChange}
          type={showPassword ? 'text' : 'password'}
          autoComplete='off'
          name={name}
          placeholder={label ? '' : labelName}
          className={`w-full px-3 py-0 border rounded-md focus:outline-red-200 ${className}`}
        />
        <button type='button' className='absolute top-2 right-0 mr-2 font-semibold text-zinc-400' onClick={toggleShowPassword}>
          {!showPassword ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
    </div>
  )
}

export default InputPassword
