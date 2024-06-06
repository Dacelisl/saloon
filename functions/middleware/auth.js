export function registeredUser(req, res, next) {
  try {
    console.log('usuario en sessions', req.session)
    if (req.session.user) {
      next()
    } else {
      console.log('no esta registrado')
      res.status(401).json({ message: 'Not authenticated' })
    }
  } catch (error) {
    req.logger.warning('registeredUser Internal Server Error!', error)
    next(error)
  }
}

export function adminAccess(req, res, next) {
  try {
    if (req.session.user.rol === 'admin') {
      return next()
    } else {
      const ruta = req.originalUrl
      req.logger.warning(`Unauthorized access  ${req.method} ${ruta}`)
      return res.status(403).json({
        status: 'error',
        code: 403,
        message: `authorization error!`,
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
