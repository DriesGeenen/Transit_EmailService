'use strict';


module.exports = function (app) {
    var AuthHelper = require('../helpers/authHelper');
    var EmailController = require('../controllers/emailController')

    app.route('/sendMail')
        .post(EmailController.sendMail);
};