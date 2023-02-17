import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '../home'
import Login from '../account/auth/login'
const Routes = () => {
  const routes = useRoutes([
    {
      path: '/phuong-tran',
      element: <Home />
    },
    {
      path: 'login',
      element: <Login />
    }
  ])
  return routes
}

export default Routes
