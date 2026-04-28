import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock } from 'lucide-react';
import data from "../data/user.json";
import { useState } from 'react';
import type { User } from '../types/user';
import { Loading } from '../components/Loading';
import  { type FormEvent } from 'react';



const Login = () => {


  const users: User[] = data as User[];
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const userFound: User | undefined = users.find(
      (u) => u.username === username && u.password === password
    );
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (userFound) {
      login(userFound);
      navigate('/');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
     setIsLoading(false);
  };


  if (isLoading) {
    return <Loading />;
  }


  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bienvenido</h1>
          <p className="text-gray-500 mt-2">Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Usuario o correo electrónico"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg mt-2"
          >
            <LogIn size={18} />
            Iniciar Sesión
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿No tienes cuenta? <a href="#" className="text-indigo-600 font-semibold hover:underline">Regístrate</a>
        </p>
      </div>
    </div>
  );
};

export default Login;