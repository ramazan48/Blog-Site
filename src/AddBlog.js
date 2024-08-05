import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

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
      const response = await fetch('https://grand-unicorn-c0189b.netlify.app/.netlify/functions/addBlog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to add blog post: ${errorMessage}`);
      }
      
      const result = await response.json();
      console.log(result); // Yanıtı kontrol edin
      alert('Blog added successfully');
      setTitle('');
      setAuthor('');
      setDate('');
      setContent('');

      navigate('/');
    } catch (error) {
      console.error('Error adding blog:', error);
    }

  
  };

  return (
    <div className='add-blog-form margarine-regular'>
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          Title:
          <input
            type="text"
            value={title}
            className='form-input'
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <br />
        <div className='form-group'>
          Author:
          <input
            type="text"
            value={author}
            className='form-input'
            required
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <br />
        <div  className='form-group'>
          Date:
          <input
            type="date"
            value={date}
            className='form-input'
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <br />
        <div className='form-group'>
          Content:
          <br />
          <textarea
            value={content}
            className='form-textarea'
            required
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <br />
        <button type="submit" className='submit-button'>Add Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;
