const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));

// Simpan 10 pencarian terbaru
let recentSearches = [];

// Serve halaman utama
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// API: Cari gambar
app.get("/api/imagesearch/:query", async (req, res) => {
  const query = req.params.query;
  const page = parseInt(req.query.page) || 1;
  const perPage = Math.min(parseInt(req.query.per_page) || 10, 30);

  // Simpan ke riwayat (maks 10)
  recentSearches.unshift({ term: query, when: new Date().toISOString() });
  if (recentSearches.length > 10) recentSearches.pop();

  try {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({ error: "Unsplash API error" });
    }

    const data = await response.json();

    if (!Array.isArray(data.results)) {
      return res.status(500).json({ error: "Invalid response from Unsplash" });
    }

    const results = data.results.map((item) => ({
      imageUrl: item.urls.thumb,
      pageUrl: item.links.html,
      description: item.alt_description || item.description || "Untitled",
      photographer: item.user.name,
      photographerProfile: item.user.links.html,
    }));

    res.json(results); // Kirim array langsung
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during image search" });
  }
});

// API: Riwayat pencarian
app.get("/api/recent", (req, res) => {
  res.json(recentSearches);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
