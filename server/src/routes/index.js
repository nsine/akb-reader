const express = require('express');
const router = express.Router();

const jokesRoutes = require('./jokes');
const authRoutes = require('./auth');

router.use('/jokes', jokesRoutes);
router.use('/auth', authRoutes);

module.exports = router;