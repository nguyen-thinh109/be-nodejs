const jwt = require('jsonwebtoken');
const usersDB = {
    users: require('../models/users.json'),
    setUser: function (users) {
      this.users = users
    }
};
require('dotenv').config();

const handleRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies?.jwt;

    if (!refreshToken) {
        return res.status(401).json({ errorCode: '401', message: 'Session expired. Please sign-in again!' });
    }

    const foundUser = usersDB.users.find(user => user.refreshToken === refreshToken);

    if (!foundUser) {
        return res.status(401).json({ errorCode: '401', message: 'Session expired. Please sign-in again!' });
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            console.log('handleRefreshToken', err)
            if (err || decoded?.username !== foundUser.username) {
                return res.status(401).json({ errorCode: '401', message: 'Session expired. Please sign-in again!' }); //invalid token  ; //invalid token  
            }

            const accessToken = jwt.sign(
                { "username": foundUser.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );

            res.cookie('token', accessToken);
            next();
        }
    );
}

module.exports = { handleRefreshToken };