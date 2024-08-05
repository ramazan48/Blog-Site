const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const BLOGS_FILE_PATH = path.join(__dirname, 'BlogPosts.json');

// Middleware to read blogs from the file
const readBlogs = () => {
  const rawData = fs.readFileSync(BLOGS_FILE_PATH);
  return JSON.parse(rawData);
};

// Middleware to write blogs to the file
const writeBlogs = (data) => {
  fs.writeFileSync(BLOGS_FILE_PATH, JSON.stringify(data, null, 2));
};

// Get all blogs
app.get('/api/blogs', (req, res) => {
  const blogs = readBlogs();
  res.json(blogs);
});

// Add a new blog
app.post('/api/blogs', (req, res) => {
  const newBlog = req.body;
  const blogs = readBlogs();
  blogs.push(newBlog);
  writeBlogs(blogs);
  res.status(201).json(newBlog);
});

// Delete a blog by ID
app.delete('/api/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  const blogs = readBlogs();
  const updatedBlogs = blogs.filter(blog => blog.id !== blogId);

  if (blogs.length === updatedBlogs.length) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  writeBlogs(updatedBlogs);
  res.status(200).json({ message: 'Blog deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
