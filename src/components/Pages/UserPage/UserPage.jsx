import React from 'react';
import { useSelector } from 'react-redux';

// Component imports
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import UserContactInfo from '../UserContactInfo/UserContactInfo';
import UserProps from '../UserProps/UserProps';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM

  const user = useSelector((store) => store.user);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <UserContactInfo />
      <UserProps />
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
