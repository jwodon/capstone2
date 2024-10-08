'use strict';

/** Routes for authentication. */

const User = require('../models/User');
const express = require('express');
const router = new express.Router();
const { createToken } = require('../helpers/tokens');

router.post('/token', async (req, res, next) => {
    try {
        console.log('token backend route');
        const { username, password } = req.body;
        const user = await User.fetchByUsername(username);
        const isValid = await User.verifyPassword(password, user.password);

        if (!isValid) {
            throw new UnauthorizedError('Invalid username or password');
        }

        const token = createToken(user);
        return res.json({ token });
    } catch (err) {
        return next(err);
    }
});

// Sign up route for new user registration
router.post('/signup', async (req, res, next) => {
    try {
        const newUser = await User.register(req.body);
        const token = createToken(newUser);
        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
