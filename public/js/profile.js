// creates new message

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#message-name').value.trim();
  const description = document.querySelector('#message-desc').value.trim();

  if (title && description) {
    const response = await fetch(`/api/messages`, {
      method: 'post',
      body: JSON.stringify({ title, description }),
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

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/messages/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete message');
    }
  }
};

const messageList = document.querySelector('.message-list');
if (messageList) {
  messageList.addEventListener('click', delButtonHandler);
}

document.querySelector('.new-message-form-js').addEventListener('submit', newFormHandler);

document.querySelector('.message-list-js').addEventListener('click', delButtonHandler);
