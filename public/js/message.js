const newCommentHandler = async (event) => {
  event.preventDefault();

  const text = document.querySelector('#comment-text').value.trim();

  if (text) {
    const response = await fetch(`/api/comments`, {
      method: 'post',
      body: JSON.stringify({ text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create message');
    }
  }
};

document.querySelector('.new-comment-form-js').addEventListener('submit', newCommentHandler);
