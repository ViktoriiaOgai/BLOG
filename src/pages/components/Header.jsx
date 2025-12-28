import {Link, useNavigate} from "react-router-dom";
import "../../layout/layout.css";
import  ulogo from "../../assets/ulogo.svg";
import  settings from "../../assets/settings.svg";
import  newlogo from "../../assets/newlogo.svg";
import { useAuth } from "../../context/AuthContext";

export default function Header() {  
    const { user, logout } = useAuth();
      const navigate = useNavigate();
      const handleLogout = () => {
    logout();          // сброс user
    navigate("/");     // перенаправление на главную
  };
return (
     
<header>
          <nav className="top-nav">
          <p className="p1" >Realworld Blog</p>
          <div className="links">
            {!user && (
            <>
              <nav>
  <div className="nav-links">
    <Link to="/">Home</Link>
    <Link to="/sign-up"><img className="ulogo" src={settings} alt="Sign Up"/>Sign Up</Link>
    <Link to="/sign-in"><img className="ulogo" src={ulogo} alt="Sign In"/>Sign In</Link>
  </div>
</nav>
            </>
          )}
            {user && (
            <>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link className="userlogo" to="/new-article"><img className= "ulogo" src={newlogo}/>New Post
              </Link>
              <Link className="userlogo" to="/settings">
              <img className= "ulogo" src={settings}/>Settings</Link>
              <Link className="userlogo" to="/profile">
              <img className="ulogo" src={ulogo}/>{user.username}
              </Link>
              <button className="logout_btn" onClick={handleLogout}>LogOut</button>
              </div>
            </>
          )}
          </div>
        </nav>
        </header>
    );
}