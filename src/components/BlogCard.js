import React from 'react';

const BlogCard = ({ blog }) => {
  return (
    <div className="card blog-card">
      <img src={blog.thumbnail} alt={blog.title} style={{width: '100%', borderRadius: '10px'}} />
      <h3>{blog.title}</h3>
      <p>{blog.description}</p>
      <button onClick={() => alert('Read more functionality coming soon!')}>Read More</button>
    </div>
  );
};

export default BlogCard;
