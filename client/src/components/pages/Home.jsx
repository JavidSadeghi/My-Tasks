import React, { useContext, useEffect } from 'react';
import Tasks from '../tasks/Tasks';
import TaskForm from '../tasks/TaskForm';
import TaskFilter from '../tasks/TaskFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className='row mt-3'>
        <div className='col'>
          <TaskForm />
        </div>
        <div className='col'>
          <TaskFilter />
          <Tasks/>
        </div>
      </div>
    </div>
  );
};

export default Home;

