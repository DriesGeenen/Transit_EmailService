'use strict';


module.exports = function (app) {
    const AuthHelper = require('../helpers/authHelper');
    const EmailController = require('../controllers/emailController');

    app.route('/sendmail')
        .post(EmailController.sendMail);

    app.route('/sendmail/bulk')
        .post(EmailController.sendBulkMail);
};