const router = require('express').Router();
const { User, Post, Comment } = require('../models')

const testData = [{
    id: 1,
    title: 'The mavericks are pretty good this year!',
    message: 'I\'m happy with their performance on tuesday and I\'m running out of text to write',
    author: 'Reed',
},
{
    id: 2,
    title: 'The Denver nuggets did pretty good',
    message: 'The Nuggets have been doing great this season, I think they have a real shot at winning!',
    author: 'Grant',
},
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

        const selPost = testData;

        res.render('homepage', {
            selPost,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



router.get('/posts/:id', async (req, res) => {
    try {
        const dbLibData = await Comment.findByPk(req.params.id, {
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

        //const library = dbLibData.get({ plain: true });

        const selPost = testData[0];

        console.log("parameter is " + req.params['id'])
        console.log(selPost);

        res.render('homepage', 
        {
            selPost,
            loggedIn: req.session.loggedIn,
        });
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