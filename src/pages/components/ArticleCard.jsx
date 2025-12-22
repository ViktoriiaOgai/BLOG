import { Link } from "react-router-dom";
import "./ArticleCard.css";

export default function ArticleCard ({article}) {
    return (
        <div className="article-card">
  <div className="article-meta">
    <div className="author">
      <img
            src={article.author.image || "/default-avatar.png"}
            alt={article.author.username}
          />
      <div>
        <span className="name">{article.author.username}</span>
        <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>
    </div>

    <button className="like-btn" disabled>
       ♥ {article.favoritesCount}
    </button>
  </div>

  <Link to={`/articles/${article.slug}`} className="preview-link">
    <h2>{article.title}</h2>
    <p>{article.description}</p>
     </Link>
  <ul className="tag-list">
        {article.tagList.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

</div>
    );
}