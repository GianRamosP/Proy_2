import axios from 'axios'

export const deleteUser = async (userId, token) => {
  try {
    const response = await axios.delete(`/api/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    console.log(response.data.message) // console para usuario eliminado
  } catch (error) {
    console.error('Error eliminando usuario:', error.response.data.message)
  }
}

export const updateUser = async (userId, token, updatedData) => {
  try {
    const response = await axios.put(`/api/admin/users/${userId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    console.log('Usuario actualizado:', response.data)
  } catch (error) {
    console.error('Error actualizando usuario:', error.response.data.message)
  }
}

export const createUser = async (token, newUserData) => {
  try {
    const response = await axios.post('/api/admin/users', newUserData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    console.log('Usuario creado:', response.data)
  } catch (error) {
    console.error('Error creando usuario:', error.response.data.message)
  }
}
