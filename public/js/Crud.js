async function createPost(event) {
    event.preventDefault();

    const title = document.querySelector('#postTitle').value.trim();
    const content = document.querySelector('#postContent').value.trim();

    if (title && content) {
        console.log('response');
        const response = await fetch('/api/sports/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(response);

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create a new post');
        }
    }
};

document.querySelector('#postForm').addEventListener('submit', createPost);