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
export const resizeAndCompress = async (file) => {
  const img = new Image()
  const reader = new FileReader()
  const maxSize = { width: 148, height: 160 }
  return new Promise((resolve) => {
    reader.onload = (e) => {
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = maxSize.width
        canvas.height = maxSize.height
        ctx.drawImage(img, 0, 0, maxSize.width, maxSize.height)
        canvas.toBlob(
          (blob) => {
            resolve(blob)
          },
          'image/jpeg',
          0.8
        )
      } 
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

export const paises = [
  {
    nombre: 'Estados Unidos',
    iso3: 'USA',
    indicativo: '1',
  },
  {
    nombre: 'Colombia',
    iso3: 'COL',
    indicativo: '57',
  },
  {
    nombre: 'España',
    iso3: 'ESP',
    indicativo: '34',
  },
  {
    nombre: 'México',
    iso3: 'MEX',
    indicativo: '52',
  },
  {
    nombre: 'Países Bajos',
    iso3: 'NLD',
    indicativo: '31',
  },
  {
    nombre: 'Argentina',
    iso3: 'ARG',
    indicativo: '54',
  },
  {
    nombre: 'Ecuador',
    iso3: 'ECU',
    indicativo: '593',
  },
  {
    nombre: 'Chile',
    iso3: 'CHL',
    indicativo: '56',
  },
  {
    nombre: 'Venezuela',
    iso3: 'VEN',
    indicativo: '58',
  },
]
