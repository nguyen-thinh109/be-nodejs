const UserInfo = require('../models/userInfo');

const showSignInPage = (req, res) => {
    res.render("sign-in");
};

const redirect = (req, res) => {
    res.redirect("/sign-in");
};

const signIn = (req, res) => {
    const {username , password} = req.body;

    UserInfo.findOne({ username: username, password: password })
      .then((result) => {
        // res.json({ success: true });
        console.log(req.body, result);
      })
      .catch((err) => {
        console.log(err);
      });

};

const signUp = (req, res) => {
    const userInfo = new UserInfo(req.body);

    userInfo
      .save()
      .then((result) => res.json({ success: true }))
      .catch((err) => {
        console.log(err);
      });

    console.log(req.body)
    
};

module.exports = {
    redirect,
    showSignInPage,
    signIn,
    signUp
};