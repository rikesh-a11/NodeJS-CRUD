const express = require("express") //requiring express package
const { blogs } = require("./model/index")
const app = express()       //storing it in app, app vanne variable throughout use garinxa


//database connection
require("./model/index")



// ejs use garna lako , kk chainey ho env set gardey
app.set("view engine","ejs")

//form bata data aairaxa parse or handle gar vaneko
app.use(express.json())    //remember these 2 line
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


//single blog page
app.get("/single/:id",async (req,res)=>{
    const id = req.params.id

    //specific id ko data find garna paryo hamro table bata
   const blog = await blogs.findAll({
        where: {
            id:id,
        }
    })
    res.render("singleBlog.ejs",{blog:blog})
})


//delete page
app.get("/delete/:id",async(req,res)=>{
    const id = req.params.id

    //blogs vanne table bata yo tyo id delete gar vaneko
    await blogs.destroy({
        where:{
            id:id
        }
    })
    res.redirect("/")
} )


//edit blogs
    app.get("/edit/:id",async(req,res)=>{
        const id = req.params.id 
        //find blog of that id
      const blog = await blogs.findAll({
            where : {
                id:id
            }
        })
        res.render("editBlog.ejs",{blog : blog})
    })


    
    app.post("/editBlog/:id",async(req,res)=>{
        const id = req.params.id 
        console.log(req.body)
        const title = req.body.title
        const subTitle = req.body.subtitle
        const description = req.body.description

        await blogs.update({
            title : title,
            subTitle: subTitle,
            description: description
        },{
            where : {
                id: id
            }
        })
        res.redirect("/single/" + id)
    })




//port number (0-1100 for internal and 1100-6555 for services)
app.listen(3000,()=>{
    console.log("NodeJs Project has started on port 3000")
})
