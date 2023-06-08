document.addEventListener('DOMContentLoaded', (event) => {
  const userComment = localStorage.getItem('userComment');
  if (userComment) {
    const inputField = document.getElementById('inputField');
    if (inputField) {
      inputField.value = userComment;
    }
  }

  const submitBtn = document.getElementById('submit-Btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', function() {
      const inputField = document.getElementById('inputField');
      if (inputField) {
        const comment = inputField.value;
        localStorage.setItem('userComment', comment);
        appendCommentToWebpage(comment);
      }
    });
  }

  function appendCommentToWebpage(comment) {
    const commentContainer = document.createElement('div');
    commentContainer.textContent = comment;
    const commentList = document.getElementById('commentList');
    if (commentList) {
      commentList.appendChild(commentContainer);
    }
  }

  const userID = localStorage.getItem('userID');
  if (userID) {
    const userIdElement = document.getElementById('userID');
    if (userIdElement) {
      userIdElement.textContent = userID;
    }
  } 
});
