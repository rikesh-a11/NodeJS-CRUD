const { renderRegisterForm, registerUser, renderLoginForm, loginUser, logOut } = require("../controller/auth_/authController");
const router = require("express").Router()


router.route("/register").get(renderRegisterForm).post(registerUser)
router.route("/login").get(renderLoginForm).post(loginUser)
router.route("/logout").get(logOut)

module.exports = router;