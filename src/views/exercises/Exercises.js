import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CFormCheck } from '@coreui/react' // Asegúrate de tener esto importado

const Exercises = () => {
  const [exercises, setExercises] = useState([])
  const [selectedExercises, setSelectedExercises] = useState([]) // Estado para ejercicios seleccionados
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  useEffect(() => {
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

  const handleCheckboxChange = (exerciseId) => {
    setSelectedExercises((prevSelected) => {
      if (prevSelected.includes(exerciseId)) {
        // Si el ejercicio ya está seleccionado, lo eliminamos
        return prevSelected.filter((id) => id !== exerciseId)
      } else {
        // Si no está seleccionado, lo añadimos
        return [...prevSelected, exerciseId]
      }
    })
  }

  if (!userId) {
    return <div>User ID is missing. Please log in again.</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rutina / ejercicios</h1>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {Array.isArray(exercises) && exercises.length > 0 ? (
          exercises.map((exercise) => (
            <li key={exercise._id} className="border-b border-gray-300 py-2 flex items-center">
              <CFormCheck
                id={exercise._id}
                label={exercise.exerciseName}
                checked={selectedExercises.includes(exercise._id)}
                onChange={() => handleCheckboxChange(exercise._id)}
              />
              <p className="ml-4">{exercise.description}</p>
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
