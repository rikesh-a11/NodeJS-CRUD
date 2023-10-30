const { blogs, users } = require("../../model")
const fs = require("fs")


//createlog 
exports.renderCreateBlog = (req,res)=>{
    res.render('createBlog')
}
//createBlog post
exports.CreateBlog = async(req,res)=>{

    // console.log(req.file)
    // const userId = req.user[0].id
    //first approach
    const title = req.body.title 
    const subTitle = req.body.subtitle 
    const description = req.body.description 
    const fileName = req.file.filename
    //second approach
    // const {title,subTitle,description} =req.body

    if(!title || !description || !subTitle || !req.file){
        return res.send(
            "please provide title,subTitle,description,file"
        )
    }

    //insert in database , takes some time in operation with database so use await keyword
   await blogs.create({
    title:title,
    subTitle:subTitle,
    description: description,
    userId: req.userId,
    image: process.env.PROJECT_URL + fileName
    })
    res.redirect("/")
}

// allblogs
exports.allBlogs = async(req,res)=>{
    const success = req.flash("success")

    // console.log(req) 
    
    //table bata data nikalnu parney
    const allBlogs = await blogs.findAll({
        include : {
            model : users //users table name
        }
    })
   
    res.render("blogs",{blogs:allBlogs,success })
}

//singleBlog
exports.singleBlog = async (req,res)=>{
    const id = req.params.id

    //specific id ko data find garna paryo hamro table bata
   const blog = await blogs.findAll({
        where: {
            id:id,
        },
        include : {
            model : users
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
    // const userId = req.userId
    const id = req.params.id 
    // console.log(req.body)
    const title = req.body.title
    const subTitle = req.body.subtitle
    const description = req.body.description
    
    // const oldData = await blogs.findAll({
    //     where : {
    //         id : id
    //     }
    // })
    // if(oldData[0].userId !== userId){
    //     return res.send("You cannot edit this blog")
    // }


    let fileUrl;
    if(req.file){
        fileUrl = process.env.PROJECT_URL + req.file.filename
    }else{
        fileUrl = oldData[0].image   //old fileUrl
    }



    await blogs.update({
        title : title,
        subTitle: subTitle,
        description: description,
        image : fileUrl
    },{
        where : {
            id: id
        }
    })


    res.redirect("/single/" + id)
}

//myBlogs ko lagi

exports.renderMyBlogs = async(req,res)=>{
    //get this users blogs
    const userId = req.userId
    //find blogs of this userId
    const myBlogs = await blogs.findAll({
        where : {
            userId : userId
        }
    })
    res.render("myBlogs.ejs",{myBlogs : myBlogs})
}