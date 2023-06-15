const router = require('express').Router();
const { User, Post } = require('../../models');

router.get('/posts', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ]
        });

        const posts = dbPostData.map((post) =>
            post.get({ plain: true })
        );

        res.send(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/posts', async (req, res) => {
    try {
        const userPostData = await User.findOne({ where: { id: req.session.user_id } });
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
            author: userPostData.username,
        });

        res.status(200).json(newPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/posts/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: [
                        'username',
                    ],
                },
            ],
        });

        const post = dbPostData.get({ plain: true });

        res.send(post);
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).json({
            message: err.message,
            error: err,
        });
    }
});

router.delete('/posts/:id', async (req, res) => {
    try {
        const deletedRows = await Post.destroy({
            where: {
                id: req.params.id
            }
        });

        if (deletedRows > 0) {
            res.status(200).json({ message: 'Post deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Post not found.' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;
