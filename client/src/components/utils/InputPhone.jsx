/* eslint-disable react/prop-types */
import { countries } from '../../utils/utils.js'
import { useState, useEffect } from 'react'

const InputPhone = ({ phoneNumber, setPhoneNumber, edit, className }) => {
  const [countryCode, setCountryCode] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (phoneNumber) {
      const phoneStr = String(phoneNumber).replace(/\+/g, '').replace(/\s/g, '')
      const country = countries.find((c) => phoneStr.startsWith(c.indicativo))
      if (country) {
        setCountryCode(country.indicativo)
        setPhone(phoneStr.slice(country.indicativo.length))
      }
    }
  }, [phoneNumber])

  const handleCountryCodeChange = (event) => {
    const newCountryCode = event.target.value
    setCountryCode(newCountryCode)

    const newPhoneNumber = `${newCountryCode}${phone}`
    setPhoneNumber({
      target: {
        name: 'phone',
        value: newPhoneNumber,
      },
    })
  }

  const handlePhoneNumberChange = (event) => {
    const newPhone = event.target.value
    setPhone(newPhone)

    const newPhoneNumber = `${countryCode}${newPhone}`
    setPhoneNumber({
      target: {
        name: 'phone',
        value: newPhoneNumber,
      },
    })
  }

  return (
    <div className='mb-2'>
      <label className='block text-xs lg:text-base xxl:text-lg mb-1 font-semibold text-gray-600'>
        Teléfono:
        <div className='flex'>
          <select name='code' disabled={edit} value={countryCode} onChange={handleCountryCodeChange} className='focus:outline-red-200 mr-1'>
            {countries.map((country) => (
              <option key={country.nombre} value={country.indicativo}>
                {`+${country.indicativo}`}
              </option>
            ))}
          </select>
          <input
            type='tel'
            id='phone'
            autoComplete='off'
            name='phone'
            disabled={edit}
            value={phone}
            onChange={handlePhoneNumberChange}
            className={`w-full sm:text-base lg:text-base xxl:text-lg px-2 py-0 border rounded-md focus:outline-red-200 ${className}`}
          />
        </div>
      </label>
    </div>
  )
}

export default InputPhone
