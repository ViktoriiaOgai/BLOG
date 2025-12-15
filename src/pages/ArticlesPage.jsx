import { useEffect, useState } from "react";
import { getArticles } from "../service/articlesService.js";
import ArticleCard from "./components/ArticleCard.jsx";
import Pagination from  "./components/Pagination.jsx";
import Loader from "./components/Loader.jsx";


export default function ArticlesPage() {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        getArticles(page)
          .then(data => {
            setArticles(data.articles);
            setLoading(false);
          })
          .catch(() => {
             setError("Ошибка загрузки");
             setLoading(false);
          });
    }, [page]);

    if (loading) return <Loader/>;
    if (error) return <p>{error}</p>;

    return (
        <>
        {articles.map(article => (
            <ArticleCard key={article.slug} article={article}/>
        ))}
        <Pagination page={page} setPage={setPage}/>
        </>
    );
}