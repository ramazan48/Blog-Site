import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [blogs, setBlogs] = useState([]);
  
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const response = await fetch('http://localhost:3000/posts');
          if (!response.ok) {
            throw new Error('Failed to fetch blogs');
          }
          const data = await response.json();
          setBlogs(data);
        } catch (error) {
          
        }
      };
  
      fetchBlogs();
    }, []); 
  
    const handleDelete = async (id) => {
        try {
          const response = await fetch(`http://localhost:3000/posts/${id}`, {
            method: 'DELETE',
          });
      
          if (!response.ok) {
            throw new Error('Failed to delete blog post');
          }
          alert('Blog deleted successfully');
          setBlogs(blogs.filter(blog => blog.id !== id));
        } catch (error) {
          console.error('Error deleting blog:', error);
        }
      };
  return (
    <div>
    <h1>Blog Posts</h1>
    <Link to="/AddBlog">
      <button>Add New Blog</button>
    </Link>
    {blogs.map((blog) => (
      <div key={blog.id}>
        <h2>{blog.title}</h2>
        <p>{blog.content}</p>
        <p>Author: {blog.author}</p>
        <p>Date: {blog.date}</p>
        <button onClick={() => handleDelete(blog.id)}>Delete</button>
      </div>
    ))}
  </div>
  );
}

export default Home;
