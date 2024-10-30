import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CButton, CFormInput, CFormLabel, CFormTextarea, CForm } from '@coreui/react'

const AssignExercise = ({ userId, token }) => {
  const [exercises, setExercises] = useState([])
  const [newExercise, setNewExercise] = useState({
    exerciseName: '',
    description: '',
  })

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/routines/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setExercises(response.data || [])
      } catch (error) {
        console.error('Error fetching exercises:', error)
      }
    }
    fetchExercises()
  }, [userId, token])

  const handleChange = (e) => {
    setNewExercise({ ...newExercise, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:3001/api/routines',
        { ...newExercise, user: userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      setExercises([...exercises, response.data])
      setNewExercise({ exerciseName: '', description: '' })
    } catch (error) {
      console.error('Error adding exercise:', error)
    }
  }

  return (
    <div>
      <h2>Asignar ejercicios</h2>
      <CForm className="row g-3" onSubmit={handleSubmit}>
        <div className="col-auto">
          <CFormLabel htmlFor="exerciseName" className="visually-hidden">
            Nombre de ejercicio
          </CFormLabel>
          <CFormInput
            type="text"
            id="exerciseName"
            name="exerciseName"
            placeholder="Nombre de ejercicio"
            value={newExercise.exerciseName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-auto">
          <CFormLabel htmlFor="exerciseDescription" className="visually-hidden">
            Descripcion (ej., tiempo, repeticiones)
          </CFormLabel>
          <CFormTextarea
            name="description"
            id="exerciseDescription"
            placeholder="Descripcion (ej., tiempo, repeticiones)"
            value={newExercise.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-auto">
          <CButton type="submit" color="primary" className="mb-3">
            Añadir ejercicio
          </CButton>
        </div>
      </CForm>
      <ul>
        {Array.isArray(exercises) &&
          exercises.map((exercise) => (
            <li key={exercise._id}>
              <h3>{exercise.exerciseName}</h3>
              <p>{exercise.description}</p>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default AssignExercise
