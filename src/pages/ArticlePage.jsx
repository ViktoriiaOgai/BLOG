import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleBySlug } from "../service/articlesService";
import ReactMarkdown from "react-markdown";
import Loader from "./components/Loader";
import "./ArticlePage.css";
import "../pages/components/banner/Banner.css";
import BannerArticle from "./components/banner/BannerArticle.jsx";
import { useAuth } from "../../src/context/AuthContext.jsx";
export const API_URL = "https://realworld.habsida.net/api";
import axios from "axios";
import defaultAvatar from "../../src/assets/avatar.png";



export default function ArticlePage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { slug } = useParams();
   const navigate = useNavigate();
  const [article, setArticle] = useState({tagList: [],});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const avatar =
  article.author?.image?.trim()
    ? article.author.image
    : defaultAvatar;

  const formatDate = (date) => {
  const d = new Date(date);

  const day = d.getDate();
  const month = d.toLocaleString("en-GB", { month: "long" });
  const year = d.getFullYear();

  return `${day} ${month} ${year}`;
};
  
const handleEdit = () => {
     navigate(`/articles/${slug}/edit`);
};

 const handleDelete = async () => {
  try {
    await axios.delete(`${API_URL}/articles/${slug}`, {
      headers: { Authorization: `Token ${user.token}` },
    });
    navigate("/");
  } catch {
    alert("Failed to delete article");
  }
};
  useEffect(() => {
    setLoading(true);

    getArticleBySlug(slug)
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Ошибка загрузки статьи");
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (!article) return null;
  return (
    <>
      {/* 🔹 Баннер статьи */}
      <BannerArticle
        title={article.title}
          author={article.author}
          createdAt={article.createdAt}
      />

      {/* 🔹 Контент */}
      <div className="article-page">
         <ReactMarkdown>{article.body}</ReactMarkdown>
         <ul className="tag-list">
        {article.tagList?.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className="article-meta">
    <div className="author-info">
      <img
  src={avatar}
  alt={article.author?.username || "author"}
  className="author-avatar"
/>

      <div>
        <p className="author-name">{article.author.username}</p>
        <p className="author-date">{formatDate(article.createdAt)}</p>
      </div>
    </div>
    <button className="favorite-btn" onClick={() => console.log("Добавляем в избранное")}>
      Favorite Article
    </button>
   {user?.username === article.author.username && (
  <div className="article-actions">
    <button onClick={handleEdit}>Edit</button>
    <button onClick={() => setShowDeleteModal(true)}>Delete</button>

  </div>
)}
  </div>
          
      </div>
      {showDeleteModal && (
  <div className="modal-overlay">
    <div className="modal">
      <p>Do you really want to delete this article?</p>
      <div className="modal-actions">
        <button onClick={() => setShowDeleteModal(false)}>
          Cancel
        </button>
        <button
          className="danger"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
}
