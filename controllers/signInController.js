const usersDB = {
  users: require('../models/users.json'),
  setUser: (users) => {
    this.users = users
  }
};

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

const signIn = async (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);

  if (!username || ! password) {
    return res.status(400).json({message: 'Username/ password is required!'})
  }

  let foundUser = usersDB.users.find(user => user?.username);

  if (!foundUser) {
    return res.status(404).json({message: 'User not found!'})
  }

  let isPwMatched = await bcrypt.compare(password, foundUser.password);

  console.log('foundUser', isPwMatched)
};

const signUp = (req, res) => {
  // const userInfo = new UserInfo(req.body);

  // userInfo
  //   .save()
  //   .then((result) => res.json({ success: true }))
  //   .catch((err) => {
  //     // res.json({ success: false, error: err })
  //     // console.log(err);
  //     handleErrors(err);
  //   });

  console.log(req.body)

};

module.exports = {
  redirect,
  showSignInPage,
  signIn,
  signUp,
  showSignUpPage
};