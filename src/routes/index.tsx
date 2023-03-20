import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import routeAdmin from './admin'
import RequireAuth from './requireAuth'

const Login = React.lazy(() => import('../account/auth/login'))
const Routes = () => {
  const routes = useRoutes([
    {
      path: '',
      element: <Navigate to="/admin/member-manage" replace />
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: '/admin',
      element: <RequireAuth />,
      children: routeAdmin
    }
  ])
  return routes
}

export default Routes
