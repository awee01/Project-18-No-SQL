// Express import
const router = require('express').Router();

// Thought import
const thoughtRoutes = require('./thought-routes');

// User Import
const userRoutes = require('./user-routes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;