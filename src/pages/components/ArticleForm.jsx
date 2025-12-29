import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ArticleForm({ initialValues = { title: "", description: "", body: "", tagList: [] }, onSubmit, submitText }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tagList, setTagList] = useState([]);
  const [error, setError] = useState("");
 const navigate = useNavigate();
   const { user } = useAuth();
  useEffect(() => {
    setTitle(initialValues.title || "");
    setDescription(initialValues.description || "");
    setBody(initialValues.body || "");
    setTagList(initialValues.tagList || []);
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
    if (!title || !description || !body) {
      setError("Все поля обязательны");
      return;
    }
    setError("");
    onSubmit({ title, description, body, tagList });
  };

  const handleTagAdd = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tagList.includes(tagInput.trim())) {
        setTagList([...tagList, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTagList(tagList.filter(tag => tag !== tagToRemove));
  };

  return (
    <form onSubmit={handleSubmit} className="article-form">
      {error && <p style={{ color: "red" }}>{error}</p>}

  
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
    
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
    
             <textarea placeholder="Body" value={body} onChange={e => setBody(e.target.value)} required />
        
        <input
          type="text"
          placeholder="Enter a tag and press Enter"
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          onKeyDown={handleTagAdd}
        />
         <ul className="tag-list">
        {tagList.map(tag => (
          <li key={tag}>
            {tag} <button type="button" onClick={() => removeTag(tag)}>×</button>
          </li>
        ))}
      </ul>

      <button type="submit">{submitText || "Publish Article"}</button>
    </form>
  );
}
