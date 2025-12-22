import { useParams } from "react-router-dom";
import BannerProfile from "../pages/components/banner/BannerProfile";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { username } = useParams();
const { user } = useAuth();
  return (
    <>
    <BannerProfile user={user} />
      <div className="profile-banner">
        <h2>{username}</h2>
      </div>

      <p>Здесь будут статьи пользователя</p>
    </>
  );
}