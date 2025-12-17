import { Outlet, Link, useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./layout.css";
export default function Layout() {
     const { user, logout } = useAuth();
      const navigate = useNavigate();
      const handleLogout = () => {
    logout();          // сброс user
    navigate("/");     // перенаправление на главную
  };

    return (
        <>
                <header className="header">
            <h1>Blog Platform </h1>
            {user ? (
  <><div className="user-info">
    <span onClick={() => navigate("/profile")}>{user.username}</span>
    <button onClick={handleLogout}>Выйти</button>
        </div>
  </>
) : (
  <>
    <Link to="/sing-up">Sing Up</Link>
    <Link to="/sing-in">Sing In</Link>
  </>
)}
        </header>
        
        <main><Outlet/>
        </main>
        </>
    );
}