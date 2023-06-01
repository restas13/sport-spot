// Function to create a new post
async function createPost() {
    const title = document.querySelector('#postTitle').value;
    const content = document.querySelector('#postContent').value;
    const userId = getUserId(); // Assuming you have a function to get the user ID
  
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, userId }),
      });
  
      if (response.ok) {
        const newPost = await response.json();
        // Perform any necessary actions after creating the post
        console.log('New post created:', newPost);
      } else {
        // Handle error if creating post fails
        console.log('Failed to create post');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
  
  // Function to update a post
  async function updatePost(postId) {
    const title = document.querySelector('#postTitle').value;
    const content = document.querySelector('#postContent').value;
  
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
  
      if (response.ok) {
        // Perform any necessary actions after updating the post
        console.log('Post updated successfully');
      } else {
        // Handle error if updating post fails
        console.log('Failed to update post');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
  
  // Function to delete a post
  async function deletePost(postId) {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Perform any necessary actions after deleting the post
        console.log('Post deleted successfully');
      } else {
        // Handle error if deleting post fails
        console.log('Failed to delete post');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
  
  // Function to create a new comment
  async function createComment(postId) {
    const text = document.querySelector('#commentText').value;
  
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, postId }),
      });
  
      if (response.ok) {
        const newComment = await response.json();
        // Perform any necessary actions after creating the comment
        console.log('New comment created:', newComment);
      } else {
        // Handle error if creating comment fails
        console.log('Failed to create comment');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
  
  // Function to update a comment
  async function updateComment(commentId) {
    const text = document.querySelector('#commentText').value;
  
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
  
      if (response.ok) {
        // Perform any necessary actions after updating the comment
        console.log('Comment updated successfully');
      } else {
        // Handle error if updating comment fails
        console.log('Failed to update comment');
      }
    } catch (error) {
        console.log('Error:', error);
      }
    }
  



  