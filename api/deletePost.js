// api/deletePost.js
export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { id } = req.query;

        // Blog postunu silme işlemini burada gerçekleştirin
        // Örneğin: veritabanından veya JSON dosyasından silme işlemi yapabilirsiniz
        // Bu bir örnektir, gerçek silme işlemi mantığını buraya eklemelisiniz
        
        try {
            // Silme işlemi başarılı
            res.status(200).json({ message: 'Blog deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete blog post' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
