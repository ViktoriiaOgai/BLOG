import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleBySlug } from "../service/articlesService";
import ReactMarkdown from "react-markdown";
import Loader from "./components/Loader";

export default function ArticlePage() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    getArticleBySlug(slug)
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(error => {
        if (error.response?.status === 429) {
          setError("Слишком много запросов. Подожди минуту.");
        } else {
          setError("Ошибка загрузки статьи");
        }
        setLoading(false);
      });

  }, [slug]);

  if (loading) return <Loader/>;
  if (error) return <p>{error}</p>;
  if (!article) return null;

  return (
    <>
      <h1>{article.title}</h1>
      <ReactMarkdown>{article.body}</ReactMarkdown>
    </>
  );
}
