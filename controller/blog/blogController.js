const { blogs } = require("../../model")

//createlog 
exports.renderCreateBlog = (req,res)=>{
    res.render('createBlog')
}
//createBlog post
exports.CreateBlog = async(req,res)=>{
    const userId = req.user[0].id
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
    description: description,
    userId: userId

    })
    res.redirect("/")
}

// allblogs
exports.allBlogs = async(req,res)=>{
    // console.log(req) 
    
    //table bata data nikalnu parney
    const allBlogs = await blogs.findAll()
    console.log("allBlogs")

    res.render("blogs",{blogs:allBlogs})
}

//singleBlog
exports.singleBlog = async (req,res)=>{
    const id = req.params.id

    //specific id ko data find garna paryo hamro table bata
   const blog = await blogs.findAll({
        where: {
            id:id,
        }
    })
    res.render("singleBlog.ejs",{blog:blog})
}

//delete blog
exports.deleteBlog = async(req,res)=>{
    const id = req.params.id

    //blogs vanne table bata yo tyo id delete gar vaneko
    await blogs.destroy({
        where:{
            id:id
        }
    })
    res.redirect("/")
}

//get edit blog
exports.renderEditBlog = async(req,res)=>{
    const id = req.params.id 
    //find blog of that id
  const blog = await blogs.findAll({
        where : {
            id:id
        }
    })
    res.render("editBlog.ejs",{blog : blog})
}

//post edit blog
exports.EditBlog = async(req,res)=>{
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
}