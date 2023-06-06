const loginHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector().value.trim();
    const password = document.querySelector().value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('failed to log in')
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginHandler);