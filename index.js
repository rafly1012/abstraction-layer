var express = require("express");
var cors = require("cors");
var fetch = require("node-fetch"); // pastikan install: npm install node-fetch
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

// Simpan query pencarian
let recentSearches = [];

// halaman utama
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// route image search
app.get("/api/imagesearch/:query", async (req, res) => {
  const query = req.params.query;
  const page = req.query.page || 1;

  // simpan query ke recentSearches
  recentSearches.unshift({ term: query, when: new Date().toISOString() });
  if (recentSearches.length > 10) recentSearches.pop(); // hanya simpan 10 terakhir

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&page=${page}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const data = await response.json();

    const results = data.results.map((item) => ({
      url: item.urls.full,
      snippet: item.alt_description,
      thumbnail: item.urls.thumb,
      context: item.links.html,
    }));

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data" });
  }
});

// route recent searches
app.get("/api/recent", (req, res) => {
  res.json(recentSearches);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
