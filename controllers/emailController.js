'use strict';
const nodemailer = require('nodemailer');
var config = require('../config/config');


    var transporter = nodemailer.createTransport(config.transporter);

// setup email data with unicode symbols
    var mailOptions = {
        from: 'transit.trackid@gmail.com',
        subject: 'Transit pakket'
    };

    exports.sendMail = function (req, res) {
        mailOptions.to = req.body.emailto;
        mailOptions.html = '<p><img height="50" align="right" src="https://i.imgur.com/YxVHfN8.png"></p><p>Beste,</p><p>uw bestelling is verzonden, u kunt uw pakket opvolgen door op deze link te klikken <a href="http://www.transit.be/' + req.body.trackID  + '"> www.transit.be/' + req.body.trackID + '</a>.</p><hr><p>Transit</p><p>Kleinhoefstraat 4, 2240 Geel</p><p><img height="50" src="https://i.imgur.com/lidPfg4.png">'

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.status(500).json({error: error})
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return res.json({message: 'Mail sent', info: info})
        });
}


