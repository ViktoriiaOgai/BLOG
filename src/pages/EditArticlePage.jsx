import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArticleForm from "./components/ArticleForm.jsx";
import { getArticleBySlug, updateArticle } from "../service/articlesService";
import Loader from "./components/Loader";

export default function EditArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getArticleBySlug(slug).then(setArticle);
  }, [slug]);

  if (loading) return <Loader />;
  if (!article) return <Loader/>;
  if (!article) return null;

   const handleSubmit = async (data) => {
    setLoading(true);
    await updateArticle(slug, data);
    navigate(`/articles/${slug}`);
  };

  return (
    <>
      <h1>Edit Article</h1>
      
       <ArticleForm
  initialValues={article}
  onSubmit={(data) => updateArticle(slug, data)}
  submitText="Save"
/>

    </>
  );
}