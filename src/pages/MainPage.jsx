import { useEffect, useState } from "react";
import { getArticles } from "../service/articlesService.js";
import ArticleCard from "./components/ArticleCard.jsx";
import Pagination from "./components/Pagination.jsx";
import Loader from "./components/Loader.jsx";
import BannerHome from "./components/banner/BannerHome.jsx";

const LIMIT = 4;

export default function MainPage() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadArticles(currentPage);
  }, [currentPage]);

  const loadArticles = async (page) => {
    try {
      setLoading(true);
      const data = await getArticles(page, LIMIT);

      setArticles(data.articles);
      setTotalPages(Math.ceil(data.articlesCount / LIMIT));
    } catch (error) {
      console.error("Ошибка загрузки статей", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BannerHome
        title="Realworld Blog"
        subtitle="A place to share your knowledge."
      />

      {loading && <Loader />}

      {!loading && articles.map(article => (
        <ArticleCard key={article.slug} article={article} />
      ))}

      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
}