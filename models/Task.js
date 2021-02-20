const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name:{
    type: String,
    require: true
  },
  description:{
    type: String,
  },
  frequency:{
    type: Array,
    default: [false, false, false, false, false, false, false]
  },
  priority:{
    type: String,
    default: 'Medium'
  },
  date:{
    type: Date,
    default: Date.now
  },
  doneDate:{
    type: Date,
    default: new Date(00-00-2000)
   }
});

module.exports = mongoose.model('task', TaskSchema);