const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth');

// find all post
router.get('/', withAuth, async (req, res) => {
    try { await Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
            model: User,
            attributes: ['username']
            },
            {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
          }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// find one post
router.get('/:id', withAuth, async (req, res) => {
    try { await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  });

// create post
router.post('/', withAuth, async (req, res) => {  
    try { await Post.create({
        title: req.body.title,
        user_id: req.body.user_id,
        post_url: req.body.post_url
  })
    .then(dbPostData => res.json(dbPostData))
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
});

// update post
router.put('/:id', withAuth, async (req, res) => {
    try { await Post.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  });

// delete post
router.delete('/:id', withAuth, async (req, res) => {
    try { await Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.json(dbPostData);
    })
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

module.exports = router;