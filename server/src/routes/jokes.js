const express = require('express');
const router = express.Router();

const vk = require('../external-api/vk');

router.get('/', async (req, res) => {
  const offset = req.query.offset || 0;
  const count = req.query.count || 0;
  vk.getPosts(offset, count).then(vkRes => res.json(vkRes));
});

module.exports = router;