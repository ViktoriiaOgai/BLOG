import { useNavigate } from "react-router-dom";
import ArticleForm from "./components/ArticleForm.jsx";
import { createArticle } from "../service/articlesService";
import { useAuth } from "../context/AuthContext";
import "./ArticlePage.css";


export default function NewArticlePage() {
  const navigate = useNavigate();
   const { user } = useAuth();
  const handleSubmit = async (data) => {
  const article = await createArticle(data, user.token);
  navigate(`/articles/${article.slug}`);
};

  return (
    <>
      <div className="article-editor">
    <h1 className="editor-title">New Article</h1>

    <ArticleForm
      initialValues={{
        title: "",
        description: "",
        body: "",
        tagList: [],
      }}
      onSubmit={handleSubmit}
    />
  </div>

    </>
  );
}