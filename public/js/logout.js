const logout = () => {
    // Redirect to the /logout route
    document.location.replace('/logout');
};

document.querySelector('#logout').addEventListener('click', logout);
