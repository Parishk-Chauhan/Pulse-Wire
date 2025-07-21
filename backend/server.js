const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.use(cors());

app.get("/news", async (req, res) => {
  try {
    const topic = req.query.topic || "general";
    console.log("Using API Key:", NEWS_API_KEY);
    console.log("Fetch URL:", `https://newsapi.org/v2/top-headlines?country=in&category=${topic}&apiKey=${NEWS_API_KEY}`);
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&category=${topic}&apiKey=${NEWS_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});
app.get("/check-key", (req, res) => {
  res.send(`API Key: ${NEWS_API_KEY || "undefined"}`);
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
