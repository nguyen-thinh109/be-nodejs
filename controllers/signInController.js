const showSignInPage = (req, res) => {
    res.render("sign-in");
};

const redirect = (req, res) => {
    res.redirect("/pending");
};

module.exports = {
    redirect,
    showSignInPage,
};