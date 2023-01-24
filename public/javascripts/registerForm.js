const form = document.querySelector('form');
const errorFirstName = document.querySelector('.errorFirstName');
const errorLastName = document.querySelector('.errorLastName');
const errorEmailAddress = document.querySelector('.errorEmailAddress');
const errorUsername = document.querySelector('.errorUsername');
const errorPassword = document.querySelector('.errorPassword');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // reset error textContent
  errorFirstName.textContent = '';
  errorLastName.textContent = '';
  errorEmailAddress.textContent = '';
  errorUsername.textContent = '';
  errorPassword.textContent = '';

  // get values from form
  console.log(form.username.value);
  const firstName = form.firstName.value;
  const lastName = form.lastName.value;
  const username = form.username.value;
  const emailAddress = form.emailAddress.value;
  const password = form.password.value;

  try {
    const res = await fetch('/register', {
      method: 'POST',
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        username: username,
        emailAddress: emailAddress,
        password: password
      }),
      headers: {'Content-Type': 'application/json'}
    });

    const data = await res.json();
    if (data.errors) {
      errorFirstName.textContent = data.errors.firstName || data.errors.firstNameError;
      errorLastName.textContent = data.errors.lastName || data.errors.lastNameError;
      errorUsername.textContent = data.errors.username || data.errors.usernameError;
      errorEmailAddress.textContent = data.errors.emailAddress || data.errors.emailAddressError || data.errors.keyError;
      errorPassword.textContent = data.errors.password || data.errors.passwordError;
    } else if (data.user) {
      location.assign('/');
    }
  } catch (err) {
    console.error(err);
  }
})