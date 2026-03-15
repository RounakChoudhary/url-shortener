const Url = require("../models/url.model")
const { nanoid } = require("nanoid")
const isValidUrl = require("../utils/validateUrl")

const BASE_URL = process.env.BASE_URL || "http://localhost:5000"

exports.createShortUrl = async (req, res) => {

  try {

    const { url, customCode, expiresIn } = req.body

    if (!url) {
      return res.status(400).json({ error: "URL is required" })
    }

    if (!isValidUrl(url)) {
      return res.status(400).json({ error: "Invalid URL format" })
    }

    let shortCode

    if (customCode) {

      const exists = await Url.findOne({ shortCode: customCode })

      if (exists) {
        return res.status(400).json({
          error: "Custom code already taken"
        })
      }

      shortCode = customCode

    } else {

      let exists = true

      while (exists) {
        shortCode = nanoid(6)
        exists = await Url.findOne({ shortCode })
      }

    }

    let expiresAt = null

    if (expiresIn) {
      expiresAt = new Date(Date.now() + expiresIn * 1000)
    }

    const newUrl = await Url.create({
      shortCode,
      originalUrl: url,
      expiresAt
    })

    res.status(201).json({
      shortUrl: `${BASE_URL}/${shortCode}`
    })

  } catch (error) {

    res.status(500).json({
      error: "Server error"
    })

  }

}

exports.redirectUrl = async (req, res) => {

  try {

    const { code } = req.params

    const url = await Url.findOne({ shortCode: code })

    if (!url) {
      return res.status(404).json({ error: "URL not found" })
    }

    if (url.expiresAt && url.expiresAt < Date.now()) {
      return res.status(410).json({
        error: "This link has expired"
      })
    }

    url.clicks++
    await url.save()

    res.redirect(url.originalUrl)

  } catch (error) {

    res.status(500).json({ error: "Server error" })

  }

}

exports.getAnalytics = async (req, res) => {
  try {
    const { code } = req.params
    const url = await Url.findOne({ shortCode: code })
    if (!url) return res.status(404).json({ error: "URL not found" })

    res.json({
      shortCode: url.shortCode,
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt
    })
  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }
}