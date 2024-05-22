/* eslint-disable react/prop-types */
import { countries } from '../../utils/utils.js'
import { useState, useEffect } from 'react'

const InputPhone = ({ phoneNumber, setPhoneNumber, edit, className, value }) => {
  const [countryCode, setCountryCode] = useState('')
  const [phone, setPhone] = useState(value)

  useEffect(() => {
    setPhone(value)
    setCountryCode(value)
  }, [value])

  useEffect(() => {
    const getCountryCode = () => {
      if (!phoneNumber) return
      for (const country of countries) {
        if (String(phoneNumber).startsWith(country.indicativo)) {
          setCountryCode(country?.indicativo)
          setPhone(String(phoneNumber).slice(country.indicativo.length))
        }
      }
    }
    getCountryCode()
  }, [phoneNumber])

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value)
    const newPhoneNumber = `${event.target.value}${phone}`
    const customEvent = {
      target: {
        name: 'phone',
        value: newPhoneNumber,
      },
    }
    setPhoneNumber(customEvent)
  }

  const handlePhoneNumberChange = (event) => {
    setPhone(event.target.value)
    const newPhoneNumber = `${countryCode}${event.target.value}`
    const customEvent = {
      target: {
        name: 'phone',
        value: newPhoneNumber,
      },
    }
    setPhoneNumber(customEvent)
  }
  return (
    <div className='mb-2'>
      <label className='block text-xs lg:text-base xxl:text-lg  mb-1 font-semibold text-gray-600'>
        Teléfono:
        <div className='flex '>
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
            className={`w-full sm:text-base lg:text-base xxl:text-lg  px-2 py-0 border rounded-md focus:outline-red-200 ${className}`}
          />
        </div>
      </label>
    </div>
  )
}

export default InputPhone
