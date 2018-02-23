const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const app = express();
var router = express.Router();
const jsonwebtoken = require("jsonwebtoken");
const cors = require('cors');
const emailRoutes = require('./routes/emailRoutes');


//Port number
const port = process.env.PORT || 6605;


app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], config.secret, function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
emailRoutes(app);

//index route
router.get('/', function (req, res) {
    res.json({message: 'Invalid Endpoint'});
});

//start server
app.listen(port, function () {
    console.log('Server started on port ' + port);
});



