var env = require('./../config/connection');
var nodemailer = require("nodemailer");
var ejs = require('ejs');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    // port: 25,
    auth: {
        user: 'exceptionaire123@gmail.com',
        pass: 'Etpl@123.'
    }
});

exports.sendmail = function(usermail, mailmatter, subject) {
        // var html_path = __dirname + '/email-verification-sotstag.html';
        // var data = {
        //     mailmatter: mailmatter
        // };
    // ejs.renderFile(html_path, data, function (err, str) {
    //     var mailOptions = {
    //         from: 'info@sotstag.com',
    //         to: usermail,
    //         subject: subject,
    //         html: str
    //     };
    var mailOptions = {
        from: 'frogmen@gmail.com',
        to: usermail,
        subject: subject,
        html: mailmatter
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info);
        }
    });
// })

}
