import "./Banner.css";

export default function BannerArticle({ title, author, createdAt }) {
  const date = new Date(createdAt).toLocaleDateString();

  return (
    <div className="banner banner--article">
      <div className="banner__content">
        <h1 className="banner__title">{title}</h1>

        <div className="banner__meta">
          <img
            className="banner__avatar"
            src={author?.image || "/default-avatar.png"}
           />

          <div className="banner__author">
            <span className="banner__username">{author?.username}</span>
            <span className="banner__date">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}