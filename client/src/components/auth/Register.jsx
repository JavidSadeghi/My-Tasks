import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alrtContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if(isAuthenticated){
      props.history.push('/');
    }

    if(error === "User already exists"){
      setAlert(error, 'danger');
      clearErrors();
    };

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if(name === '' || email === '' || password === ''){
      setAlert('Please enter all fields', 'danger');
    }else if(password.length < 6){
      setAlert('Password should be more than 6 characters', 'danger');
    }else if (password !== password2){
      setAlert('Passwords do not match', 'danger');
    }else{
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <div className='w-50 mx-auto mt-4'>
      <h1 className='text-center'>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            className='form-control'
            value={name}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            className='form-control'
            value={email}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            className='form-control'
            value={password}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            className='form-control'
            value={password2}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
