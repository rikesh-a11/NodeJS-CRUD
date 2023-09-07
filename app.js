const express = require("express") //requiring express package
const { blogs } = require("./model/index")
const app = express()       //storing it in app, app vanne variable throughout use garinxa


//database connection
require("./model/index")



// ejs use garna lako , kk chainey ho env set gardey
app.set("view engine","ejs")

//form bata data aairaxa parse or habdle gar vaneko
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//AllBlogs
app.get('/',async (req,res)=>{
    // console.log(req) 
    
    //table bata data nikalnu parney
    const allBlogs = await blogs.findAll()
    console.log("allBlogs")

    res.render("blogs",{blogs:allBlogs})
})

//createBlog
app.get('/createBlog',(req,res)=>{
    res.render('createBlog')
})

//createBlog Post
app.post('/createBlog',async(req,res)=>{
    //first approach
    const title = req.body.title 
    const subTitle = req.body.subtitle 
    const description = req.body.description 
    //second approach
    // const {title,subTitle,description} =req.body

    //insert in database , takes some time in operation with database so use await keyword
   await blogs.create({
    title:title,
    subTitle:subTitle,
    description: description
    })
    res.redirect("/")
})



//port number (0-1100 for internal and 1100-6555 for services)
app.listen(3000,()=>{
    console.log("NodeJs Project has started on port 3000")
})
