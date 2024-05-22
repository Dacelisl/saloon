/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { customContext } from '../context/CustomContext'
import Cube from '../utils/Cube'

const WithAuthentication = (allowedRoles) => (WrappedComponent) => {
  const AuthComponent = (props) => {
    const { loggedEmployee, loading } = useContext(customContext)
    if (loading) {
      return <Cube />
    }
    if (loggedEmployee.role !== '') {
      if (allowedRoles.includes(loggedEmployee.role)) {
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
