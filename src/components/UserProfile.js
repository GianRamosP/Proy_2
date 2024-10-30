import React, { useState } from 'react'
import AssignExercise from './AssignExercise'

const UserProfile = ({ user, token }) => {
  const [showAssignExercise, setShowAssignExercise] = useState(false)

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <button onClick={() => setShowAssignExercise(!showAssignExercise)}>
        {showAssignExercise ? 'Close Assign Exercises' : 'Assign Exercises'}
      </button>
      {showAssignExercise && <AssignExercise userId={user._id} token={token} />}
    </div>
  )
}

export default UserProfile
