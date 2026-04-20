import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = () => {
   
    login()
    navigate('/')
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col gap-4">
      <h1>Login</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Username" className="border p-2 rounded" />
        <input type="password" placeholder="Password" className="border p-2 rounded" />
      </form>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  )
}

export default Login;