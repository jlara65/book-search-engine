module.exports = async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: 'Missing q' });

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&key=${process.env.GOOGLE_BOOKS_API_KEY}`;

  try {
    let response = await fetch(url);

    // retry once if Google is temporarily unavailable
    if (response.status === 503 || response.status === 500) {
      await new Promise((r) => setTimeout(r, 500));
      response = await fetch(url);
    }

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(502).json({ error: 'Book search is temporarily unavailable' });
  }
};
