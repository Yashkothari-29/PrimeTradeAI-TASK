const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');
const Task = require('../models/Task');

// @route    POST api/tasks
// @desc     Create a task
// @access   Private
router.post(
    '/',
    [auth, [check('title', 'Title is required').not().isEmpty()]],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const newTask = new Task({
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                user: req.user.id,
            });

            const task = await newTask.save();
            res.json({ success: true, task });
        } catch (err) {
            next(err);
        }
    }
);

// @route    GET api/tasks
// @desc     Get all tasks for user
// @access   Private
router.get('/', auth, async (req, res, next) => {
    try {
        const { status, search } = req.query;
        let query = { user: req.user.id };

        if (status) {
            query.status = status;
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const tasks = await Task.find(query).sort({ createdAt: -1 });
        res.json({ success: true, tasks });
    } catch (err) {
        next(err);
    }
});

// @route    GET api/tasks/:id
// @desc     Get task by ID
// @access   Private
router.get('/:id', auth, async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        // Check user
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'User not authorized' });
        }

        res.json({ success: true, task });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        next(err);
    }
});

// @route    PUT api/tasks/:id
// @desc     Update task
// @access   Private
router.put('/:id', auth, async (req, res, next) => {
    try {
        const { title, description, status } = req.body;

        // Build task object
        const taskFields = {};
        if (title) taskFields.title = title;
        if (description) taskFields.description = description;
        if (status) taskFields.status = status;

        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        // Check user
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'User not authorized' });
        }

        task = await Task.findByIdAndUpdate(req.params.id, { $set: taskFields }, { new: true });

        res.json({ success: true, task });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        next(err);
    }
});

// @route    DELETE api/tasks/:id
// @desc     Delete task
// @access   Private
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        // Check user
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'User not authorized' });
        }

        await task.deleteOne();

        res.json({ success: true, message: 'Task removed' });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        next(err);
    }
});

module.exports = router;
