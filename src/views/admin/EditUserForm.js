import React, { useState } from 'react'

const UserEditForm = ({ user, onSave, onCancel }) => {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...user, name, email }) // Llama a la función de guardado con los nuevos datos
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Editar Usuario</h3>
      <label>
        Nombre:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  )
}

export default UserEditForm
