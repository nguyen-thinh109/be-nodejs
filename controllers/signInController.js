var crypto = require('crypto');

const showSignInPage = (req, res) => {
    res.render("sign-in");
};

const redirect = (req, res) => {
    res.redirect("/sign-in");
};

const signIn = (req, res) => {
    const {username, pasword} = req.body;

    var decrypt = crypto.createDecryptor();

    decrypt.update(username);

    var decrypted = decrypt.finalize();

    console.log(request, decrypted)
};

module.exports = {
    redirect,
    showSignInPage,
    signIn
};