const nodemailer = require('nodemailer');

// calling a function createTransport() that is inside nodemailer
// and passing configuration arguments to createTransporter function
// now transporter object has methods like sendMail()
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// sendEmail function can be called and pass arguments to it
// and it calls sendMail() inside it and sends the mail.
const sendEmail = async (to, subject, html) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        html: html,
    });
};

module.exports = sendEmail;