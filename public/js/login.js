const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const nameEl = document.querySelector('#name-login').value.trim();
  const passwordEl = document.querySelector('#password-login').value.trim();

  if (nameEl && passwordEl) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        nameEl,
        passwordEl
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
