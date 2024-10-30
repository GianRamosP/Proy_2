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

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post('/api/auth/login', loginData)

    // Guarda el token en localStorage
    localStorage.setItem('token', response.data.token)

    // Guarda el userId en localStorage
    localStorage.setItem('userId', response.data.userId)

    return response.data
  } catch (error) {
    console.error('Error iniciando sesión:', error)
    throw error
  }
}
