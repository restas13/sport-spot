console.log('connected');

const loginHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response);
        console.log('referenced');

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('failed to log in')
            console.log('failed');
        }
    }
};


const signupHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-sup').value.trim();
    const email = document.querySelector('#email-sup').value.trim();
    const password = document.querySelector('#password-sup').value.trim();

    if (email && password && username) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response);

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('failed to sign up');
            console.log('failed');
        }
    }
}

document
    .querySelector('.login-form')
    .addEventListener('submit', loginHandler);


document
    .querySelector('.signup-form')
    .addEventListener('submit', signupHandler);


