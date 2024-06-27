const usersDB = {
  users: require('../models/users.json'),
  setUser: function (users) {
    this.users = users
  }
};
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    return res.status(404).json({message: 'User not found!'});
  }

  let isPwMatched = await bcrypt.compare(password, foundUser.password);

  console.log('isPasswordMatched', isPwMatched)

  if (isPwMatched) {
    return res.status(201).json({success: true});
  } else {
    return res.status(404).json({message: 'User not found!'});
  }
};

const signUp = async (req, res) => {
  console.log(req.body);
  const {username , password, phoneNumber, email} = req.body
  
  //Check duplicate username
  let isUsernameDulpicated = usersDB.users.find(user => user?.username === username)
  if (isUsernameDulpicated) {
    return res.status(400).json({message: 'Username existed!'})
  }

  //Check duplicate phoneNumber
  let isPhoneNumberDulpicated = usersDB.users.find(user => user?.phoneNumber === phoneNumber)
  if (isPhoneNumberDulpicated) {
    return res.status(400).json({message: 'Phone number existed!'})
  }

  //Check duplicate email
  let isEmailDulpicated = usersDB.users.find(user => user?.email === email)
  if (isEmailDulpicated) {
    return res.status(400).json({message: 'Email existed!'})
  }

  try {

    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = {username, phoneNumber, email, password: hashedPwd}
    //set new user
    usersDB.setUser([...usersDB.users, newUser]);
  
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'models', 'users.json'),
      JSON.stringify(usersDB.users)
    );
    
    res.status(201).json({success: true});
    
  } catch (error) {
    res.status(500).json({ 'message': err.message });
  }
};

module.exports = {
  redirect,
  showSignInPage,
  signIn,
  signUp,
  showSignUpPage
};

// HttpStatusCode {
//   OK = 200,
//   BAD_REQUEST = 400,
//   NOT_FOUND = 404,
//   INTERNAL_SERVER = 500,
//  }