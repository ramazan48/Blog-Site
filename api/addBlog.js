// netlify/functions/addBlog.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    const newBlog = JSON.parse(event.body);
    const jsonFilePath = path.join(__dirname, '../public/BlogPosts.json');

    try {
      const data = fs.readFileSync(jsonFilePath, 'utf8');
      let blogs = JSON.parse(data);
      blogs.push(newBlog);
      fs.writeFileSync(jsonFilePath, JSON.stringify(blogs, null, 2));
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Blog added successfully' }),
      };
    } catch (error) {
      console.error('Error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to add blog post' }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }
};
