# 🔗 URL Shortener

A production-ready URL shortener API built with Node.js, Express, and MongoDB. Supports custom codes, expiring links, QR code generation, click analytics, and rate limiting.

**Live API:** https://url-shortener-production-7409.up.railway.app

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔗 Short links | Generate a unique 6-character short code for any URL |
| ✏️ Custom codes | Choose your own short code (e.g. `/my-link`) |
| ⏳ Expiring links | Set a TTL in seconds — link auto-expires after that |
| 📷 QR codes | Every short URL comes with a base64 QR code |
| 📊 Click analytics | Track how many times a link has been clicked |
| 🚦 Rate limiting | Max 20 requests per 15 minutes per IP on `/shorten` |
| ✅ URL validation | Rejects malformed or non-HTTP/HTTPS URLs |
| 🚀 Deployed | Live on Railway with MongoDB Atlas |

---

## 🛠️ Tech Stack

- **Runtime** — Node.js
- **Framework** — Express
- **Database** — MongoDB + Mongoose
- **Short codes** — nanoid
- **QR codes** — qrcode
- **Rate limiting** — express-rate-limit
- **Deployment** — Railway + MongoDB Atlas

---

## 📁 Project Structure

```
url-shortener/
├── src/
│   ├── controllers/
│   │   └── url.controller.js     # createShortUrl, redirectUrl, getAnalytics
│   ├── middlewares/
│   │   └── rateLimiter.js        # express-rate-limit config
│   ├── models/
│   │   └── url.model.js          # Mongoose schema
│   ├── routes/
│   │   └── url.routes.js         # Route definitions
│   ├── utils/
│   │   └── validateUrl.js        # URL format validation
│   └── server.js                 # Entry point
├── .env                          # Environment variables (not committed)
├── .gitignore
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repo
git clone https://github.com/RounakChoudhary/url-shortener.git
cd url-shortener

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Fill in your values (see Environment Variables below)

# Start development server
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root with the following:

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/urlshortener
PORT=5000
BASE_URL=http://localhost:5000
```

---

## 📡 API Reference

### POST `/shorten`
Create a new short URL.

**Request body:**
```json
{
  "url": "https://example.com",
  "customCode": "my-link",      
  "expiresIn": 86400            
}
```
> `customCode` and `expiresIn` (seconds) are optional.

**Response `201`:**
```json
{
  "shortUrl": "https://url-shortener-production-7409.up.railway.app/my-link",
  "qrCode": "data:image/png;base64,..."
}
```

**Error responses:**

| Status | Meaning |
|---|---|
| `400` | URL missing, invalid format, or custom code already taken |
| `429` | Rate limit exceeded (20 req / 15 min per IP) |

---

### GET `/:code`
Redirect to the original URL.

```
GET /my-link  →  302 redirect to https://example.com
```

| Status | Meaning |
|---|---|
| `302` | Redirect successful |
| `404` | Short code not found |
| `410` | Link has expired |

---

### GET `/analytics/:code`
Get click stats for a short URL.

**Response `200`:**
```json
{
  "shortCode": "my-link",
  "originalUrl": "https://example.com",
  "clicks": 42,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "expiresAt": "2025-01-02T00:00:00.000Z"
}
```

---

## 🧪 Testing with curl

```bash
# Create a short URL
curl -X POST https://url-shortener-production-7409.up.railway.app/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com"}'

# Create with custom code + expiry (1 day)
curl -X POST https://url-shortener-production-7409.up.railway.app/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com", "customCode": "google", "expiresIn": 86400}'

# Check analytics
curl https://url-shortener-production-7409.up.railway.app/analytics/google
```

---

## 🗺️ Roadmap

- [x] Short link generation
- [x] Custom codes
- [x] Expiring links
- [x] QR code generation
- [x] Click analytics
- [x] Rate limiting
- [x] Deployment
- [ ] Redis caching for redirect lookups
- [ ] Frontend UI

---

## 📄 License

MIT
