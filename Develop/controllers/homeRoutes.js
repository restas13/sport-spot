const router = require('express').Router();
const { Library, SportPost } = require('../models')

router.get('/', async (req, res) => {
    try {
        const dbLibData = await Library.findAll({
            include: [
                {
                    model: SportPost,
                    attributes: ['author', 'message'],
                },
            ]
        });

        const libraries = dbLibData.map((library) =>
            Library.get({ plain: true })
        );

        res.render('homepage', {
            libraries,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/posts/:id', async (req, res) => {
    try {
        const bdLibData = await Library.findByPk(req.params.id, {
            include: [
                {
                    model: SportPost,
                    attributes: [
                        'id',
                        'message',
                        'post_date',
                    ],
                },
            ],
        });

        const library = bdLibData.get({ plain: true });

        res.render('indPost');
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).json({
            message: err.message,
            error: err,
        });
    }
})

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

module.exports = router;