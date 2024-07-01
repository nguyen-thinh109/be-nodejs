const signOut = (req, res) => {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.clearCookie('token', { httpOnly: true, sameSite: 'None', secure: true });
    return res.json({success: true});
};

module.exports = {
    signOut,
};