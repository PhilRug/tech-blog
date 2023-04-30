const router = require('express').Router();
const { Post, User, Comment } = require('../models/');
const withAuth = require('../utils/auth');

// all posts for homepage
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
      posts,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// view post by id
router.get('/post/:id', withAuth, async (req, res) => {  
    try {        
        const postData = await Post.findOne({          
          where: {id: req.params.id},
          include: [
            User,
            {
              model: Comment,
              include: [User],
            },
          ],
        });    
        if (postData) {          
          const post = postData.get({ plain: true });          
          console.log(post);
          res.render('single-post', { post, loggedIn: req.session.loggedIn});
        } else {
          res.status(404).end();
        }
      } catch (err) {
        res.status(500).json(err);
      }
});    

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
    res.render('login');
  });
  
  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('signup');
  });
  
  module.exports = router;