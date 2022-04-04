const updateButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/edit/messages/${id}`, {
      method: 'PUT',
    });

    if (response.ok) {
      location.reload();
    } else {
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
  } else {
    // If values are missing, temporarily show snackbar to ask that user completes a comment
    // add inner HTML
    x.innerHTML = 'You must edit your message to update it!';
    // Add the "show" class to DIV
    x.className = 'show';

    // After 3 seconds, remove the show class from DIV and clear inner HTML
    setTimeout(function () {
      x.className = x.className.replace('show', '');
      x.innerHTML = '';
    }, 3000);
  }
};

// event listener
document.querySelector('.message-list-js').addEventListener('click', updateButtonHandler);
