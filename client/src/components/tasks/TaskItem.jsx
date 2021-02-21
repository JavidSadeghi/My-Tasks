import React, { useState, useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import TaskContext from '../../context/task/taskContext';

const TaskItem = ({ task }) => {
  const taskContext = useContext(TaskContext);
  const { deleteTask, setCurrent, clearCurrent, updateTask } = taskContext;

  const { _id, name, description, frequency, priority, doneDate } = task;

  const date = new Date();
  const day = date.getDay();
  const dateString = date.getDay() + '-' + date.getMonth() + '-' + date.getFullYear();

  const [localTask, setLocalTask] = useState({
    _id,
    name,
    description,
    frequency,
    priority,
    doneDate: dateString
  });


  const onDelete = () => {
    deleteTask(_id);
    clearCurrent();
  };

  const onItIsDone = () => {
    updateTask(localTask);
    clearCurrent();
  };


  return (
    <Fragment>
      {frequency[day] && dateString !== doneDate ? (
        <div className='card mt-1 bg-light'>
          <div className='card-body'>
            <h5 className='card-title'>
              {name}{' '}
              <span
                style={{ float: 'right' }}
                className={
                  'badge ' +
                  (priority === 'Urgent' ? 'badge-danger' : 'badge-primary')
                }
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </span>
            </h5>
            <ul className='list-group'>
              {description && (
                <li className='list-group-item p-0 border-0 bg-light'>
                  <i className='fas fa-info-circle mr-1 mb-2'></i>
                  {description}
                </li>
              )}
            </ul>
            <button
              className='btn btn-dark btn-sm'
              onClick={() => setCurrent(task)}
            >
              Edit
            </button>
            <button className='btn btn-danger btn-sm ml-1' onClick={onDelete}>
              Delete
            </button>
            <button className='btn btn-info btn-sm ml-1' onClick={onItIsDone}>
              It is done
            </button>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskItem;
