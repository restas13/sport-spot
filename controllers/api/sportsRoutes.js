const router = require('express').Router();
const { Library, SportPost } = require('../../models');
const express = require('express');

router.get('/posts', async (req, res) => {
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

        res.send(libraries);
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

module.exports = router;