
document.addEventListener('DOMContentLoaded', (event) => {
  const postForm = document.getElementById('postForm');
  const postTitle = document.getElementById('postTitle');
  const postContent = document.getElementById('postContent');
  const submitButton = document.getElementById('submit-button');
  const updateButton = document.getElementById('update-button');
  const postList = document.getElementById('postList');
  
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  let isUpdateMode = false;
  let postToUpdate = null;
  
  function renderPosts() {
    postList.innerHTML = '';
    const template = Handlebars.compile(document.getElementById('post-template').innerHTML);
    
    posts.forEach((post, index) => {
      const html = template(post);
      const postDiv = document.createElement('div');
      postDiv.innerHTML = html;
      postDiv.querySelector('.edit-button').addEventListener('click', function() {
        isUpdateMode = true;
        postToUpdate = index;
        postTitle.value = post.title;
        postContent.value = post.content;
        submitButton.style.display = 'none';
        updateButton.style.display = 'block';
      });
      postDiv.querySelector('.delete-button').addEventListener('click', function() {
        posts.splice(index, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
      });
      postList.appendChild(postDiv);
    });
  }
  
  renderPosts();
  
  postForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = postTitle.value;
    const content = postContent.value;
    if (isUpdateMode) {
      posts[postToUpdate] = { title, content };
      isUpdateMode = false;
      submitButton.style.display = 'block';
      updateButton.style.display = 'none';
      postTitle.value = '';
      postContent.value = '';
    } else {
      posts.push({ title, content });
    }
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
  });
  
  updateButton.addEventListener('click', function(event) {
    event.preventDefault();
    const title = postTitle.value;
    const content = postContent.value;
    posts[postToUpdate] = { title, content };
    isUpdateMode = false;
    submitButton.style.display = 'block';
    updateButton.style.display = 'none';
    postTitle.value = '';
    postContent.value = '';
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
  });
});
