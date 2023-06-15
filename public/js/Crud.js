async function createPost(event) {
    event.preventDefault();

    const title = document.querySelector('#postTitle').value.trim();
    const content = document.querySelector('#postContent').value.trim();

    if (title && content) {
        const response = await fetch('/api/sports/posts', {
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
};

async function deletePost(event) {
    event.preventDefault();

    const postId = event.target.getAttribute('data-id');
    
    if (postId) {
        try {
            const response = await fetch(`/api/sports/posts/${postId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                console.error(`Server responded with: ${response.status}`);
                alert('Failed to delete post');
            } else {
                document.location.reload();
            }
        } catch (err) {
            console.error('Fetch Error:', err);
        }
    }
};

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', deletePost);
    });

    document.querySelector('#postForm').addEventListener('submit', createPost);
});

