const nodemailer = require("nodemailer")

const sendEmail = async(options,job)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',

        auth:{
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        },
    });
    const mailOptions = {
        from : "Rikesh shrestha",
        to : options.email,
        subject: options.subject,
        text: "Your opt is " + options.otp,
    };
    await transporter.sendMail(mailOptions);

};

module.exports = sendEmail