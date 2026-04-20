import { useAuth } from "../../AuthContext"
import { useNavigate } from 'react-router-dom'

export const AuthNavbar = () => {
   const navigate = useNavigate()
   const { logout } = useAuth()

   const handleLogin = () => {
   
   logout(); 
    navigate('/')
  }

  return (
    <>
    <div className="flex flex-row justify-between items-center p-4 bg-gray-800 text-white">
      <span >Relatos de Papel</span>
      <div className="flex flex-row gap-4">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>
          Cerrar Sesión
        </button>
      </div>
      </div>
    </>
  )
}
