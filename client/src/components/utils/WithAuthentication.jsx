import { useContext, lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { customContext } from '../context/CustomContext'
const Cube = lazy(() => import('../utils/Cube.jsx'))

const WithAuthentication = (allowedRoles) => (WrappedComponent) => {
  const AuthComponent = (props) => {
    const { loggedEmployee, loading } = useContext(customContext)
    if (loading) {
      return (
        <div className='flex absolute top-[25%] left-[50%]'>
          <Cube />
        </div>
      )
    }
    if (loggedEmployee) {
      if (loggedEmployee.role !== '' && allowedRoles.includes(loggedEmployee.role)) {
        return <WrappedComponent {...props} />
      } else {
        return <Navigate to='/403' />
      }
    }
    return <Navigate to='/login' />
  }

  return AuthComponent
}

export default WithAuthentication
