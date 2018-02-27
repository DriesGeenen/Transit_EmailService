'use strict';
const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport(config.transporter);

// setup email data with unicode symbols
const mailOptions = {
    from: 'transit.trackid@gmail.com',
    subject: 'Transit pakket'
};

exports.sendMail = function (req, res) {
    mailOptions.to = req.body.email;
    mailOptions.html = '<p><img height="50" align="right" src="https://i.imgur.com/YxVHfN8.png"></p><p>Beste,</p><p>uw bestelling is verzonden, u kunt uw pakket opvolgen door op deze link te klikken <a href="http://www.transit.be/' + req.body.trackingCode + '"> www.transit.be/' + req.body.trackingCode + '</a>.</p><hr><p>Transit</p><p>Kleinhoefstraat 4, 2240 Geel</p><p><img height="50" src="https://i.imgur.com/lidPfg4.png">'

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.status(500).json({error: error})
        }
        return res.json({message: 'Mail sent', info: info})
    });
};

exports.sendBulkMail = function(req, res){
    const requestArray = req.body;
    const errorArray = [];
    const infoArray = [];
    //console.log(requestArray);
    const length = requestArray.length;
    let index = 0;

    sendSingleMail();
    function sendSingleMail(){
        if (index === length){
            if (errorArray.length !== 0) return res.status(200).json({errors: errorArray});
            return res.json({message: 'All mails have been sent without errors', info: infoArray});
        }
        mailOptions.to = requestArray[index].email;
        mailOptions.html = '<p><img height="50" align="right" src="https://i.imgur.com/YxVHfN8.png"></p><p>Beste,</p><p>uw bestelling is verzonden, u kunt uw pakket opvolgen door op deze link te klikken <a href="http://www.transit.be/' + requestArray[index].trackingCode + '"> www.transit.be/' + requestArray[index].trackingCode + '</a>.</p><hr><p>Transit</p><p>Kleinhoefstraat 4, 2240 Geel</p><p><img height="50" src="https://i.imgur.com/lidPfg4.png">';

        transporter.sendMail(mailOptions, function (error, info) {
            index++;
            if (error) {
                errorArray.push(error);
            } else{
                infoArray.push(info);
            }
            sendSingleMail();
        });
    }
};
