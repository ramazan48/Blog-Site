// server.js veya app.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware'leri tanımlayın
app.use(express.json()); // JSON gövdesini işlemek için

// DELETE isteği için route
app.delete('/api/deleteBlog/:id', (req, res) => {
  const blogId = req.params.id;
  // Blog silme işlemini burada gerçekleştirin (veritabanından silme vb.)
  
  // Örnek: Silme işlemi başarılıysa yanıt gönder
  res.status(200).json({ message: 'Blog deleted successfully' });
});

// Diğer route'lar veya middleware'ler...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
