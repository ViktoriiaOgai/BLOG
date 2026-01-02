import "./Banner.css";
import defaultAvatar from "../../../assets/avatar.png"; 
import like from "../../../assets/like.svg";
export default function BannerProfile({ user }) {
  return (
    <div className="banner banner--profile">
      <img
        className="banner__avatar"
        src={user.image || defaultAvatar}  // <-- здесь используем импорт
        alt={user.username}
      />

      <h2 className="banner__username">{user.username}</h2>

      <button className="banner__likes">
        <img src={like} alt="like"/> 
        <span className="likes-count">{user.favoritesCount ?? 0}</span>
      </button>
    </div>
  );
}