const signOut = (req, res) => {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
};

module.exports = {
    signOut,
};