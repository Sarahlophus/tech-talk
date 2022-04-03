// routes for user interactions
const router = require('express').Router();
const { Message, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// homepage
router.get('/', async (req, res) => {
  try {
    // Get all messagess and JOIN with user data
    const messageData = await Message.findAll({
      include: [User, Comment],
    });

    // Serialize data so the template can read it
    const messages = messageData.map((message) => message.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      messages,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// when user clicks on message, shows details
router.get('/message/:id', async (req, res) => {
  try {
    const messageData = await Message.findByPk(req.params.id, {
      include: [User, Comment],
    });

    const message = messageData.get({ plain: true });

    res.render('message', {
      ...message,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// when user clicks on profile, can only see if logged in
// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Message }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// user route to login page (if logged in goes to profile page)
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
