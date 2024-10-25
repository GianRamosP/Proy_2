import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { deleteUser, updateUser, createUser } from '../../api/userApi'

const AdminDashboard = () => {
  const [userRole, setUserRole] = useState(null)
  const [users, setUsers] = useState([]) // Estado para almacenar la lista de usuarios
  const token = localStorage.getItem('token') // Recupera el token de localStorage

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return // Si no hay token, no hacer nada

      try {
        const response = await axios.get('http://localhost:3001/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`, // Envía el token
            'Content-Type': 'application/json',
          },
        })
        setUserRole(response.data.role) // Establece el rol del usuario
      } catch (error) {
        console.error('Error obteniendo rol de usuario:', error.response.data)
      }
    }

    const fetchUsers = async () => {
      if (!token) return // Si no hay token, no hacer nada

      try {
        const response = await axios.get('http://localhost:3001/api/users', {
          headers: {
            Authorization: `Bearer ${token}`, // Envía el token
            'Content-Type': 'application/json',
          },
        })
        setUsers(response.data) // Almacena la lista de usuarios en el estado
      } catch (error) {
        console.error('Error obteniendo usuarios:', error)
      }
    }

    fetchUserData() // Llama a fetchUserData
    fetchUsers() // Llama a fetchUsers
  }, [token])

  // Verificar si el rol no es 'admin'
  if (userRole !== 'admin') {
    return <p>Acceso denegado</p>
  }

  return (
    <div>
      <h1>Panel de Administrador</h1>
      <button onClick={() => createUser(token, { name: 'Nuevo Usuario', role: 'user' })}>
        Crear Usuario
      </button>
      <button onClick={() => updateUser('userId', token, { name: 'Usuario Actualizado' })}>
        Actualizar Usuario
      </button>
      <button onClick={() => deleteUser('userId', token)}>Eliminar Usuario</button>
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
