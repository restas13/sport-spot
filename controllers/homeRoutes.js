const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

const axios = require('axios');

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

router.get('/', /*withAuth,*/ async (req, res) => {
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

        console.log(req.session.loggedIn);
        console.log('hello test');
        console.log(libraries);

        const selPost = testData;

        res.render('featured', {
            selPost,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// gets the posts with the id in the web address
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

        const selPost = [testData[req.params.id - 1]];

        console.log(req.params.id - 1);
        console.log(selPost);

        res.render('featured', 
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
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/posts/user/:user', async (req, res) => {
    try {
        const dbLibData = await Comment.findByPk(req.params.user, {
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

        //const selectposts = dbLibData.get({ plain: true });

        const selPost = [];

        for (var i = 0; i < testData.length; i++) {
            console.log(testData[i].author);
            if(testData[i].author == req.params.user) {
                console.log(testData[i].author);
                selPost.push(testData[i]);
                console.log('added');
            }
        }

        console.log(testData[0].author);
        console.log(selPost);
        console.log(req.params.user);

        res.render('featured', 
        {
            selPost,
            loggedIn: req.session.loggedIn,
        });
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
});

/*
router.get('/posts/search', async (req, res) => {
    try{
        const response = await axios.get('https://v2.nba.api-sports.io/games?league=standard&season=2022', {
            headers: {
                'x-rapidapi-key': '12e5cc60c495f0b959a91981be861758',
                'x-rapidapi-host': 'https://v2.nba.api-sports.io',
            },
            params: {
                trend: 'true',
                limit: 4,
            }
        });

        const processedRes = response.json();

        console.log(response);
        console.log(processedRes.status);
        console.log(processedRes);

        res.render('games', )
    }catch(err) {
        console.log(err);
        res.status(err.status || 500).json();
    }
});
*/
router.get('*', (req, res) => {
    try {
        res.render('error');
    }catch (err) {
        console.log(err);
        res.status(err.status || 500),json(err);
    }
});

module.exports = router;