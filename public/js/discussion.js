// Add event listener to button
document.getElementById("discussion-btn").addEventListener('click', function () {
    openDiscussionPage("1234"); // replace with the actual game ID
});

function openDiscussionPage(gameId) {
    // Clean the body first
    document.body.innerHTML = '';

    // Create and append the discussion page title
    let discussionPageDiv = document.createElement("div");
    discussionPageDiv.textContent = `Discussion Page for Game ID: ${gameId}`;
    document.body.appendChild(discussionPageDiv);

    // Create and append the form to create new posts
    let newPostForm = document.createElement("form");
    newPostForm.action = '#';
    newPostForm.method = 'POST';

    let titleInput = document.createElement("input");
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInput.placeholder = 'Title';
    titleInput.required = true;
    newPostForm.appendChild(titleInput);

    let contentInput = document.createElement("textarea");
    contentInput.name = 'content';
    contentInput.placeholder = 'Content';
    contentInput.required = true;
    newPostForm.appendChild(contentInput);

    let postButton = document.createElement("button");
    postButton.type = 'submit';
    postButton.textContent = 'Post';
    newPostForm.appendChild(postButton);

    document.body.appendChild(newPostForm);

    // Create and append a container for posts
    let postsContainer = document.createElement("div");
    postsContainer.id = 'posts-container';
    document.body.appendChild(postsContainer);

    // Assuming that you have a fetchPosts function to load posts
    fetchPosts(gameId);
}

function fetchPosts(gameId) {
    fetch(`/api/posts/${gameId}`)
    .then(response => response.json())
    .then(posts => {
        const postsContainer = document.getElementById('posts-container');

        posts.forEach(post => {
            const postElement = createPostElement(post);
            postsContainer.appendChild(postElement);
        });
    });
}

function createPostElement(post) {
    // Define your createPostElement function here
}
