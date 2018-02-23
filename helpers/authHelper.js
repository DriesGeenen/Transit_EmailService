exports.loginRequired = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

exports.trackingserviceRequired = function(req, res, next) {
    if (req.user && req.user.data.role === "trackingservice") {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized!' });
    }
};