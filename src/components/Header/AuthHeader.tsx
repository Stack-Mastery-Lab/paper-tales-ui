import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { LogOut, Shield } from 'lucide-react';


interface AuthHeaderProps {
  onToggleMenu: () => void;
}

export const AuthHeader = ({ onToggleMenu }: AuthHeaderProps) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleMenu}
          className="text-2xl text-gray-800 hover:bg-gray-100 p-1 rounded-md transition-colors"
        >
           ☰
        </button>
        <span className="text-xl font-bold text-gray-800 tracking-tight">
          Relatos de Papel
        </span>
      </div>
      <div className="flex items-center gap-6">
        {user && (
          <div className="flex items-center gap-3">
            <img
              src={user.photo}
              alt={user.name}
              className="w-10 h-10 rounded-full border border-gray-200 object-cover"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-700">{user.name}</span>
              <span className="flex items-center gap-1 text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full w-fit">
                <Shield size={10} />
                {user.role}
              </span>
            </div>
          </div>
        )}
        <button
          className="flex items-center gap-2 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          onClick={handleLogout}
        >
          <LogOut size={16} />

        </button>
      </div>
    </nav>
  );
};