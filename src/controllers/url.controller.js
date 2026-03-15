const Url = require("../models/url.model")
const { nanoid } = require("nanoid")

const BASE_URL = process.env.BASE_URL || "http://localhost:5000"

exports.createShortUrl = async (req, res) => {

  try {

    const { url } = req.body

    if(!url){
      return res.status(400).json({error:"URL required"})
    }

exports.createShortUrl = async (req, res) => {

  try {

    const { url } = req.body

    if (!url) {
      return res.status(400).json({ error: "URL is required" })
    }

    const shortCode = nanoid(6)

    const newUrl = await Url.create({
      shortCode,
      originalUrl: url
    })

    res.status(201).json({
      shortUrl: `${BASE_URL}/${shortCode}`
    })

  } catch (error) {
    res.status(500).json({ error: "Server error" })
  }

}


    let shortCode
    let exists = true

    while (exists) {
      shortCode = nanoid(6)
      exists = await Url.findOne({ shortCode })
    }

    const newUrl = await Url.create({
      shortCode,
      originalUrl: url
    })

    res.json({
      shortUrl: `${BASE_URL}/${shortCode}`
    })

  } catch(err){
    res.status(500).json({error:"Server error"})
  }

}

// Impliment redirect logic
exports.redirectUrl = async (req, res) => {

  try{

    const code = req.params.code

    const url = await Url.findOne({ shortCode: code })

    if(!url){
      return res.status(404).json({error:"URL not found"})
    }

    url.clicks++
    await url.save()

    res.redirect(url.originalUrl)

  } catch(err){
    res.status(500).json({error:"Server error"})
  }

}

// Analytics Endpoint
exports.getAnalytics = async (req,res)=>{

  try{

    const code = req.params.code

    const url = await Url.findOne({ shortCode: code })

    if(!url){
      return res.status(404).json({error:"Not found"})
    }

    res.json({
      originalUrl:url.originalUrl,
      clicks:url.clicks,
      createdAt:url.createdAt
    })

  }catch(err){
    res.status(500).json({error:"Server error"})
  }

}