const express = require('express');
const { register, login, logout } = require('../controllers/user');
const { check } = require('express-validator');
const router = express.Router();

/* POST API user registration. */
router.post('/register', [
  check('firstName', 'Names should be no longer than 32 characters.').trim().isLength({max: 32}).optional({ nullable: true }),
  check('lastName', 'Names should be no longer than 32 characters.').trim().isLength({max: 32}).optional({ nullable: true }),
  check('emailAddress', 'Please submit a valid email address').trim().isEmail(),
  check('password', 'Password should be at least 8 characters, 1 lowercase, 1 number, & 1 symbol.').trim().isStrongPassword({
    minlength: 8,
    minLowercase: 1,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 1
  })
], register);

/* POST API user login. */
router.post('/login', [
  check('emailAddress', 'Please submit a valid email address').trim().isEmail(),
  check('password', 'Password should be at least 8 characters, 1 lowercase, 1 number, & 1 symbol.').trim().isStrongPassword({
    minlength: 8,
    minLowercase: 1,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 1
  })
], login);

/* POST API user logout. */
router.get('/logout', logout);

module.exports = router;