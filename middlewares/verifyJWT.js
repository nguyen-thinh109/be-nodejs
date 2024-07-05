const jwt = require('jsonwebtoken');
const refreshTokenController = require('../controllers/refreshTokenController')
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const currentPath = req.originalUrl;
    const token = req.cookies?.token;

    console.log('currentPath', currentPath);
    // console.log('token', token);

    if (!token) {
        // return res.status(401).send({ errorCode: '401', message: 'Session expired. Please sign-in again!' });
        res.status(401).render('unauthorized')
    }

    if (token) {
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err?.message === 'jwt expired') {
                    console.log('TokenExpiredError: jwt expired')
                    return refreshTokenController.handleRefreshToken(req, res, next)
                }
                
                if (err && err?.message !== 'jwt expired') {
                    return res.status(401).json({ errorCode: '401', message: 'Session expired. Please sign-in again!' }); //invalid token  
                }

                req.user = decoded.username;
                next();
            }
        );
    }
}

module.exports = verifyJWT