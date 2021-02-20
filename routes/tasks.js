const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { validationResult, check } = require('express-validator');

const User = require('../models/User');
const Task = require('../models/Task');

// @route     GET api/tasks
// @desc      Get all users tasks
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(tasks);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route     POST api/tasks
// @desc      Add new task
// @access    Private
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, description, priority, frequency, doneDate } = req.body;

    try {
      const newTask = new Task({
        name,
        description,
        priority,
        frequency,
        doneDate,
        user: req.user.id,
      });

      const task = await newTask.save();
      res.json(task);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// @route     PUT api/tasks/:id
// @desc      Update task
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { name, description, priority, frequency, doneDate } = req.body;

  // Build task object
  const taskFields = {};
  if (name) taskFields.name = name;
  if (description) taskFields.description = description;
  if (priority) taskFields.priority = priority;
  if (frequency) taskFields.frequency = frequency;
  if (doneDate) taskFields.doneDate = doneDate;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'task not found' });
    }

    //Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
    console.log('Task Updated');
  } catch (error) {
    console.log(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route     DELETE api/tasks/:id
// @desc      Delete task
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    //Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Task.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Task removed' });
    
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
