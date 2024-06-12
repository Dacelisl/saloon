import { Types } from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.resolve(__filename, '../../')

function parsedQuery(query) {
  const response = {}
  const keyValuePairs = query.split('&')
  keyValuePairs.forEach((keyValuePair) => {
    const [key, value] = keyValuePair.split(':')
    response[key] = value
  })
  return response
}
function isValid(id) {
  if (!Types.ObjectId.isValid(id)) {
    return {
      status: 'Fail',
      code: 400,
      payload: {},
      message: 'invalid format, must be ObjectId',
    }
  }
}

function totalPrice(tickets) {
  let total = 0
  tickets.items.forEach(async (item) => {
    total += parseInt(item.itemPrice)
  })
  tickets.totalPayment = total
  return tickets
}

function timeDifference(connectionTime, timeMinutes) {
  const lastConnectionTime = new Date(connectionTime)
  const currentTime = new Date()
  const timeDifference = currentTime - lastConnectionTime
  const hoursDifference = timeDifference / (1000 * 60)
  return hoursDifference > timeMinutes
}
function randomTicketNumber() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
  let code = ''
  for (let i = 0; i < 7; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length)
    code += caracteres.charAt(indiceAleatorio)
  }
  return code
}
function randomCode(length) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let code = ''
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * caracteres.length)
    code += caracteres.charAt(index)
  }
  return code
}
function convertCurrencyToNumber(currencyString) {
  const numericValue = parseFloat(currencyString.replace('$', '').trim())
  return isNaN(numericValue) ? 0 : numericValue
}
function sendErrorResponse(res, error) {
  return res.status(500).json({
    status: 'error',
    code: 500,
    message: `Something went wrong: ${error.message}`,
    payload: {},
  })
}
function sendSuccessResponse(res, data) {
  return res.status(data.code).json({
    status: data.status,
    code: data.code,
    message: data.message,
    payload: data.payload,
  })
}

function formatDate(date) {
  if (!date) return null
  const parsedDate = new Date(date)
  const year = parsedDate.getFullYear()
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0')
  const day = String(parsedDate.getDate()).padStart(2, '0')
  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}
function convertToMongoDate(simpleDate) {
  const jsDate = new Date(simpleDate)
  const isoDate = jsDate.toISOString()
  return isoDate
}
function formatCurrency(amount) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount)
}
function formatPercentage(percentage) {
  return `${percentage.toFixed(2)}%`
}
function extractFunctionAndFile(error) {
  const stackLines = error.stack.split('\n')
  const callSite = stackLines[stackLines.length - 1]
  const [beforeParentheses, insideParentheses] = callSite.split(/\(([^)]+)\)/)
  const filePathPart = insideParentheses.split('/src/')[1]
  const fileName = filePathPart.split('/').pop()
  const functionName = beforeParentheses.split('.').pop()
  return { functionName, fileName }
}
export {
  __filename,
  __dirname,
  parsedQuery,
  isValid,
  randomCode,
  convertToMongoDate,
  convertCurrencyToNumber,
  extractFunctionAndFile,
  timeDifference,
  randomTicketNumber,
  formatCurrency,
  formatPercentage,
  formatDate,
  totalPrice,
  sendErrorResponse,
  sendSuccessResponse,
}
