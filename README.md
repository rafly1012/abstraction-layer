# Image Search Abstraction Layer

> A full-stack JavaScript application that provides an abstraction layer over the Unsplash API to enable image search and track recent queries.

This project fulfills the [FreeCodeCamp "Image Search Abstraction Layer"](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/image-search-abstraction-layer) challenge.

---

## ✨ Features

- 🔍 Search for images by keyword (e.g., `lolcats funny`)
- 📄 Paginated results via `?page=2` query parameter
- 🕒 View the 10 most recent search terms
- 🖼️ Responsive frontend with image cards, descriptions, and photographer credits
- ⚡ Real-time loading skeletons for better UX

---

## 🌐 Live Demo

🔗 [https://image-search-abstraction-layer.onrender.com](https://image-search-abstraction-layer.onrender.com)  
*(Hosted on Render — may take a few seconds to wake up)*

---

## 🛠️ Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **API**: [Unsplash API](https://unsplash.com/developers)
- **Hosting**: Render (or any Node.js-compatible platform)

---

## 📦 API Endpoints

### `GET /api/imagesearch/:query`
Search for images related to `:query`.

**Query Parameters**:
- `page` (optional, default: `1`)
- `per_page` (optional, default: `10`, max: `30`)

**Example**:
```http
GET /api/imagesearch/lolcats?page=2
