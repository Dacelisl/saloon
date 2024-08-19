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
    if (!token) return res.status(401).json({ message: 'Not authenticated' })

    const decodedClaims = await admin.auth().verifyIdToken(token)
    const permissions = decodedClaims.permissions || []

    const hasPermission = permissions.some((permission) => permission.module === ruta && permission.actions.includes(method))
    if (hasPermission) {
      return next()
    } else {
      return res.status(403).json({ message: 'Permission denied' })
    }
  } catch (error) {
    req.logger.warning('authorize Internal Server Error!', error)
    res.status(401).json({ message: 'Not authenticated' })
  }
}
