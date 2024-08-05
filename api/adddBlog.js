// api/addBlog.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const newBlog = req.body;
        
        // Burada yeni blog postunu veri kaynağınıza ekleyin
        // Örneğin, bir veritabanına veya dosyaya ekleyin

        res.status(200).json({ message: 'Blog added successfully' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
