const router = require('express').Router();
const { Post, User, Comment } = require('../models/');
const withAuth = require('../utils/auth');

// ALL POSTS DASHBOARD
router.get('/', withAuth, async (req, res) => {
  try {
    // store the results of the db query in a variable called postData. should use something that "finds all" from the Post model. may need a where clause!
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const postData = await Post.findAll({
      where:{
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['name'],
          }
        },
        {
          model: User,
          attributes: ['name'],
        }
      ],
    });
    const user = userData.get({ plain: true });
    console.log(userData);
    // this sanitizes the data we just got from the db above (you have to create the above)
    const posts = postData.map((post) => post.get({ plain: true }));
    // fill in the view to be rendered -DONE!
    res.render('all-posts', {
      // this is how we specify a different layout other than main! no change needed
      layout: 'dashboard',
      // coming from line 10 above, no change needed
      ...user,
      posts,
      logged_in: true
    });
  } catch (err) {
    res.redirect('login');
  }
});

// AFTER CLICK ON NEW POST BUTTON
router.get('/new', withAuth, (req, res) => {
  // what view should we send the client when they want to create a new-post? (change this next line) - DONE!
  res.render('new-post', {
    // again, rendering with a different layout than main! no change needed
    layout: 'dashboard',
  });
});

// WHEN WE CLICK ON THE POST ITSELF
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    // what should we pass here? we need to get some data passed via the request body -DONE!
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      // serializing the data
      const post = postData.get({ plain: true });
      // which view should we render if we want to edit a post?
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