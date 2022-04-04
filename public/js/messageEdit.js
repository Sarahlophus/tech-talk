const updateButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/edit/messages/${id}`, {
      method: 'PUT',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update message');
    }
  }
};

// fetch request

document.querySelector('.message-list-js').addEventListener('click', updateButtonHandler);
