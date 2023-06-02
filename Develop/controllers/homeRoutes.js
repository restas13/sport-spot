const router = require('express').Router();
const { Library, SportPost } = require('../models')

router.get('/', async (req, res) => {
    /*try {
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
    }*/
    console.log('working?');
    try{
        console.log('working2.0');
        //res.render('homepage');
        res.send('hello');
    }catch (err) {
        console.log(err);
        res.status(err.status || 500).json(err);
    }
});



router.get('/posts/:id', async (req, res) => {
    try {
        const dbLibData = await Library.findByPk(req.params.id, {
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

        const library = dbLibData.get({ plain: true });

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
});

router.get('/posts/:user', async (req, res) => {
    try {
        const dbUserPosts = await Library.findByPk(req.params.user, {
            include: [
                {
                    model: SportPost,
                    attributes: [
                        'id',
                        'message',
                        'post_date',
                    ]
                }
            ]
        });

        const selectposts = dbUserPosts.get({ plain: true });

        res.render('');
    }catch (err) {
        console.log(err);
        
        res.status(err.status || 500).json({
            message: err.message,
            error: err,
        });
    }
    
    if(req.session.loggedIn) {
        res.render();
        return;
    }
    res.render('login');
})

module.exports = router;