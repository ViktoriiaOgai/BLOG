import { useState, useEffect } from "react";

export default function ArticleForm({
  initialValues = { title: "", description: "", body: "", tagList: [] },
  onSubmit,
  submitText = "Publish Article",
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tagList, setTagList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(initialValues.title || "");
    setDescription(initialValues.description || "");
    setBody(initialValues.body || "");
    setTagList(initialValues.tagList || []);
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !body) {
      setError("All fields are required");
      return;
    }

    onSubmit({
      title,
      description,
      body,
      tagList,
    });
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

  return (
    <form onSubmit={handleSubmit} className="article-form">
      {error && <p className="error">{error}</p>}

      <input
        type="text"
        placeholder="Article Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="What's this article about?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <textarea
        placeholder="Write your article (in markdown)"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter tags and press Enter"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleTagAdd}
      />

      <ul className="tag-list">
        {tagList.map((tag) => (
          <li key={tag} className="tag-pill">
            {tag}
          </li>
        ))}
      </ul>

      <button type="submit">{submitText}</button>
    </form>
  );
}
