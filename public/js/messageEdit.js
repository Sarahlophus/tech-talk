const x = document.getElementById('snackbar');

// update a message
const updateMessageHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#message-name').value.trim();
  const description = document.querySelector('#message-desc').value.trim();

  // if there are values for title and description
  if (title && description) {
    const id = document.querySelector('#id');

    console.log('there is a title and description');
    // PUT to update message
    console.log(id.dataset.id);
    const response = await fetch(`/api/messages/${id.dataset.id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //  if fetch response ok, redirect to profile page
    if (response.ok) {
      console.log('response okay');
      document.location.replace('/profile');
    } else {
      console.log('response not okay');
      // if response is not ok, temporarily show snackbar with failure
      // add inner HTML
      x.innerHTML = 'Failed to update message';
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

// event listener
document.querySelector('.update-message-form-js').addEventListener('submit', updateMessageHandler);
