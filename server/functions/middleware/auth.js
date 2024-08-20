import admin from '../firebase.js'

function extractTokenFromHeader(req) {
  const authHeader = req.headers['authorization']
  return authHeader && authHeader.split(' ')[1]
}

export async function authorize(req, res, next) {
  try {
    const token = extractTokenFromHeader(req)
    const ruta = req.originalUrl.split('?')[0]
    const method = req.method.toLowerCase()

    const currentHour = new Date().getHours()
    if (!token) return res.status(401).json({ message: 'Not authenticated' })

    const decodedClaims = await admin.auth().verifyIdToken(token)
    const permissions = decodedClaims.claims.permissions || []

    const hasPermission = permissions.some((permission) => permission.module === ruta && permission.actions.includes(method))
    if (decodedClaims.claims.role === 'admin') {
      return next()
    } else if (decodedClaims.claims.role === 'stylist') {
      const isWithinAllowedHours = currentHour >= 7 && currentHour < 20
      if (isWithinAllowedHours || method === 'get') {
        if (hasPermission) {
          return next()
        } else {
          return res.status(403).json({ message: 'Permission denied' })
        }
      } else {
        return res.status(403).json({ message: 'Action not allowed outside of permitted hours' })
      }
    } else {
      return res.status(403).json({ message: 'Role not recognized' })
    }
  } catch (error) {
    req.logger.warning('authorize Internal Server Error!', error)
    return res.status(401).json({ message: 'Not authenticated' })
  }
}
