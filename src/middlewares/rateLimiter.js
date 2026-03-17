const rateLimit = require("express-rate-limit")

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 20,                    // 20 requests per window per IP
  message: { error: "Too many requests, slow down." }
})

module.exports = limiter