const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');

// all posts for dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    // store the results of the db query in a variable
    const postData = await Post.findAll({
      where:{"userId": req.session.userId},
      include: [User]
    });    
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    // fill in the view
    res.render('all-posts', {
      // change layout
      layout: 'dashboard',      
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

// view new post
router.get('/new', withAuth, async (req, res) => {  
  res.render('new-post', {    
    layout: 'dashboard',
  });
});

// edit post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {    
    const postData = await Post.findByPk(req.params.id);
    if (postData) {      
      const post = postData.get({ plain: true });      
      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;