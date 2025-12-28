import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArticleForm from "./components/ArticleForm.jsx";
import { getArticleBySlug, updateArticle } from "../service/articlesService";
import Loader from "./components/Loader";
import "./ArticlePage.css";

export default function EditArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
const [article, setArticle] = useState({tagList: [],});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleBySlug(slug);
        setArticle(data);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const handleSubmit = async (data) => {
    setLoading(true);
    await updateArticle(slug, data);
    navigate(`/articles/${slug}`);
  };

  if (loading) return <Loader />;
  if (!article) return null;

  return (
    <>
        <div className="article-editor">
    <ArticleForm
      initialValues={{
        title: article.title,
        description: article.description,
        body: article.body,
         tagList: article.tagList, 
      }}
      onSubmit={(data) => updateArticle(slug, data)}
      submitText="Publish Article"
    />
  </div>
    </>
  );
}