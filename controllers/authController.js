const User = require('../models/User');
const { createToken } = require('./jwt');

// error handler
const handleErr = (err) => {
  console.log(err.message, err.code);
  let errors = {};

  // authentication errors
  if (err.message == 'Invalid email/password') {
    errors['loginError'] = err.message;
  }

  // validation errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path + 'Error'] = properties.message;
    });
  }
  // duplicate key errors
  if (err.code === 11000) {
    errors['keyError'] = 'Email address already exists.';
  }

  return errors;
}


module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.register_get = (req, res) => {
  res.render('register');
}

module.exports.register_post = async (req, res) => {
  const {firstName, lastName, emailAddress, password} = req.body;

  try {
    const user = await User.create({firstName, lastName, emailAddress, password});
    const token = createToken(user._id);
    const maxAge = 3 * 24 * 60 * 60 * 1000;

    res.cookie('authToken', token, { httpOnly: true, maxAge: maxAge});
    res.status(201).json({user: user._id});
  } catch (err) {
    const errors = handleErr(err);
    res.status(400).json({errors});
  }
}

module.exports.login_post = async (req, res) => {
  const {emailAddress, password} = req.body;

  try {
    const user = await User.login(emailAddress, password);
    const token = createToken(user._id);
    const maxAge = 3 * 24 * 60 * 60 * 1000;

    res.cookie('authToken', token, { httpOnly: true, maxAge: maxAge});
    res.status(200).json({ user: user._id});
  } catch (err) {
    const errors = handleErr(err);
    res.status(400).json({errors});
  }
}

module.exports.logout_get = (req, res) => {
  res.clearCookie('authToken');
  res.redirect('/');
  res.end();
}