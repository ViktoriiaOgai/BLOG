import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArticleForm from "./components/ArticleForm.jsx";
import { getArticleBySlug, updateArticle } from "../service/articlesService";
import Loader from "./components/Loader";
import "./ArticlePage.css";
import { useAuth } from "../context/AuthContext";


export default function EditArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({ tagList: [] });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();


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
  try {
    setLoading(true);
    const updatedArticle = await updateArticle(slug, data, user.token);
    // берём новый slug из ответа
    navigate(`/articles/${updatedArticle.slug}`);
  } finally {
    setLoading(false);
  }
};
  if (loading) return <Loader />;

  return (
    <div className="article-editor">
      <ArticleForm
        initialValues={{
          title: article.title,
          description: article.description,
          body: article.body,
        }}
        onSubmit={handleSubmit}
        submitText="Publish Article"
      />
    </div>
  );
}
