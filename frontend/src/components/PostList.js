import React, { useEffect, useState } from 'react';
import API from '../services/api';
import PostItem from './PostItem';

function PostList({ reload }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get('/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, [reload]);

  return (
    <div>
      <h3 className="mb-3">Articles récents</h3>
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
