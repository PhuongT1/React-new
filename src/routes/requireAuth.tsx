import { Navigate, Outlet } from 'react-router-dom'
import TokenServiceNew from '../services/token.service'
import LayoutDefault, { LayoutBasic } from '../layout'
import { useLocation } from 'react-router-dom'

const RequireAuth = ({ children }: any) => {
  const location = useLocation()
  console.log('location', location)
  const user = TokenServiceNew.getAuth()

  if (!user?.access_token) {
    return <Navigate to="/login" replace />
  }
  const layout = children ? <LayoutBasic /> : <LayoutDefault />
  return layout
}

export default RequireAuth
