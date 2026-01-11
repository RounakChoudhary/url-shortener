const express=require("express");

const app=express();
const PORT=8000;
app.get("/", (req, res) => {
    res.send("hello");
});
app.listen(PORT,()=>{
    console.log("server is listening on port : ${PORT}",PORT);
})