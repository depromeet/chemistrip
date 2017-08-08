const express = require('express');
const router = express.Router();

const signup = require('./signup');
app.use('/signup',signup);

module.exports = router;
