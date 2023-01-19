const form = document.querySelector('form');
const errorFirstName = document.querySelector('.errorFirstName');
const errorLastName = document.querySelector('.errorLastName');
const errorEmailAddress = document.querySelector('.errorEmailAddress');
const errorPassword = document.querySelector('.errorPassword');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // reset error textContent
  errorFirstName.textContent = '';
  errorLastName.textContent = '';
  errorEmailAddress.textContent = '';
  errorPassword.textContent = '';

  // get values from form
  const firstName = form.firstName.value;
  const lastName = form.lastName.value;
  const emailAddress = form.emailAddress.value;
  const password = form.password.value;

  try {
    const res = await fetch('/register', {
      method: 'POST',
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        password: password
      }),
      headers: {'Content-Type': 'application/json'}
    });

    const data = await res.json();
    if (data.errors) {
      errorFirstName.textContent = data.errors.firstName || data.errors.firstNameError;
      errorLastName.textContent = data.errors.lastName || data.errors.lastNameError;
      errorEmailAddress.textContent = data.errors.emailAddress || data.errors.emailAddressError || data.errors.keyError;
      errorPassword.textContent = data.errors.password || data.errors.passwordError;
    } else if (data.user) {
      location.assign('/');
    }
  } catch (err) {
    console.error(err);
  }
})