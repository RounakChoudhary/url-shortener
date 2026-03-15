const express = require("express")
const router = express.Router()

const {
  createShortUrl,
  redirectUrl,
  getAnalytics
} = require("../controllers/url.controller")

router.post("/shorten", createShortUrl)

router.get("/analytics/:code", getAnalytics)

router.get("/:code", redirectUrl)

module.exports = router