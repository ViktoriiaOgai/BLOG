import { Link } from "react-router-dom";
import "../components/ArticleCard.css";
import favoriteIcon from"../../assets/favorite.svg"
import likeIcon from"../../assets/like.svg"

export default function ArticleCard ({article}) {
const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

   return (
    <div className="article-card">
      {/* Верхняя строка: автор слева, кнопка лайк справа */}
      <div className="article-card-meta">
        <div className="author">
          <img
            src={article.author.image ? article.author.image : favoriteIcon}
            alt={article.author.username}
          />
          <div>
            <span className="name">{article.author.username}</span>
            <span className="date">{formatDate(article.createdAt)}</span>
          </div>
        </div>
        <button className="like-btn" disabled>
          <img className="likeIcon" src={likeIcon} alt="like" />
          <span className="count">{article.favoritesCount}</span>
        </button>
      </div>
<div className="cont">
      {/* Контент */}
      <Link to={`/articles/${article.slug}`} className="preview-link">
        <h2>{article.title}</h2>
        <p>{article.description}</p>
      </Link>

      {/* Теги */}
      <ul className="tag-list">
  {article.tagList?.map(tag => (
    <li key={tag} className="tag">{tag}</li>
  ))}
</ul>
      </div>
    </div>
  );
}