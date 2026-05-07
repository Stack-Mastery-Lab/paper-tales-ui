import { useAuth } from '../context/AuthContext';
import { OrderHistory } from '../components/Profile/OrderHistory';

const Profile = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <main className="max-w-7xl mx-auto p-6 md:p-8 space-y-12">
      <div className="w-full bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex flex-col items-center gap-4 shrink-0">
          <img
            src={user.photo}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-gray-50 shadow-sm object-cover"
          />
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">{user.name}</h1>
        </div>
        <div className="flex-1 w-full space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg w-full">
            <span className="text-sm font-medium text-gray-500">Nombre</span>
            <span className="font-semibold text-gray-800">{user.name}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg w-full">
            <span className="text-sm font-medium text-gray-500">Usuario</span>
            <span className="font-semibold text-gray-800">{user.username}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg w-full">
            <span className="text-sm font-medium text-gray-500">Rol</span>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full uppercase tracking-wider">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      <section className="w-full">
        <OrderHistory userId={user.id} />
      </section>
    </main>
  );
};

export default Profile;