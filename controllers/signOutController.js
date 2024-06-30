const signOut = (req, res) => {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.clearCookie('token');
    return res.json({success: true});
};

module.exports = {
    signOut,
};