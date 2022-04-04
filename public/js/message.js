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
      alert('Failed to create message');
    }
  }
};

document.querySelector('.new-comment-form-js').addEventListener('submit', newCommentHandler);
