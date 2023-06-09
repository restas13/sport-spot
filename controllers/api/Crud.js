// Create a new post
async function createPost(event) {
    event.preventDefault();
  
    const title = document.querySelector('#postTitle').value.trim();
    const content = document.querySelector('#postContent').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create a new post');
      }
    }
  }
  
  // Update a post
  async function updatePost(event) {
    event.preventDefault();
  
    const postId = event.target.dataset.postId;
    const title = document.querySelector(`#postTitle_${postId}`).value.trim();
    const content = document.querySelector(`#postContent_${postId}`).value.trim();
  
    if (postId && title && content) {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to update the post');
      }
    }
  }
  
  // Delete a post
  async function deletePost(event) {
    event.preventDefault();
  
    const postId = event.target.dataset.postId;
  
    if (postId) {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete the post');
      }
    }
  }
  
  // Create a new comment
  async function createComment(event) {
    event.preventDefault();
  
    const postId = event.target.dataset.postId;
    const text = document.querySelector(`#commentText_${postId}`).value.trim();
  
    if (postId && text) {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create a new comment');
      }
    }
  }
  
  // Update a comment
  async function updateComment(event) {
    event.preventDefault();
  
    const commentId = event.target.dataset.commentId;
    const text = document.querySelector(`#commentText_${commentId}`).value.trim();
  
    if (commentId && text) {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify({ text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to update the comment');
      }
    }
  }
  
  // Delete a comment
  async function deleteComment(event) {
    event.preventDefault();
  
    const commentId = event.target.dataset.commentId;
  
    if (commentId) {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete the comment');
      }
    }
  }
  
  // Event listeners
  document.querySelector('#postForm').addEventListener('submit', createPost);
  document.querySelectorAll('.updatePostForm').forEach(form => {
    form.addEventListener('submit', updatePost);
  });
  document.querySelectorAll('.deletePostBtn').forEach(btn => {
    btn.addEventListener('click', deletePost);
  });
  document.querySelectorAll('.createCommentForm').forEach(form => {
    form.addEventListener('submit', createComment);
  });
  document.querySelectorAll('.updateCommentForm').forEach(form => {
    form.addEventListener('submit', updateComment);
  });
  document.querySelectorAll('.deleteCommentBtn').forEach(btn => {
    btn.addEventListener('click', deleteComment);
  });
  