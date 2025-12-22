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
              <Link to="/">Home</Link>
          <Link to="/sing-up">Sing Up</Link>
          <Link to="/sing-in">Sing In</Link>
            </>
          )}
            {user && (
            <>
              <Link to="/">Home</Link>
              <Link className="userlogo" to="/new-article"><img className= "ulogo" src={newlogo}/>New Post
              </Link>
              <Link className="userlogo" to="/settings">
              <img className= "ulogo" src={settings}/>Settings</Link>
              <Link className="userlogo" to={`/profile/${user.username}`}>
                 <img className= "ulogo" src={ulogo}/>{user.username}
                 </Link>
              <button className="logout_btn" onClick={handleLogout}>LogOut</button>
            </>
          )}
          </div>
        </nav>
        </header>
    );
}