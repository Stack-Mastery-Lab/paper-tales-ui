import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <main className="bg-papel min-h-screen text-tinta flex justify-center p-10">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center gap-4 mb-8">
          <img
            src={user?.photo}
            alt={user?.name}
            className="w-24 h-24 rounded-full border-2 border-indigo-200 object-cover"
          />
          <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
        </div>
        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Nombre</span>
            <span>{user?.name}</span>
          </div>
          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Usuario</span>
            <span>{user?.username}</span>
          </div>
          <div className="flex justify-between border-b pb-3">
            <span className="font-semibold">Rol</span>
            <span>{user?.role}</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;