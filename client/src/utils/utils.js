import bcryptjs from 'bcryptjs'
import { createCanvas, loadImage } from 'canvas'

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

const readFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};
export const resizeAndCompress = async (file) => {
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024
  if (file.size > MAX_IMAGE_SIZE) {
    console.error('La imagen es demasiado grande. Tamaño máximo permitido:', MAX_IMAGE_SIZE)
    return null // Puedes manejar este caso según tus necesidades
  }

  const arrayBuffer = await  readFileAsArrayBuffer(file);

  // Crear un objeto Uint8Array a partir del ArrayBuffer
  const uint8Array = new Uint8Array(arrayBuffer)

  // Crear un objeto Blob con el Uint8Array
  const blob = new Blob([uint8Array], { type: file.type })

  const img = await loadImage(URL.createObjectURL(blob))
  const canvas = createCanvas(180, 190)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, 180, 190)
  console.log('img ctk', ctx)

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob)
      },
      'image/jpeg',
      0.8
    ) // Puedes ajustar el tipo y la calidad según tus necesidades
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
