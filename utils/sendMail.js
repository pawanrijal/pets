const nodemailer = require('nodemailer');

class SendMail {
    constructor(to, subject, html) {
        this.to = to;
        this.subject = subject;
        this.html = html;
    }

    send() {
        var transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "3cac273cf57bd5",
                pass: "e51b0d6434e2a2"
            }
        });
        const mailOptions = {
            from: 'pets@gmail.com',
            to: this.to,
            subject: this.subject,
            html: this.html
        };

        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }

}


module.exports = {SendMail};