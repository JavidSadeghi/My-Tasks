import React, { useState, useContext, useEffect } from 'react';
import TaskContext from '../../context/task/taskContext';

const TaskForm = () => {
  const taskContext = useContext(TaskContext);
  const { addTask, current, clearCurrent, updateTask } = taskContext;

  useEffect(() => {
    if (current !== null) {
      setTask(current);
    } else {
      setTask({
        name: '',
        description: '',
        frequency: [false, false, false, false, false, false, false],
        priority: 'Medium',
        doneDate: '01-01-2000'
      });
    }
  }, [taskContext, current]);

  const [task, setTask] = useState({
    name: '',
    description: '',
    frequency: [false, false, false, false, false, false, false],
    priority: 'Medium',
    doneDate: '01-01-2000'
  });

  const { name, description, frequency, priority, doneDate } = task;

  const onChange = (e) => {
    if (e.target.type === 'checkbox') {
      setTask({ ...task, frequency: frequency.map(
        ((freq, index) => index === parseInt(e.target.name) ? freq = e.target.checked : freq)
      )});
    } else {
      setTask({ ...task, [e.target.name]: e.target.value });
    }
  };
  

  const onSubmit = (e) => {
    e.preventDefault();
     if (current === null) {
      addTask(task);
    } else {
      updateTask(task);
    }
    clearForm();
  };

  const clearForm = () => {
    clearCurrent();
    setTask({
      name: '',
      description: '',
      frequency: [false, false, false, false, false, false, false],
      priority: 'Medium',
      doneDate: '01-01-2000'
    });
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <h2 className='text-primary text-center'>
          {current ? 'Edit Task' : 'Add Task'}
        </h2>
        <input
          className='form-control  mt-1'
          type='text'
          name='name'
          placeholder='Name'
          value={name}
          onChange={onChange}
        />
        <textarea
          className='form-control  mt-1'
          rows='3'
          type='text'
          name='description'
          placeholder='Description'
          value={description}
          onChange={onChange}
        />
        <h6 className='mt-3'>Task Priority</h6>
        <input
          type='radio'
          name='priority'
          value='Urgent'
          checked={priority === 'Urgent'}
          onChange={onChange}
        />{' '}
        Urgent{' '}
        <input
          type='radio'
          name='priority'
          value='High'
          checked={priority === 'High'}
          onChange={onChange}
        />{' '}
        High{' '}
        <input
          type='radio'
          name='priority'
          value='Medium'
          checked={priority === 'Medium'}
          onChange={onChange}
        />{' '}
        Medium{' '}
        <input
          type='radio'
          name='priority'
          value='Low'
          checked={priority === 'Low'}
          onChange={onChange}
        />{' '}
        Low{' '}
        <div>
          <h6 className='mt-3'>Task Days</h6>
          {frequency.map((freq, index) => (
            <div className='form-check form-check-inline' key={index}>
              <input
                className='form-check-input'
                type='checkbox'
                name={index}
                checked={freq}
                onChange={onChange}
              />
              <label className='form-check-label' htmlFor={index}>
                {`${days[index]}`}
              </label>
            </div>
          ))}
        </div>
        <div>
          <input
            type='submit'
            value={current ? 'Update Task' : 'Add Task'}
            className='btn btn-primary btn-block mt-2'
          />
        </div>
        {current && (
          <div>
            <button
              className='btn btn-light btn-block mt-2'
              onClick={clearForm}
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
