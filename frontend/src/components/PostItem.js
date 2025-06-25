import React from 'react';

function PostItem({ post }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content}</p>
        <p className="text-muted small mb-0">Posté le {new Date(post.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default PostItem;
