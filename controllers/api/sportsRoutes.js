const router = require('express').Router();

const { User, Library, SportPost, Post } = require('../../models');
const express = require('express');

router.get('/posts', async (req, res) => {
    try {
        const dbLibData = await Library.findAll({
            include: [
                {
                    model: SportPost,
                    attributes: ['user_id', 'content'],
                },
            ]
        });

        const libraries = dbLibData.map((library) =>
            Library.get({ plain: true })
        );

        res.send(libraries);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/posts', async (req, res) => {
    try {
        const userLibData = await User.findOne({ where: { id: 1 } });

        console.log(userLibData);

        console.log(req.session);
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
            author: userLibData.username,
        });

        res.status(200).json(newPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
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

        res.send(library);
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).json({
            message: err.message,
            error: err,
        });
    }
});

/*

router.get('/users/login', async (req, res) => {
    try {
        const userLibData = await Library.findAll({
            include: [{
                model: User,
                attributes: [
                    'email',
                    'password',
                ]
            }
            ]
        });
        console.log('referenced');
        
        const library = userLibData.get({ plain: true });

        res.send(library);
    }catch (err) {
        console.log(err);
        res.status(err.status || 500).json(err);
    }
});*/

module.exports = router;