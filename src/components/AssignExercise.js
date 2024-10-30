import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
      <h2>Assign Exercises</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="exerciseName"
          placeholder="Exercise Name"
          value={newExercise.exerciseName}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description (e.g., time, repetitions)"
          value={newExercise.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Exercise</button>
      </form>
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
