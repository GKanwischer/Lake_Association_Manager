import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './UserPage.css'

// Component imports
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import UserContactInfo from './UserContactInfo/UserContactInfo';
import UserProps from './UserProps/UserProps';
import UserEvents from './UserEvents/UserEvents';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_EVENTS' });
  }, []);

  return (
    <div className="user-container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <div className="user-top">
        <UserContactInfo />
        <UserEvents />
      </div>
      <div className="user-bottom">
        <UserProps />
      </div>
      <br />
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
