const { renderRegisterForm, registerUser, renderLoginForm, loginUser, logOut, forgotPassword, checkForgotPassword, renderOtpForm, handleOTP, renderPasswordChangeForm, handlePasswordChange } = require("../controller/auth_/authController");
const catchError = require("../services/catchError");
const router = require("express").Router()


router.route("/register").get(renderRegisterForm).post(catchError (registerUser))

router.route("/login").get(renderLoginForm).post(catchError(loginUser))

router.route("/logout").get(catchError(logOut))

router.route("/forgotPassword").get(catchError(forgotPassword)).post(catchError(checkForgotPassword))

router.route("/otp").get(catchError(renderOtpForm))

router.route("/otp/:id").post(catchError(handleOTP))

router.route("/passwordChange").get(catchError(renderPasswordChangeForm))

router.route("/passwordChange/:email/:otp").post(catchError(handlePasswordChange))

module.exports = router; 