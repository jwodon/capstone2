const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/config');
const config = require('../config/config');
const { UnauthorizedError } = require('../expressError');
const { JWT_SECRET } = process.env;

function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.replace(/^[Bb]earer /, '').trim();
        if (token) {
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }
        return next();
    } catch (err) {
        return next();
    }
}

function ensureLoggedIn(req, res, next) {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
}

function ensureAdmin(req, res, next) {
    if (!res.locals.user || !res.locals.user.isAdmin) {
        throw new UnauthorizedError();
    }
    return next();
}

const ensureCorrectUserOrAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = decoded;
            next();
        });
    } catch (e) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    ensureAdmin,
    ensureCorrectUserOrAdmin,
};
