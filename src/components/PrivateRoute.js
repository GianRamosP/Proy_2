// PrivateRoute.js
import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated) // Ajusta esto según tu estado

  return <Route {...rest} element={isAuthenticated ? element : <Navigate to="/login" />} />
}

export default PrivateRoute
