import admin from '../firebase.js'

function extractTokenFromHeader(req) {
  const authHeader = req.headers['authorization']
  return authHeader && authHeader.split(' ')[1]
}

export async function authorize(req, res, next) {
  try {
    return next()
    const token = extractTokenFromHeader(req)
    const ruta = req.originalUrl.split('?')[0]
    const method = req.method.toLowerCase()
    const typeUser = ['stylist', 'admin', 'auxiliary']
    const currentHour = new Date().getHours()
    if (!token) return res.status(401).json({ message: 'Not authenticated' })

    const decodedClaims = await admin.auth().verifyIdToken(token)
    const permissions = decodedClaims.claims.permissions || []

    const hasPermission = permissions.some((permission) => permission.module === ruta && permission.actions.includes(method))
    const isWithinAllowedHours = () => {
      return currentHour >= decodedClaims.claims.workingHours.startTime && currentHour < decodedClaims.claims.workingHours.endTime
    }

    if (typeUser.some((user) => user === decodedClaims.claims.role)) {
      if ((isWithinAllowedHours && hasPermission) || method === 'get') {
        return next()
      } else {
        return res.status(403).json({ message: 'Permission denied' })
      }
    } else {
      return res.status(403).json({ message: 'Role not recognized' })
    }
  } catch (error) {
    req.logger.warning('authorize Internal Server Error!', error)
    return res.status(401).json({ message: 'Not authenticated' })
  }
}
