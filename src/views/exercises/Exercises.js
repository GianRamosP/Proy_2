import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Exercises = () => {
  const [exercises, setExercises] = useState([])
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    // Verificar si el token y userId están presentes
    if (!token) {
      console.warn('Token is missing.')
    } else {
      console.log('Token found:', token)
    }

    if (!userId) {
      console.error('User ID is missing.')
      return
    } else {
      console.log('User ID found:', userId)
    }

    console.log(`Fetching exercises for user ID: ${userId}`)

    const fetchExercises = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/routines/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log('Exercises fetched successfully:', response.data)
        setExercises(response.data || [])
      } catch (error) {
        console.error('Error fetching exercises:', error)
      }
    }

    fetchExercises()
  }, [userId, token])

  if (!userId) {
    return <div>User ID is missing. Please log in again.</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Exercises</h1>
      <p className="text-body-secondary float-start">Screen Exercises</p>

      <ul>
        {Array.isArray(exercises) && exercises.length > 0 ? (
          exercises.map((exercise) => (
            <li key={exercise._id} className="border-b border-gray-300 py-2">
              <h3 className="text-lg font-semibold">{exercise.exerciseName}</h3>
              <p>{exercise.description}</p>
            </li>
          ))
        ) : (
          <p>No hay ejercicios disponibles.</p>
        )}
      </ul>
    </div>
  )
}

export default Exercises
