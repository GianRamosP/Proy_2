import Exercises from '../../views/exercises/Exercises'

const WelcomeLogin = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        ¡Bienvenido de nuevo {user?.name || 'Usuario'}! Nos alegra tenerte aquí.
      </h1>
      {/* <Exercises token={localStorage.getItem('token')} /> */}
      <div className="space-y-6"></div>
    </div>
  )
}

export default WelcomeLogin
