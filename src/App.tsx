import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AuthLayout from "./components/Layout/AuthLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useAuth } from './context/AuthContext';
import Dashboard from "./components/Layout/Dashboard";
import { Books } from "./pages/Books";
import BookDetail from "./pages/BookDetails";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";

function App() {
  console.log("🔄 [App] render");

  const { isLoggedIn } = useAuth();

  return (

    <Routes>
      {isLoggedIn ? (
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="bookdetail/:id" element={<BookDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      ) : (
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="books" element={<Books />} />
          <Route path="profile" element={<Navigate to="/login" replace />} />
        </Route>
      )}
    </Routes>
    
  )
}
export default App
