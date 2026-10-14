module.exports = async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: 'Missing q' });

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  res.status(response.status).json(data);
};
