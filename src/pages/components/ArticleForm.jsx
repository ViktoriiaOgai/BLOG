import { useState, useEffect } from "react";

export default function ArticleForm({
  initialValues = { title: "", description: "", body: "" },
  onSubmit,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(initialValues.title || "");
    setDescription(initialValues.description || "");
    setBody(initialValues.body || "");
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !body) {
      setError("Все поля обязательны");
      return;
    }

    setError("");
    onSubmit({ title, description, body });
  };

  return (
    <form onSubmit={handleSubmit}>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>Title 
        <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
</label>
      <label> Text 
        <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
</label>
      <label> Body 
        <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
</label>
      <button type="submit">Save</button>
    </form>
  );
}