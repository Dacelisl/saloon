import bcryptjs from 'bcryptjs'

export const isValidPassword = (password, hashPassword) => bcryptjs.compareSync(password, hashPassword)

export function PasswordValid(password) {
  if (password.length < 6) {
    return false
  }
  const hasLowercase = /[a-z]/.test(password)
  const hasUppercase = /[A-Z]/.test(password)
  const hasDigit = /\d/.test(password)

  return hasLowercase && hasUppercase && hasDigit
}
export const paises = [
  {
    nombre: 'Estados Unidos',
    iso3:'USA',
    indicativo: '1',
  },
  {
    nombre: 'Colombia',
    iso3:'COL',
    indicativo: '57',
  },
  {
    nombre: 'España',
    iso3:'ESP',
    indicativo: '34',
  },
  {
    nombre: 'México',
    iso3:'MEX',
    indicativo: '52',
  },
  {
    nombre: 'Países Bajos',
    iso3:'NLD',
    indicativo: '31',
  },
  {
    nombre: 'Argentina',
    iso3:'ARG',
    indicativo: '54',
  },
  {
    nombre: 'Ecuador',
    iso3:'ECU',
    indicativo: '593',
  },
  {
    nombre: 'Chile',
    iso3:'CHL',
    indicativo: '56',
  },
  {
    nombre: 'Venezuela',
    iso3:'VEN',
    indicativo: '58',
  },
]

