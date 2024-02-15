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
