module.exports = {
    secret: process.env.SECRET || 'notpublic',
    transporter: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'transit.trackid@gmail.com',
            pass: 'sendMail45'
        },
        tls: {
            rejectUnauthorized: false
        }
    }
};
