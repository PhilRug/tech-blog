const router = require('express').Router();
const { Comment } = require('../../models');

// find all comments
router.get('/', async (req, res) => {
  try { await Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// create comment
router.post('/', async (req, res) => {
  try { await Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.body.user_id,
    post_id: req.body.post_id
  })
    .then(dbCommentData => res.json(dbCommentData))
  } catch (err) {
      console.log(err);
      res.status(400).json(err);
    };
});

// delete comment
router.delete('/:id', async (req, res) => {
  try { await Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
});

module.exports = router;