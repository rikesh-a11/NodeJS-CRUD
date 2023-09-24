const { users } = require("../../model")
const bcrypt = require("bcryptjs")

exports.renderRegisterForm = (req,res)=>{
    res.render("register")
}

exports.registerUser = async(req,res)=>{
    const {email,username,password,confirmPassword} = req.body

    //check password with confrim password
    if(password !== confirmPassword){
        return res.send("password and confirmPassword doesn't matched")
    }

    //insert into table (users)
    await users.create({
        username,
        email,
        password: bcrypt.hashSync(password,8)
        
    })
    res.redirect("/login")

}

//login starts

exports.renderLoginForm = (req,res)=>{
    res.render("login")
}

exports.loginUser = (req,res)=>{
    console.log(req.body)
}
