import { Navigate, Outlet } from 'react-router-dom'
import TokenService from '../services/token.service'
import routestesting from './indexAuthen';
const RequireAuth = () => {
  const user = TokenService.getAuth()

  if (!user?.access_token) {
    return <Navigate to="/login" replace />
  }
  return <Outlet  />
}

export default  RequireAuth
