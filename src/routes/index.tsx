import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import routestesting from './manage';
const Login = React.lazy(() => import('../account/auth/login'));
const RequireAuth = React.lazy(() => import('./requireAuth'));

const Routes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/admin/member-manage" replace  />
    },
    {
      path: 'login',
      element: <Login />,
      
    },
    {
      path: '/admin',
      element: <RequireAuth />,
      children: routestesting
    },
  ])
  return routes
}

export default Routes
