import admin from '../firebase.js'

function extractTokenFromHeader(req) {
  const authHeader = req.headers['authorization']
  return authHeader && authHeader.split(' ')[1]
}

export async function registeredUser(req, res, next) {
  try {
    const token = extractTokenFromHeader(req)
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' })
    }
    next()
  } catch (error) {
    req.logger.warning('registeredUser Internal Server Error!', error)
    res.status(401).json({ message: 'Not authenticated' })
  }
}

export async function adminAccess(req, res, next) {
  try {
    const token = extractTokenFromHeader(req)
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' })
    }
    const decodedClaims = await admin.auth().verifyIdToken(token)
    if (decodedClaims.rol === 'admin') {
      return next()
    } else {
      const ruta = req.originalUrl
      req.logger.warning(`Unauthorized access  ${req.method} ${ruta}`)
      return res.status(403).json({
        status: 'error',
        code: 403,
        message: `authorization error!: ${error}`,
        payload: {},
      })
    }
  } catch (error) {
    req.logger.warning('Internal Server Error!', error)
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: `Internal Server Error!: ${error}`,
      payload: {},
    })
  }
}
