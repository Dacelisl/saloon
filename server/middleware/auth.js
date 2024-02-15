import admin from '../../firebase.js'

export async function registeredUser(req, res, next) {
  try {
    const user = req.session.user
    console.log('datos de usuario en middleware', req.session);
    if (user) {
      console.log('es registrado');
      next()
    } else {
      console.log('no registrado en middleware', user);
      return res.status(401).json({ error: 'Authentication Error!', code: 401 })
    }
  } catch (error) {
    req.logger.warning('Authentication Error!', error)
    return res.status(500).json({ error: 'Internal Server Error', code: 500 })
  }
}

export function adminAccess(req, res, next) {
  try {
    console.log('admin', req.session.user);
    if (req.user.rol === 'admin') {
      return next()
    } else {
      console.log('es registrado pero no admin');
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
