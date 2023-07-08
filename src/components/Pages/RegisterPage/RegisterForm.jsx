import Card from '@mui/material/Card';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// component import
import RegisterKeyModal from './RegisterKeyModal';

// function that constructs the registration form

function RegisterForm() {
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [regKey, setRegKey] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  // function to register the user in the db
  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Card className="formPanel"
      sx={{
        border: 4,
        borderRadius: '16px',
        borderColor: 'rgb(114, 162, 245)',
        height: 300
      }}>
      <RegisterKeyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <form onSubmit={registerUser}>
        <div className="reg-top">
          <h2>Register User</h2>
          <button
            type="button"
            className="key-btn"
            onClick={() => setModalOpen(true)}
          >
            Need a Key?
          </button>
        </div>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <div>
        {/* This key is not currently functional. User's can register without it. Need to update in the future. */}
          <label htmlFor="Registration Key"> 
            Signup Key:
            <input
              type="text"
              name="Registration Key"
              value={regKey}
              // required
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Register" />
        </div>
      </form>
    </Card>
  );
}

export default RegisterForm;
