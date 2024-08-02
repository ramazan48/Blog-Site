const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000; 

app.use(cors());
app.use(express.json());

const filePath = './blogposts.json';

app.get('/posts', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading data');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.post('/posts', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading data');
    } else {
      const posts = JSON.parse(data);
      const newPost = req.body;
      posts.push(newPost);
      fs.writeFile(filePath, JSON.stringify(posts, null, 2), (err) => {
        if (err) {
          res.status(500).send('Error writing data');
        } else {
          res.status(201).send('Post added');
        }
      });
    }
  });
});

app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading data');
    } else {
      let posts = JSON.parse(data);
      posts = posts.filter(post => post.id !== id);
      fs.writeFile(filePath, JSON.stringify(posts, null, 2), (err) => {
        if (err) {
          res.status(500).send('Error writing data');
        } else {
          res.send('Post deleted');
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
