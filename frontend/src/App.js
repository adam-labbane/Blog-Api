import React, { useState } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [reload, setReload] = useState(false);

  return (
    <div className="container py-5">
      <h1 className="text-center text-primary mb-4">📝 Mon Blog</h1>
      <PostForm onPostCreated={() => setReload(!reload)} />
      <PostList reload={reload} />
    </div>
  );
}

export default App;
