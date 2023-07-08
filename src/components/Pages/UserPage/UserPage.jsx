import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './UserPage.css'

// Component imports
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import UserContactInfo from './UserContactInfo/UserContactInfo';
import UserProps from './UserProps/UserProps';
import UserEvents from './UserEvents/UserEvents';

// this component constructs and houses the relevant components pertaining to the user page

function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_EVENTS' });
  }, []);

  return (
    <div className="user-container">
      <div className="user-header">
        <h2>Member: {user.username}</h2>
        <p>Here you can manage your contact information,<br />
          proposals, and community events</p>
      </div>
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
