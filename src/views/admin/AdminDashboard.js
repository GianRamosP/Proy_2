import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import CreateUserForm from './CreateUserForm'

const AdminDashboard = () => {
  const [userRole, setUserRole] = useState(null)
  const [users, setUsers] = useState([])
  const token = localStorage.getItem('token')

  const fetchUserData = async () => {
    if (!token) return
    try {
      const response = await axios.get('http://localhost:3001/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      setUserRole(response.data.role)
    } catch (error) {
      console.error(
        'Error obteniendo rol de usuario:',
        error.response?.data?.message || error.message,
      )
    }
  }

  const fetchUsers = useCallback(async () => {
    if (!token) return
    try {
      const response = await axios.get('http://localhost:3001/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      setUsers(response.data)
    } catch (error) {
      console.error('Error obteniendo usuarios:', error)
    }
  }, [token])

  useEffect(() => {
    fetchUserData()
    fetchUsers()
  }, [token, fetchUsers])

  if (userRole !== 'admin') {
    return <p>Acceso denegado</p>
  }

  return (
    <div>
      <h1>Panel de Administrador</h1>
      <CreateUserForm token={token} fetchUsers={fetchUsers} />
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminDashboard
