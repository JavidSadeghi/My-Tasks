const express = require('express');
const router = express.Router();

// @route     GET api/tasks
// @desc      Get all users tasks
// @access    Private
router.get('/', (req, res) => {
  res.send('Get all tasks');
});

// @route     POST api/tasks
// @desc      Add new task
// @access    Private
router.post('/', (req, res) => {
  res.send('Add task');
});

// @route     PUT api/tasks/:id
// @desc      Update task
// @access    Private
router.put('/:id', (req, res) => {
  res.send('Update task');
});

// @route     DELETE api/tasks/:id
// @desc      Delete task
// @access    Private
router.delete('/:id', (req, res) => {
  res.send('Delete task');
});

module.exports = router;