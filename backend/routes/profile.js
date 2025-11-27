const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// @route    GET api/profile/me
// @desc     Get current user profile
// @access   Private
router.get('/me', auth, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (err) {
        next(err);
    }
});

// @route    PUT api/profile
// @desc     Update user profile
// @access   Private
router.put(
    '/',
    [auth, [check('name', 'Name is required').not().isEmpty(), check('email', 'Please include a valid email').isEmail()]],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { name, email } = req.body;

        // Build user object
        const userFields = {};
        if (name) userFields.name = name;
        if (email) userFields.email = email;

        try {
            let user = await User.findById(req.user.id);

            if (user) {
                // Update
                user = await User.findByIdAndUpdate(req.user.id, { $set: userFields }, { new: true }).select('-password');
                return res.json({ success: true, user });
            }

            res.status(404).json({ success: false, message: 'User not found' });
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;
