// api/addBlog.js
import fs from 'fs';
import path from 'path';

const jsonFilePath = path.join(process.cwd(), 'public', 'BlogPosts.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const newBlog = req.body;

    try {
      // JSON dosyasını okuyun
      const data = fs.readFileSync(jsonFilePath, 'utf8');
      const blogs = JSON.parse(data);

      // Yeni blogu ekleyin
      blogs.push(newBlog);

      // JSON dosyasını güncelleyin
      fs.writeFileSync(jsonFilePath, JSON.stringify(blogs, null, 2));

      res.status(200).json({ message: 'Blog added successfully' });
    } catch (error) {
      console.error('File system error:', error);
      res.status(500).json({ error: 'Failed to add blog post' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
