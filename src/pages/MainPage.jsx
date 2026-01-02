import { useEffect, useState } from "react";
import { getArticles } from "../service/articlesService.js";
import ArticleCard from "./components/ArticleCard.jsx";
import Pagination from "./components/Pagination.jsx";
import Loader from "./components/Loader.jsx";
import BannerHome from "./components/banner/BannerHome.jsx";
import "./MainPage.css";
const LIMIT = 4;

export default function MainPage() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    loadArticles(currentPage);
  }, [currentPage]);

  const loadArticles = async (page) => {
  try {
    setLoading(true);
    setError(null);

    const data = await getArticles(page, LIMIT);
    setArticles(data.articles);
    setTotalPages(Math.ceil(data.articlesCount / LIMIT));
  } catch (error) {
    console.error("Ошибка загрузки статей", error);
    setError("Articles are temporarily unavailable");
    setArticles([]);
  } finally {
    setLoading(false);
  }
};
const updateArticle = (updatedArticle) => {
  setArticles((prev) =>
    prev.map((article) =>
      article.slug === updatedArticle.slug ? updatedArticle : article
    )
  );
};

  return (
    <>
      <BannerHome
        title="Realworld Blog"
        subtitle="A place to share your knowledge."
      />

      {loading && <Loader />}

      {!loading && error && <p className="error">{error}</p>}
       <div className="container">
        <div className="popular-tags">
          <p className="popular-title">Popular tags</p>
          <ul className="tag-list">
            <li className="tag">one</li>
            <li className="tag">something</li>
            <li className="tag">chinese</li>
            <li className="tag">english</li>
            <li className="tag">french</li>
          </ul>
        </div>

{!loading && !error && articles.map(article => (
  <ArticleCard key={article.slug} article={article} onLike={updateArticle}/>
))}

{!loading && !error && articles.length === 0 && (
  <p>No articles yet</p>
)}
      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      </div>
    </>
  );
}