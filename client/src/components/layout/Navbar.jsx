import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import TaskContext from '../../context/task/taskContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const taskContext = useContext(TaskContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearTasks } = taskContext;

  const onLogout = () => {
    logout();
    clearTasks();
  };

  const authLinks = (
    <Fragment>
      <li className='nav-item'>Hello {user && user.name}</li>
      <li className='nav-item ml-1'>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const gestLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link to='/register' className='nav-link'>
          Register
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/login' className='nav-link'>
          Login
        </Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <a className='navbar-brand' href='/'>
        <i className={icon} /> {title}
      </a>
      <div
        className='collapse navbar-collapse justify-content-end'
        id='navbarNav'
      >
        <ul className='navbar-nav'>
          {isAuthenticated ? authLinks : gestLinks}
          <li className='nav-item'>
            <Link to='/about' className='nav-link  mr-5'>
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'My Tasks',
  icon: 'fas fa-tasks',
};


export default Navbar;
