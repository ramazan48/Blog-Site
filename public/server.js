const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

const jsonFilePath = path.join(__dirname, 'BlogPosts.json');

// Get all blogs
app.get('/api/blogs', (req, res) => {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read JSON file' });
    }
    res.json(JSON.parse(data));
  });
});

// Add a new blog
app.post('/api/addBlog', (req, res) => {
  const newBlog = req.body;

  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read JSON file' });
    }

    const blogs = JSON.parse(data);
    blogs.push(newBlog);

    fs.writeFile(jsonFilePath, JSON.stringify(blogs, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to write JSON file' });
      }

      res.status(200).json({ message: 'Blog added successfully' });
    });
  });
});

// Delete a blog
app.delete('/api/deleteBlog', (req, res) => {
  const { id } = req.query;

  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read JSON file' });
    }

    let blogs = JSON.parse(data);
    blogs = blogs.filter(blog => blog.id !== id);

    fs.writeFile(jsonFilePath, JSON.stringify(blogs, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to write JSON file' });
      }

      res.status(200).json({ message: 'Blog deleted successfully' });
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
