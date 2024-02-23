export async function registeredUser(req, res, next) {
  try {
    if (req.session.user) next()
    else {
      console.log('no esta registrado')
    }
  } catch (error) {
    console.log('error auth', error)
  }
}

export function adminAccess(req, res, next) {
  try {
    if (req.session.user.rol === 'admin') {
      return next()
    } else {
      const ruta = req.originalUrl
      req.logger.warning(`Unauthorized access  ${req.method} ${ruta}`)
      return res.status(403).json({ error: 'authorization error!', code: 403 })
    }
  } catch (error) {
    req.logger.warning('Internal Server Error!', error)
    return res.status(500).json({ error: 'Internal Server Error', code: 500 })
  }
}

export function isUser(req, res, next) {
  if (req.user?.rol !== 'admin') {
    return next()
  }
  req.logger.warning(`authorization error  ${req.method} ${ruta} from ${funcion}`)
  return res.status(403).render('error', { error: 'authorization error!', code: 403 })
}
