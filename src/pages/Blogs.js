import React from 'react';
import BlogCard from '../components/BlogCard';
import blogsData from '../data/blogs.json';

const Blogs = () => {
  return (
    <>
      <h1>Blogs</h1>
      <div className="blog-grid">
        {blogsData.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default Blogs;
