import axios from 'axios'

export const fetchUserRole = async (token) => {
  try {
    const response = await axios.get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data.role
  } catch (error) {
    console.error('Error obteniendo rol de usuario:', error)
    throw error
  }
}
