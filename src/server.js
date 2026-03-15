require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const urlRoutes = require("./routes/url.routes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/", urlRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

    console.log("MongoDB connected")

    app.listen(process.env.PORT || 5000, ()=>{
        console.log("Server running")
    })

})
.catch(err => console.log(err))