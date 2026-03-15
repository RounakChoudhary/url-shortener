const mongoose = require("mongoose")

const UrlSchema = new mongoose.Schema({

  shortCode: {
    type: String,
    required: true,
    unique: true
  },

  originalUrl: {
    type: String,
    required: true
  },

  clicks: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  expiresAt: {
    type: Date,
    default: null
  }

})

module.exports = mongoose.model("Url", UrlSchema)