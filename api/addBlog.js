// api/addBlog.js
import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware'; // `lib/init-middleware.js` dosyasını oluşturun.

// Initialize the CORS middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    origin: '*', // Belirli bir domain de belirtebilirsiniz.
  })
);

export default async function handler(req, res) {
  await cors(req, res); // CORS middleware'yi çağırın

  if (req.method === 'POST') {
    // Kodunuz buraya
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
