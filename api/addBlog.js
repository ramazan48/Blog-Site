
// api/addBlog.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const newBlog = req.body;
  
      // Burada veriyi veritabanına ekleyin veya dosyaya yazın
      // Örneğin, MongoDB'ye veri ekleme
      try {
        // await database.collection('blogs').insertOne(newBlog);
        res.status(200).json({ message: 'Blog added successfully' });
      } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Failed to add blog post' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  
