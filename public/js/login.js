// snackbar div to variable x
const x = document.getElementById('snackbar');

// login form
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      // if response is not ok, temporarily show snackbar with failure
      // add inner HTML
      x.innerHTML = 'Failed to log in';
      // Add the "show" class to DIV
      x.className = 'show';

      // After 3 seconds, remove the show class from DIV and clear inner HTML
      setTimeout(function () {
        x.className = x.className.replace('show', '');
        x.innerHTML = '';
      }, 3000);
    }
  } else {
    // If values are missing, temporarily show snackbar to ask that user fills out all fields
    // add inner HTML
    x.innerHTML = 'Please fill out all fields to log in!';
    // Add the "show" class to DIV
    x.className = 'show';

    // After 3 seconds, remove the show class from DIV and clear inner HTML
    setTimeout(function () {
      x.className = x.className.replace('show', '');
      x.innerHTML = '';
    }, 3000);
  }
};

// signup form
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      // if response is not ok, temporarily show snackbar with failure
      // add inner HTML
      x.innerHTML = 'Failed to add user';
      // Add the "show" class to DIV
      x.className = 'show';

      // After 3 seconds, remove the show class from DIV and clear inner HTML
      setTimeout(function () {
        x.className = x.className.replace('show', '');
        x.innerHTML = '';
      }, 3000);
    }
  } else {
    // If values are missing, temporarily show snackbar to ask that user fills out all fields and selects all options
    // add inner HTML
    x.innerHTML = 'Please fill out all fields to sign up!';
    // Add the "show" class to DIV
    x.className = 'show';

    // After 3 seconds, remove the show class from DIV and clear inner HTML
    setTimeout(function () {
      x.className = x.className.replace('show', '');
      x.innerHTML = '';
    }, 3000);
  }
};

// event handlers
document.querySelector('.login-form-js').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form-js').addEventListener('submit', signupFormHandler);
