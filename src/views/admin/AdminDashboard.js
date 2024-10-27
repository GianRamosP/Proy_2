import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import CreateUserForm from './CreateUserForm'
import UserEditForm from './EditUserForm'

const AdminDashboard = () => {
  const [userRole, setUserRole] = useState(null)
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null) // Estado para el usuario seleccionado para edición
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

  const handleEditClick = (user) => {
    setSelectedUser(user) // Seleccionar usuario para edición
  }

  const handleSave = async (updatedUser) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/users/${updatedUser._id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      setUsers(users.map((user) => (user._id === updatedUser._id ? response.data : user)))
      setSelectedUser(null) // Limpiar el estado de edición
    } catch (error) {
      console.error('Error al actualizar usuario:', error)
    }
  }

  const handleDeleteClick = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      setUsers(users.filter((user) => user._id !== userId)) // Actualizar la lista de usuarios
    } catch (error) {
      console.error('Error al eliminar usuario:', error)
    }
  }

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
            <button onClick={() => handleEditClick(user)}>Editar</button>
            <button onClick={() => handleDeleteClick(user._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {selectedUser && (
        <UserEditForm
          user={selectedUser}
          onSave={handleSave}
          onCancel={() => setSelectedUser(null)}
        />
      )}
    </div>
  )
}

export default AdminDashboard
