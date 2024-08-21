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
          0.9
        )
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

export function totalPrice(tickets) {
  let total = 0
  tickets.items.forEach(async (item) => {
    total += item.itemPrice * item.quantity
  })
  tickets.totalPayment = total
  return tickets
}

export function formattUpdate(dataUser) {
  if (dataUser.phone) dataUser.phone = dataUser.phone.replace(/\+/, '').replace(/\s/g, '')
  const formattedData = {}
  for (const property in dataUser) {
    if (dataUser[property] !== null && dataUser[property] !== '') {
      if (property === 'dni' || property === 'phone' || property === 'price' || property === 'stock' || property === 'profitEmployee' || property === 'profitSaloon') {
        formattedData[property] = parseInt(dataUser[property], 10)
      } else {
        formattedData[property] = dataUser[property]
      }
    }
  }
  return formattedData
}

const getMonday = (date) => {
  const day = date.getDay() || 7
  if (day !== 1) date.setHours(-24 * (day - 1))
  return date
}

export const getStartOfWeek = () => {
  const now = new Date()
  const monday = getMonday(now)
  const startOfWeek = monday.toISOString().split('T')[0]
  const startOfWeekFormat = formatDate(startOfWeek)
  return startOfWeekFormat
}

export const getEndOfWeek = () => {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 6)
  const saturday = new Date(now.setDate(diff))
  const endOfWeek = saturday.toISOString().split('T')[0]
  return endOfWeek
}

export const getStartOfMonth = () => {
  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfMonth = firstDayOfMonth.toLocaleString('es-CO')
  return startOfMonth
}

export const getEndOfMonth = () => {
  const now = new Date()
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  const endOfMonth = lastDayOfMonth.toLocaleString('es-CO')
  return endOfMonth
}
export function formatDate(date) {
  if (!date) return null
  const parsedDate = new Date(date)
  const year = parsedDate.getFullYear()
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0')
  const day = String(parsedDate.getDate()).padStart(2, '0')
  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}

export const getUpcomingBirthdays = (clients) => {
  const today = new Date()
  const todayDay = today.getDate()
  const todayMonth = today.getMonth() + 1 // Se usa 'getMonth() + 1' para que los meses estén en un rango de 1-12
  // Obtener la fecha de hoy más 7 días
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  const nextWeekDay = nextWeek.getDate()
  const nextWeekMonth = nextWeek.getMonth() + 1

  // Filtrar los clientes que cumplen años entre hoy y los próximos 7 días, ignorando el año
  const upcomingBirthdays = clients.filter((client) => {
    const birthday = new Date(client.dateBirthday)
    const birthdayMonth = birthday.getMonth() + 1
    const birthdayDay = birthday.getDate()

    // Si el cumpleaños está en el mismo mes y cae entre hoy y dentro de los próximos 7 días
    if (birthdayMonth === todayMonth && birthdayDay >= todayDay && birthdayDay <= nextWeekDay) {
      return true
    }

    // Si el cumpleaños está al principio del próximo mes dentro de los próximos 7 días
    if (todayMonth !== nextWeekMonth && birthdayMonth === nextWeekMonth && birthdayDay <= nextWeekDay) {
      return true
    }

    return false
  })

  // Formatear para mostrar los cumpleaños próximos
  const formattedUpcomingBirthdays = upcomingBirthdays.map((client) => {
    const birthday = new Date(client.dateBirthday)
    const birthdayMonth = birthday.toLocaleString('default', { month: 'long' })
    const birthdayDay = birthday.getUTCDate()
    return {
      id: client.id,
      name: `${client.firstName} ${client.lastName}`,
      date: `${birthdayMonth} ${birthdayDay}`,
      birthdayDate: birthday,
    }
  })

  // Ordenar los cumpleaños por fecha (día y mes)
  const sortedData = formattedUpcomingBirthdays.sort((a, b) => {
    const dateA = new Date(2000, a.birthdayDate.getMonth(), a.birthdayDate.getDate())
    const dateB = new Date(2000, b.birthdayDate.getMonth(), b.birthdayDate.getDate())
    return dateA.getTime() - dateB.getTime()
  })

  return sortedData
}

export const countries = [
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
