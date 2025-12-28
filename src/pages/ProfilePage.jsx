import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getArticlesByAuthor } from "../service/articlesService";
import Loader from "../pages/components/Loader";
import BannerProfile from "../pages/components/banner/BannerProfile";
import ArticleCard from "../pages/components/ArticleCard";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { username } = useParams();
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getArticlesByAuthor(username)
      .then((data) => {
        // если API вернул undefined, подставляем пустой массив
        setArticles(data?.articles || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Не удалось загрузить статьи");
        setLoading(false);
      });
  }, [username]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <>
      <BannerProfile user={user} />

      <div className="profile-header">
        <h2>{username || user.username}</h2>
      </div>

      <div className="profile-page">
        {articles.length === 0 && <p>No articles yet</p>}

        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </>
  );
}