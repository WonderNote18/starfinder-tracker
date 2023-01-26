// error handler
const handleErr = (err) => {
  console.log(err.message, err.code);
  let errors = {};

  // authentication errors
  if (err.message == 'Invalid email/password') {
    errors['loginError'] = err.message;
  }

  // validation errors
  if (err.message.includes('validation failed')) {
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

module.exports = { handleErr }