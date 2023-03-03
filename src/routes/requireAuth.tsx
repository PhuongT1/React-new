import { Navigate, Outlet } from 'react-router-dom'
import TokenServiceNew from '../services/token.service'
import routestesting from './indexAuthen';
import Home from '../home'
const RequireAuth = () => {
  const user = TokenServiceNew.getAuth()

  if (!user?.access_token ) {
    return <Navigate to="/login" replace />
  }
  return <Home />
}

export default  RequireAuth
