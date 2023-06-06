document.addEventListener("DOMContentLoaded", function() {
  // Get gameId from URL
  const urlParts = window.location.pathname.split('/');
  const gameId = urlParts[urlParts.length - 1];

  // Fetch posts and render them
  fetch(`/api/posts/${gameId}`)
      .then(response => response.json())
      .then(posts => {
          const postsContainer = document.getElementById('posts-container');

          posts.forEach(post => {
              const postElement = createPostElement(post);
              postsContainer.appendChild(postElement);
          });
      });

  // This is a helper function to create post HTML structure
  function createPostElement(post) {
      const postDiv = document.createElement('div');

      const title = document.createElement('h2');
      title.textContent = post.title;
      postDiv.appendChild(title);

      const content = document.createElement('p');
      content.textContent = post.content;
      postDiv.appendChild(content);

      // Create update form
      const updateForm = document.createElement('form');
      updateForm.action = '#';
      updateForm.method = 'POST';

      const updateTitleInput = document.createElement('input');
      updateTitleInput.type = 'text';
      updateTitleInput.name = 'title';
      updateTitleInput.value = post.title;
      updateTitleInput.required = true;
      updateForm.appendChild(updateTitleInput);

      const updateContentInput = document.createElement('textarea');
      updateContentInput.name = 'content';
      updateContentInput.textContent = post.content;
      updateContentInput.required = true;
      updateForm.appendChild(updateContentInput);

      const updateButton = document.createElement('button');
      updateButton.type = 'submit';
      updateButton.textContent = 'Update';
      updateForm.appendChild(updateButton);

      postDiv.appendChild(updateForm);

      // Create delete form
      const deleteForm = document.createElement('form');
      deleteForm.action = '#';
      deleteForm.method = 'POST';

      const deleteButton = document.createElement('button');
      deleteButton.type = 'submit';
      deleteButton.textContent = 'Delete';
      deleteForm.appendChild(deleteButton);

      postDiv.appendChild(deleteForm);

      return postDiv;
  }
});

  
