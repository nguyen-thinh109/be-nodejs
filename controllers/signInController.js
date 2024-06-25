const UserInfo = require('../models/userInfo');

const handleErrors = (err) => {
  // res.json({ success: false, error: err })
  console.log(err.message, err.code);
}

const showSignInPage = (req, res) => {
  res.render("sign-in");
};

const showSignUpPage = (req, res) => {
  res.render('sign-up')
}

const redirect = (req, res) => {
  res.redirect("/sign-in");
};

const signIn = (req, res) => {
  const { username, password } = req.body;

  UserInfo.findOne({ username: username, password: password })
    .then((result) => {
      console.log(req.body, result);
      if (result != null) {
        res.json({ success: true });
      } else {
        res.json({ success: false, error: 'Tài khoản không tồn tại!' })
      }
    })
    .catch((err) => {
      handleErrors(err);
    });

};

const signUp = (req, res) => {
  const userInfo = new UserInfo(req.body);

  userInfo
    .save()
    .then((result) => res.json({ success: true }))
    .catch((err) => {
      // res.json({ success: false, error: err })
      // console.log(err);
      handleErrors(err);
    });

  console.log(req.body)

};

module.exports = {
  redirect,
  showSignInPage,
  signIn,
  signUp,
  showSignUpPage
};