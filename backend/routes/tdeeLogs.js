const express = require('express');
const TDEELog = require('../models/TDEELog');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const log = await TDEELog.create(req.body);
        return res.status(201).json({ log });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
