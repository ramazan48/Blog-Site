export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const blogPost = req.body;
      // Blog ekleme işlemleri
      // Örneğin, bir veritabanına ekleme işlemi
      res.status(200).json({ message: 'Blog added successfully' });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
