import React, { useContext, useRef, useEffect } from 'react';
import TaskContext from '../../context/task/taskContext';

const TaskFilter = () => {
  const taskContext = useContext(TaskContext);
  const { filterTasks, clearFilter, filtered } = taskContext;

  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterTasks(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Tasks...'
        onChange={onChange}
        className='form-control mb-2'
      />
    </form>
  );
};

export default TaskFilter;
