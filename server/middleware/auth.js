export async function registeredUser(req, res, next) {
  try {
    next()
    /* if (req.session.user) next()
    else {
      console.log('no esta registrado')
    } */
  } catch (error) {
    console.log('error auth', error)
  }
}

export function adminAccess(req, res, next) {
  try {
    next()
    /* if (req.session.user.rol === 'admin') {
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
    } */
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
