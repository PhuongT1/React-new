import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import routeAdmin from './admin';
const Login = React.lazy(() => import('../account/auth/login'));
const RequireAuth = React.lazy(() => import('./requireAuth'));

const Routes = () => {
  const routes = useRoutes([
    {
      path: '',
      element: <Navigate to="/admin/member-manage" replace  />
    },
    {
      path: 'login',
      element: <Login />,
      
    },
    {
      path: '/admin',
      element: <RequireAuth />,
      children: routeAdmin
    },
  ])
  return routes
}

export default Routes
