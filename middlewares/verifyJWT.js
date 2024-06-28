const jwt = require('jsonwebtoken');
require('dotenv').config();
const acceptPaths = require('../config/verifiedPaths')

const verifyJWT = (req, res, next) => {
    const currentPath = req.originalUrl;
    const authHeader = req.headers['authorization'];

    console.log('currentPath', currentPath);
    console.log('authHeader', authHeader);

    if (!authHeader && acceptPaths.verifiedPaths.indexOf(currentPath) != -1) {
        return res.render('sign-in');
    }

    if (!authHeader && acceptPaths.verifiedPaths.indexOf(currentPath) == -1) {
        return next();
    }

    if (authHeader) {
        // res.sendStatus(401);
        console.log(authHeader); // Bearer token
        const token = authHeader.split(' ')[1];
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.sendStatus(403); //invalid token
                req.user = decoded.username;
                next();
            }
        );
    }
}

module.exports = verifyJWT