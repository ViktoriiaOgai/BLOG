import { Link } from "react-router-dom";
import "./ArticleCard.css";

export default function ArticleCard ({article}) {
    return (
        <div className="card">
            <h2>
                <Link to={`/articles/${article.slug}`}>
                {article.title}
                </Link>
            </h2>
            <p>{article.description}</p>
            <button className="like" disabled > ❤️ {article.favoritesCount}</button>
        </div>
    );
}