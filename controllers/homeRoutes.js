const express = require('express');
const router = express.Router();
const axios = require('axios');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const { renderDiscussionPage } = require('./api/discussionRoutes');



router.get('/', async (req, res) => {
    try {
        const dbLibData = await Post.findAll({

        });

        const libraries = dbLibData.map((library) =>
            library.get({ plain: true })
        );

        console.log(libraries);

        res.render('homepage', {
            libraries,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/newPost', withAuth, async (req, res) => {
    try {
        res.render('newPost');
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).json(err);
    }
});

router.post('/newPost', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        console.log(err);
        res.status(err.status || 500), json(err);
    }
});

router.get('/posts/:id', async (req, res) => {
    try {
        const requestedPost = await Post.findAll({ where: { id: req.params.id } });

        const libraries = requestedPost.map((library) =>
            library.get({ plain: true })
        );
        console.log(requestedPost);
        console.log(libraries);

        res.render('homepage', {
            libraries,
            loggedIn: req.session.loggedIn,
        })

    } catch (err) {
        console.log(err);
        res.status(err.status || 500).json(err);
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.get('/featuredGames', async (req, res) => {
    try {
        const response = await axios.get('https://v2.nba.api-sports.io/games?league=standard&season=2022', {
            headers: {
                'x-rapidapi-key': '12e5cc60c495f0b959a91981be861758',
                'x-rapidapi-host': 'https://v2.nba.api-sports.io'
            }
        });
        const games = response.data.response;

        // Render the featuredGames view with the games data
        res.render('featuredGames', { games });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

});

router.get('/search', async (req, res) => {
    try {
        res.render('search');
    }catch (err) {
        console.log(err);
        res.status(err.status || 500).json(err);
    }
});

router.get('/search/:gameid', withAuth, async (req, res) => {
    try {

    }catch (err) {
        console.log(err);
        res.status(err.status || 500).json(err);
    }
})


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
    } else {
        res.render('login');
    }
});


router.get('/posts/user/:user', withAuth, async (req, res) => {
    try {
        const dbLibData = await Post.findAll({

        });

        const library = dbLibData.map((librarys) =>
            librarys.get({ plain: true })
        );

        const libraries = [];

        for (var i = 0; i < library.length; i++) {
            console.log(library[i].author);
            if (library[i].author == req.params.user) {
                console.log(library[i].author);
                libraries.push(library[i]);
                console.log('added');
            }
        }

        console.log(libraries);

        res.render('homepage',
            {
                libraries,
                loggedIn: req.session.loggedIn,
            });
    } catch (err) {
        console.log(err);

        res.status(err.status || 500).json({
            message: err.message,
            error: err,
        });
    }

    if (req.session.loggedIn) {
        res.render();
        return;
    }
    res.render('login');
});


router.get('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).redirect('/');
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
