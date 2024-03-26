/* eslint-disable react/prop-types */
import { countries } from '../../utils/utils.js'
import { useState, useEffect } from 'react'

const InputPhone = ({ phoneNumber, setPhoneNumber, edit }) => {
  const [countryCode, setCountryCode] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    const getCountryCode = () => {
      if (!phoneNumber) return
      const phoneFormatt = phoneNumber.replace(/\+/, '').replace(/\s/g, '')
      for (const country of countries) {
        if (phoneFormatt.startsWith(country.indicativo)) {
          setCountryCode(country.indicativo)
          setPhone(phoneFormatt.slice(countryCode.length))
        }
      }
    }
    getCountryCode()
  }, [countryCode, phoneNumber])

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value)
    const newPhoneNumber = `${event.target.value}${phone}`
    setPhoneNumber((prev) => ({ ...prev, ['phone']: newPhoneNumber }))
  }

  const handlePhoneNumberChange = (event) => {
    setPhone(event.target.value)
    const newPhoneNumber = `${countryCode}${event.target.value}`
    setPhoneNumber((prev) => ({ ...prev, ['phone']: newPhoneNumber }))
  }
  return (
    <div className='mb-2'>
      <label className='block text-xs font-semibold text-gray-600'>
        Teléfono:
        <div className='inline-flex'>
          <select name='code' disabled={edit} value={countryCode} onChange={handleCountryCodeChange}>
            {countries.map((country) => (
              <option key={country.nombre} value={country.indicativo}>
                {`+${country.indicativo}`}
              </option>
            ))}
          </select>
          <input type='tel' id='phone' autoComplete='off' name='phone' disabled={edit}  value={phone} onChange={handlePhoneNumberChange} className='w-full px-2 py-1 border rounded-md' />
        </div>
      </label>
    </div>
  )
}

export default InputPhone
