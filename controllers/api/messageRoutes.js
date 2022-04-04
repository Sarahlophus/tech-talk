const router = require('express').Router();
const { Message } = require('../../models/index');

// post route for new blog messages
router.post('/', async (req, res) => {
  try {
    const newMessage = await Message.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMessage);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const editedMessage = await Message.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!editedMessage) {
      res.status(404).json({ message: 'No comments found with this id!' });
      return;
    }

    res.status(200).json(editedMessage);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const messageData = await Message.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!messageData) {
      res.status(404).json({ message: 'No messages found with this id!' });
      return;
    }

    res.status(200).json(messageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
