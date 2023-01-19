const form = document.querySelector('form');
const errorLogin = document.querySelector('.errorLogin');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // reset error textContent
  errorLogin.textContent = '';

  // get values from form
  const emailAddress = form.emailAddress.value;
  const password = form.password.value;

  try {
    const res = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        emailAddress: emailAddress,
        password: password
      }),
      headers: {'Content-Type': 'application/json'}
    });

    const data = await res.json();
    if (data.errors) {
      errorLogin.textContent = data.errors.loginError || data.errors.emailAddressError || data.errors.passwordError;
    } else if (data.user) {
      location.assign('/');
    }
  } catch (err) {
    console.error(err);
  }
})