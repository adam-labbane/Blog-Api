import React, { useState } from 'react';
import API from '../services/api';

function PostForm({ onPostCreated }) {
  const [form, setForm] = useState({ title: '', content: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/posts', form);
      setForm({ title: '', content: '' });
      onPostCreated();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création de l'article.");
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title">Créer un nouvel article</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              name="title"
              className="form-control"
              placeholder="Titre"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              name="content"
              className="form-control"
              placeholder="Contenu"
              value={form.content}
              onChange={handleChange}
              required
              rows="4"
            />
          </div>
          <button className="btn btn-primary" type="submit">Publier</button>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
