const { users } = require("../../model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require("../../services/sendEmail")
const { options } = require("../../routes/authRoute")

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

exports.loginUser = async(req,res)=>{
    const {email,password} = req.body

    //server side validation
    if(!email || !password){
        return res.send("email and password required")
    }

    //check is email exists or not
    const associatedDataWithEmail = await users.findAll({
        where : {
            email:email
        }
    })
    if(associatedDataWithEmail.length == 0){
        res.send("User Email doesn't exists")
    }else{
        const associatedEmailPassword = associatedDataWithEmail[0].password
        const isMatched = bcrypt.compareSync(password,associatedEmailPassword)  //trye or false return

        if(isMatched){

            //generate token here
            const token = jwt.sign({id:associatedDataWithEmail[0].id},process.env.SECRETKEY,{
                expiresIn: '30d'
            })
            res.cookie('token',token)  //browser ma application  tab vitra cookie vanney ma save hunxa


            res.send("login Sucess")
        }else{
        res.send("Invalid password")
        }
    }

}


//logout
exports.logOut = (req,res)=>{
    res.clearCookie('token')
    res.redirect("/login")
}

//fogot password 
exports.forgotPassword = (req,res)=>{
    res.render("forgotPassword.ejs")
}

exports.checkForgotPassword = async(req,res)=>{

    const email = req.body.email 
    if(!email){
        return res.send("please provide email")
    }
    //if email aayoo vane users table check with that email 
   const emailExists = await users.findAll({
        where : {
            email : email
        }
    })
        if(emailExists.length == 0){
            res.send("User with that email doesn't exist")
        }else{
            const generateOtp = Math.floor(1000 + Math.random() * 9000);
            // console.log(generateOtp)

            //tyo email ma OTP pathauney
           await sendEmail({
                email : email,
                subject : "Forgot password OTP",
                otp : generateOtp
            })
            emailExists[0].otp = generateOtp
            emailExists[0].otpGeneratedTime = Date.now()
            await emailExists[0].save()

            res.redirect("/otp?email=" + email)
        }
    
}

//otp form
exports.renderOtpForm = (req,res)=>{
    const email = req.query.email
    console.log(email)
    res.render("otpForm.ejs",{email : email})
}

//post method handle garna
exports.handleOTP = async(req,res)=>{
    const otp = req.body.otp
    const email = req.params.id 
    console.log(otp)
   
    if(!otp || !email){
        return res.send("please send email,otp")
    }
   const userData = await users.findAll({
        where : {
            email : email,
            otp : otp
        }
    })
    if(userData.length == 0){
        res.send("Invalid Otp")
    }else{
        const currentTime = Date.now()  //current time
        const otpGeneratedTime = userData[0].otpGeneratedTime  //past time
        
        if(currentTime - otpGeneratedTime <= 120000 ){
            userData[0].otp = null
            userData[0].otpGeneratedTime = null
            await userData[0].save()

            res.redirect("/passwordChange")
        }else{
            res.send("OTP has expired")
        }
    }
}

//change password 
exports.renderPasswordChangeForm = (req,res)=>{
    res.render("passwordChangeForm.ejs")
}