// Add event listener to button
document.getElementById("discussion-btn").addEventListener('click', function () {
    openDiscussionPage("1234"); // replace with the actual game ID
});

function openDiscussionPage(gameId) {
    // Clean the body first
    document.body.innerHTML = '';

    // Create and append the discussion page title
    let discussionPageDiv = document.createElement("div");
    discussionPageDiv.textContent = `discussion: ${gameId}`;
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

    // Load and display posts
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
    // Create and append a container for each post
    const postContainer = document.createElement("div");
    postContainer.classList.add("post-container");

    // Create and append post title
    const titleElement = document.createElement("h2");
    titleElement.textContent = post.title;
    postContainer.appendChild(titleElement);

    // Create and append post content
    const contentElement = document.createElement("p");
    contentElement.textContent = post.content;
    postContainer.appendChild(contentElement);

    // Create update button
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.addEventListener("click", function () {
        // Handle update logic here
        const newTitle = prompt("Enter new title:", post.title);
        const newContent = prompt("Enter new content:", post.content);

        if (newTitle && newContent) {
            updatePost(post.id, newTitle, newContent);
        }
    });
    postContainer.appendChild(updateButton);

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
        // Handle delete logic here
        deletePost(post.id);
    });
    postContainer.appendChild(deleteButton);

    return postContainer;
}

function updatePost(postId, newTitle, newContent) {
    // Send a PUT request to update the post with the provided ID
    fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: newTitle,
            content: newContent
        
        })
    
    
    })
}
