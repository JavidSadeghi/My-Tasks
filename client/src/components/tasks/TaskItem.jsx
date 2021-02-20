import React, { useState, useContext, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import TaskContext from '../../context/task/taskContext';

const TaskItem = ({ task }) => {
  const taskContext = useContext(TaskContext);
  const { deleteTask, setCurrent, clearCurrent, updateTask } = taskContext;

  // useEffect(() => {
  //   setLocalTask(task);
  // }, [taskContext, task]);

  const { _id, name, description, frequency, priority, doneDate } = task;

  const date = new Date();
  const day = date.getDay();

  const [localTask, setLocalTask] = useState({
    _id,
    name,
    description,
    frequency,
    priority,
    doneDate: date
  });


  const onDelete = () => {
    deleteTask(_id);
    clearCurrent();
  };

  const onItIsDone = () => {
    // setLocalTask(task);
    // setLocalTask({ ...localTask, doneDate: Date.now });
    updateTask(localTask);
    clearCurrent();
  };

  const checkDone = () => {
    let date = new Date();
    if (
      doneDate === null &&
      date.getFullYear() === doneDate.getFullYear() &&
      date.getMonth() === doneDate.getMonth() &&
      date.getDay() === doneDate.getDay()
    ) {
      return false;
    } else {
      // console.log(date);
      // console.log(doneDate);
      return true;
    }
  };

  return (
    <Fragment>
      {frequency[day] && checkDone() ? (
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
                  <i className='fas fa-envelope-open mr-1'></i>
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
