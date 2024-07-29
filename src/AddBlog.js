import React, { useState } from 'react';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const newBlog = {
      id: Date.now().toString(), 
      title,
      author,
      date,
      content
    };

    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });

      if (!response.ok) {
        throw new Error('Failed to add blog post');
      }
      alert('Blog added successfully');
      setTitle('');
      setAuthor('');
      setDate('');
      setContent('');


      const updatedBlogsResponse = await fetch('http://localhost:3000/posts');
      const updatedBlogs = await updatedBlogsResponse.json();
  
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;
