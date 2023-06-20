import React from 'react';
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import UserPropItem from '../UserPropItem/UserPropItem';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const userProps = useSelector(store => store.props.user);

  console.log('user proposals: ', userProps);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_PROPS' });
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <div className="contact-info">
        <h3>Contact Info</h3>
        {!user.first_name || !user.last_name ?
          <span>Name: <input placeholder="First name" type="text" /> <input placeholder="Last name" type="text" /> <button>Update</button></span> :
          <p>Name: {user.first_name} {user.last_name}</p>}
        <br />
        {!user.phone_number ?
          <span>Phone Number: <input placeholder="phone number" type="number" /><button>Update</button></span> :
          <p>Phone Number: {user.phone_number}</p>}
        <br />
        {!user.email ?
          <span>Email: <input placeholder="Email Address" type="text" /><button>Update</button></span> :
          <p>Email address: {user.email}</p>}
        <br />
        {!user.street_address || !user.city || !user.state ?
          <span>Address: <input placeholder="Street Address" type="text" /><input placeholder="City" type="text" /><input placeholder="State" type="text" /><button>Update</button></span> :
          <div>
            <p>Address: {user.street_address}</p>
            <p>{user.city}, {user.state}</p>
          </div>}
      </div>

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
