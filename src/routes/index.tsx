import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Home from '../home'
import Login from '../account/auth/login'
import RequireAuth from './requireAuth'
import routestesting from './indexAuthen';
const Routes = () => {
  const routes = useRoutes([
    {
      path: '/home',
      element: <Home />
    },
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
