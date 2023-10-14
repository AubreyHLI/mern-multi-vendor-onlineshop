const nodemailer = require('nodemailer');

const sendEmail = async (mail) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_SENDER_EMAIL, 
            pass: process.env.SMTP_SENDER_PW, 
        },
    });

    // send mail with defined transport object
    await transporter.sendMail({
        from: process.env.SMTP_SENDER_EMAIL, // sender address
        to: mail.receiver, // list of receivers
        subject: mail.subject, // Subject line
        html: mail.html, // html body
    });
};

module.exports = sendEmail;