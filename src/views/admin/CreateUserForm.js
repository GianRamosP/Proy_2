import React, { useState } from 'react'
import { createUser } from '../../api/userApi'

const CreateUserForm = ({ token, fetchUsers }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  })
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null) // Resetea el error al enviar un nuevo formulario
    try {
      await createUser(token, formData)
      fetchUsers() // Actualiza la lista de usuarios después de la creación
      setFormData({ name: '', email: '', password: '', role: 'user' })
    } catch (error) {
      setError(error.response?.data?.message || 'Error creando usuario')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>
      <button type="submit">Crear Usuario</button>
    </form>
  )
}

export default CreateUserForm
