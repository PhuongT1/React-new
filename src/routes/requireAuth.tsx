import { Navigate, Outlet } from 'react-router-dom'
import TokenServiceNew from '../services/token.service'
import Layout from '../layout'

const RequireAuth = () => {
  const user = TokenServiceNew.getAuth()

  if (!user?.access_token ) {
    return <Navigate to="/login" replace />
  }
  return <Layout />
}

export default  RequireAuth
