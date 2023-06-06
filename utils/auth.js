const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        console.log(req.session.logged_in);
        res.redirect('/login');
    } else {
        console.log('working');
        next();
    }
};

module.exports = withAuth;
