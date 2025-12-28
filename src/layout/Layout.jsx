import { Outlet, useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./layout.css";
import Header from "../pages/components/Header";


export default function Layout() {
     const { user, logout } = useAuth();
      const navigate = useNavigate();
      const handleLogout = () => {
    logout();          // сброс user
    navigate("/");     // перенаправление на главную
  };

    return (
        <>
        <Header/>
                
      <main>
        <Outlet/>
      </main>
        </>
    );
}