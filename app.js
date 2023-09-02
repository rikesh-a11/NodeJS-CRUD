const express = require("express") //requiring express package
const app = express()       //storing it in app, app vanne variable throughout use garinxa


app.get('/',(req,res)=>{
    res.send("<h1>home page hi</h1>")
})
1
app.get("/about",(req,res)=>{
    res.send("About page")
})





//port number (0-1100 for internal and 1100-6555 for services)
app.listen(3000,function(){
    console.log("NodeJs Project has started on port 3000")
})
