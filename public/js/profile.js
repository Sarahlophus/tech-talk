// snackbar div to variable x
const x = document.getElementById('snackbar');

// creates new message
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#message-name').value.trim();
  const description = document.querySelector('#message-desc').value.trim();

  // if there are values for title and description
  if (title && description) {
    // POST to create a new message
    const response = await fetch(`/api/messages`, {
      method: 'post',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //  if fetch response ok, redirect to profile page
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      // if response is not ok, temporarily show snackbar with failure
      // add inner HTML
      x.innerHTML = 'Failed to add a new message';
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
    x.innerHTML = 'Please fill out and select options for all fields before adding a message';
    // Add the "show" class to DIV
    x.className = 'show';

    // After 3 seconds, remove the show class from DIV and clear inner HTML
    setTimeout(function () {
      x.className = x.className.replace('show', '');
      x.innerHTML = '';
    }, 3000);
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/messages/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      // if response is not ok, temporarily show snackbar with error
      // add inner HTML
      x.innerHTML = 'Failed to delete message';
      // Add the "show" class to DIV
      x.className = 'show';

      // After 3 seconds, remove the show class from DIV and clear inner HTML
      setTimeout(function () {
        x.className = x.className.replace('show', '');
        x.innerHTML = '';
      }, 3000);
    }
  }
};

const messageList = document.querySelector('.message-list');
if (messageList) {
  messageList.addEventListener('click', delButtonHandler);
}

document.querySelector('.new-message-form-js').addEventListener('submit', newFormHandler);
