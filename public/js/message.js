// snackbar div to variable x
const x = document.getElementById('snackbar');

const newCommentHandler = async (event) => {
  event.preventDefault();

  const message_id = document.querySelector('input[name="message_id"]').value.trim();
  const text = document.querySelector('#comment-text').value.trim();

  if (text) {
    const response = await fetch(`/api/comments`, {
      method: 'post',
      body: JSON.stringify({ message_id, text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      location.reload();
    } else {
      // if response is not ok, temporarily show snackbar with failure
      // add inner HTML
      x.innerHTML = 'Failed to add a new comment';
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
    x.innerHTML = 'You must write a comment to add a comment!';
    // Add the "show" class to DIV
    x.className = 'show';

    // After 3 seconds, remove the show class from DIV and clear inner HTML
    setTimeout(function () {
      x.className = x.className.replace('show', '');
      x.innerHTML = '';
    }, 3000);
  }
};

document.querySelector('.new-comment-form-js').addEventListener('submit', newCommentHandler);
