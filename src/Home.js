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
    <div className="container margarine-regular">
    <div className='header-div'><h1 className='header'>Blog Posts</h1></div>
    <div className='button-container'>
    <Link to="/AddBlog">
      <button className="add-blog-button">Add New Blog</button>
    </Link>
    </div>
    <div className='blog-list'>
    {blogs.map((blog) => (
      <div className="blog-item" key={blog.id}>
        <h2 className='blog-title'>{blog.title}</h2>
        <p className='blog-content'>Content: {blog.content}</p>
        <p className='blog-meta'>Author: {blog.author}</p>
        <p className='blog-meta'>Date: {blog.date}</p>
        <button className="delete-button" onClick={() => handleDelete(blog.id)}>Delete</button>
      </div>
    ))}
    </div>
  </div>
  );
}

export default Home;
