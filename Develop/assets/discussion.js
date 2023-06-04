   // JavaScript code for live score tracking and user discussions/comments
    // Replace the following code with your own implementation

    // Simulating live score updates for multiple matches
    function updateScore() {
        const scoreElement = document.getElementById('score');
        setInterval(() => {
          const teams = [
            { name: 'Team A', score: Math.floor(Math.random() * 100) },
            { name: 'Team B', score: Math.floor(Math.random() * 100) },
            { name: 'Team C', score: Math.floor(Math.random() * 100) },
            { name: 'Team D', score: Math.floor(Math.random() * 100) }
          ];
  
          const scoreText = teams.map(team => `${team.name}: ${team.score}`).join(' | ');
          scoreElement.textContent = scoreText;
        }, 2000);
      }
  
      // Simulating user comments
      function addComment(event) {
        event.preventDefault();
        const commentInput = document.getElementById('comment-input');
        const comment = commentInput.value.trim();
  
        if (comment !== '') {
          const commentsList = document.getElementById('comments');
          const newComment = document.createElement('li');
          newComment.className = 'comment';
          newComment.innerHTML = `<span>User:</span> ${comment}`;
          commentsList.appendChild(newComment);
          commentInput.value = '';
        }
      }
  
      // Start live score updates
      updateScore();
  
      // Add event listener for submitting comments
      const commentForm = document.getElementById('new-comment');
      commentForm.addEventListener('submit', addComment);