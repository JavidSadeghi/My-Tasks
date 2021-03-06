import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import AlertContext from './alrtContext';
import alertReducer from './alertReducer';
import {
  SET_ALERT,
  REMOVE_ALERT
} from '../types';

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = ( msg, type, timeOut = 5000 ) => {
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id }
    });

    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, timeOut);
  };


  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
