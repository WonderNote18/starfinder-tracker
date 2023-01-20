const User = require('../models/User');

const getUserInfo = async (req, res) => {
  const user = await User.fetchUser(req.cookies.authToken.id);
  return user;
}

const overview_get = (req, res) => {
  getUserInfo(req).then(userRes => {
    res.render('home/index', {user: userRes});
  });
}

module.exports = { overview_get }