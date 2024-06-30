const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const currentPath = req.originalUrl;
    const token = req.cookies?.token;

    console.log('currentPath', currentPath);
    console.log('token', token);

    if (!token) {
        res.redirect('sign-in');
    }

    if (token) {
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    return res.status(403).redirect('/unauthorized'); //invalid token  
                }

                req.user = decoded.username;
                next();
            }
        );
    }
}

module.exports = verifyJWT