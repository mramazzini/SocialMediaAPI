const router = require('express').Router();
const ThoughtRoutes = require('./thoughtRoutes');
const UserRoutes = require('./userRoutes');

router.use('/user', UserRoutes);
router.use('/thought', ThoughtRoutes);

module.exports = router;
