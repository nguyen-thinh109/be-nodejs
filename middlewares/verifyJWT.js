const jwt = require('jsonwebtoken');
require('dotenv').config();
const path  =require('path');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.sendFile(path.join(__dirname, '..', 'views', 'unauthorize.html'));
    }
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

module.exports = verifyJWT