import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AuthLayout from "./components/Layout/AuthLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useAuth } from './AuthContext';
import Dashboard from "./pages/Dashboard";

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
        </Route>
      )}
    </Routes>
    
  )
}
export default App
