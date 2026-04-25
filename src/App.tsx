import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AuthLayout from "./components/Layout/AuthLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useAuth } from './context/AuthContext';
import Dashboard from "./pages/Dashboard";
import { Books } from "./pages/Books";

function App() {
  console.log("🔄 [App] render");

  const { isLoggedIn } = useAuth();

  return (

    <Routes>
      {isLoggedIn ? (
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      ) : (
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="books" element={<Books />} />
        </Route>
      )}
    </Routes>
    
  )
}
export default App
