const express = require("express")
const router = express.Router()

const {
  createShortUrl,
  redirectUrl,
  getAnalytics,
} = require("../controllers/url.controller")

const limiter = require("../middlewares/rateLimiter")
router.post("/shorten", limiter, createShortUrl)

router.get("/analytics/:code", getAnalytics)

router.get("/:code", redirectUrl)

module.exports = router