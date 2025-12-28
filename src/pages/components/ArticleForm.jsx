import { useState, useEffect } from "react";

export default function ArticleForm({
  initialValues = { title: "", description: "", body: "", tagList: "" },
  onSubmit,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(initialValues.title || "");
    setDescription(initialValues.description || "");
    setBody(initialValues.body || "");
    setTags(
      Array.isArray(initialValues.tagList)
        ? initialValues.tagList.join(", ")
        : ""
    );
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !body) {
      setError("Все поля обязательны");
      return;
    }

    const tagList = tags
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean);

    setError("");

    onSubmit({
      title,
      description,
      body,
      tagList,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
     
      
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      

      
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      

      {/*  ТЕГИ */}
      
        <input
          type="text"
          placeholder="react, js, frontend"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
     

      <button type="submit">Publish Article</button>
    </form>
  );
}