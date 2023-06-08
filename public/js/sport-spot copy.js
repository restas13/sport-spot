document.addEventListener('DOMContentLoaded', (event) => {
    const userComment = localStorage.getItem('userComment');
    if (userComment) {
        document.getElementById('inputField').value = userComment;
    }
    

   // Store user comment to local storage on submit and append to comments section
document.getElementById('game','stats').addEventListener('click', function () {
    const comment = document.getElementById('inputField').value;

    // Check if the comment is not empty
    if (comment.trim() !== "") {
        localStorage.setItem('userComment', comment);
        appendCommentToWebpage(comment);
    } else {
        alert('Please enter a comment before submitting!');
    }
});


    // Append user comment to the comments section
    function appendCommentToWebpage(comment) {
        const commentContainer = document.createElement('div');
        commentContainer.textContent = comment;
        document.getElementById('commentList').appendChild(commentContainer);
    }

    // Retrieve user ID from local storage and append it to the webpage
    const userID = localStorage.getItem('userID');
    if (userID) {
        document.getElementById('userID').textContent = userID;
    }
});
