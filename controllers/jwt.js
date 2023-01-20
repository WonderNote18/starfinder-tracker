require('dotenv').config();
const jwt = require('jsonwebtoken');

function createToken(id) {
  // magAxe (days * hours * minutes * seconds)
  const maxAge = 1 * 24 * 60 * 60;
  return jwt.sign({ id }, 
    process.env.JWT_SECRET,
    { expiresIn: maxAge}
    );
}

function requireAuth(req, res, next) {
  isAuth(req).then(authRes => {
    // check JWT if exists and verified
    if (authRes.isAuthenticated) {
      next();
    } else {
      res.redirect('/login');
    }
  });


}

async function isAuth(req) {
  // check JWT if exists and verified
  const token = req.cookies.authToken;
  var flag, decodedToken;

  if (!token) {
    flag = false;
    return flag;
  }

  try {
    await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        flag = false;
      }
      if (decoded) {
        decodedToken = decoded;
        flag = true;
      }
    });
  } catch (err) {
    console.log(err);
    flag = false;
  }

  return {isAuthenticated: flag, token: decodedToken};
}

module.exports = {createToken, requireAuth, isAuth};