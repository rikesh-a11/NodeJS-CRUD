const jwt =  require("jsonwebtoken")
// const promisify = require("util").promisify
const {promisify} = require("util")
const { users } = require("../model")

exports.isAuthenticated = async(req,res,next)=>{
    const token = req.cookies.token

    //check if token given or not
    if(!token){
        return res.send("you must be login")
    }
    //if token is legit or not
    const decryptedResult = await promisify(jwt.verify)(token,process.env.SECRETKEY)
    console.log(decryptedResult)

    //check if that id (userId) users table ma exists xa
     const userExist = await users.findAll({
        where : {
            id : decryptedResult.id
        }
    })


    //check if length is zero or not(zero -> user not exist)
    if(userExist.length == 0){
        res.send("user with that token doesnt exist")
    }else{
        req.user = userExist;
        req.userId = userExist[0].id;
        next();
    }
}
