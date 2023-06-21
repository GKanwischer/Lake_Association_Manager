import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
// Component imports
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import UserPropItem from '../UserPropItem/UserPropItem';
import UserContactInfo from '../UserContactInfo/UserContactInfo';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const userProps = useSelector((store) => store.props.user);

  console.log('user proposals: ', userProps);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_PROPS' });
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <UserContactInfo />
     
      <div className="user-props">
        <h3>Your Proposals</h3>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Date created</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userProps.map(prop => <UserPropItem key={prop.id} prop={prop} />)}
          </tbody>
        </table>
      </div>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
