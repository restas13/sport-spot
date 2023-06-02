const router = require('express').Router();
const { User, Post, Comment } = require('../models')

const testData = [{
    title: 'The mavericks are pretty good this year!',
    message: 'I\'m happy with their performance on tuesday and I\'m running out of text to write',
    aithor: 'reed',
}
]

router.get('/', async (req, res) => {
    try {
        const dbLibData = await Comment.findAll({
            include: [
                {
                    model: Post,
                    attributes: ['author', 'message'],
                },
            ]
        });

        const libraries = dbLibData.map((library) =>
            Library.get({ plain: true })
        );

        console.log('hello test');
        console.log(libraries);

        res.render('homepage', {
            testData,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    /*
    console.log('working?');
    try{
        console.log('working2.0');
        res.render('homepage', {

        });
        //res.send('hello');
    }catch (err) {
        console.log(err);
        res.status(err.status || 500).json(err);
    }*/
});



router.get('/posts/:id', async (req, res) => {
    try {
        const dbLibData = await Library.findByPk(req.params.id, {
            include: [
                {
                    model: Post,
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
                    model: Post,
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