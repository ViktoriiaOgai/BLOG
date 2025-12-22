import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleBySlug } from "../service/articlesService";
import ReactMarkdown from "react-markdown";
import Loader from "./components/Loader";
import "./ArticlePage.css";
import BannerArticle from "./components/banner/BannerArticle.jsx";

export default function ArticlePage() {
  const { slug } = useParams();
   const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
const handleEdit = () => {
  navigate (`/articles/${slug}/edit`);
};

const handleDelete = () => {
  const confirmed = window.confirm("Do you want delete this post?");
  if (!confirmed) return;

  // здесь позже будет запрос на удаление
  console.log("Удаляем статью", slug);
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
        
      />

      {/* 🔹 Контент */}
      <div className="article-page">
         <ReactMarkdown>{article.body}</ReactMarkdown>
         <ul className="tag-list">
        {article.tagList.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
        <div className="article-actions">
          <button onClick={() => navigate(`/articles/${slug}/edit`)}>
            Edit
          </button>
          <button>Delete</button>
        </div>

        
      </div>
    </>
  );
}
