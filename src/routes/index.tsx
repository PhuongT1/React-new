import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import routeDefault from './admin'
import RequireAuth from './requireAuth'
import routeNftManage from './nft-manage'

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
      children: routeDefault
    },
    {
      path: '/admin',
      element: <RequireAuth>{true}</RequireAuth>,
      children: [
        {
          path: 'nft-manage',
          element: <Outlet />,
          children: routeNftManage
        }
      ]
    }
  ])
  return routes
}

export default Routes
